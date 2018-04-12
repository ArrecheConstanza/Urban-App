/********************************************CONTROLLER PUBLICACIONES DETALLE**************************************/

Urban.controller("publicacionDetalleCtrl", function ($scope,$http,$location){
	
	//pido datos de bdd
	if(localStorage.getItem("id_publi")!=null){
		var union="ID="+localStorage.getItem("id_publi");
		$http({
				method: 'POST',
				url:"php/abm/publicacion.detalle.php",
				data: union,	
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			})
			.success(function(data){
				if(data=="0"){ //no logueado
					//redireccionar a login
					$http({
						method: 'GET',
						url:"php/abm/logout.usuario.php",
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
					})
					.success(function(data){
						if(data){
							window.localStorage.removeItem("user_urban");
							$location.path("/");
						}
					});
				}
				$scope.es_propietario=false;
				if(angular.fromJson(localStorage.getItem("user_urban")).ID==data[0].FK_USUARIO){
					$scope.es_propietario=true;
				}
				var rta=angular.fromJson(data[0]);
				$scope.ID=data[0].ID;
				$scope.TITULO=data[0].TITULO;
				$scope.DESCRIPCION=data[0].DESCRIPCION;
				$scope.FECHA_CREACION=data[0].FECHA_CREACION;
				$scope.USUARIO_NOMBRE=data[0].USUARIO_NOMBRE;
				$scope.USUARIO_APELLIDO=data[0].USUARIO_APELLIDO;
				//FOTO principal
				if(!data[0].FOTO.length){
					var foto="/urban-app/img/fotos/muestra.jpg";
				}
				else{
					var foto=data[0].FOTO[0]["DIR"].substring(26,data[0].FOTO[0]["DIR"].length);
				}
				$scope.FOTO=foto;
				
				//****** C O N T R O L L E R   M O D A L ******//
					$scope.estado_modal=false;
					$scope.mostrar_modal_usuario = function(){
					var x = document.getElementsByTagName("body")[0];
						if(x.className=="ng-scope has-sidebar-left has-sidebar-right has-modal"){
							x.className="ng-scope has-sidebar-left has-sidebar-right";
						}
						if($scope.estado_modal){
							localStorage.setItem("usuario_ver",data[0].FK_USUARIO);
							return "vistas/modal-usuario.html";
						}
						return "";
					}
					
					$scope.modal_usuario = function(){
						//abrir o cerrar modal
						if($scope.estado_modal){
							$scope.estado_modal=false;
						}
						else{
							$scope.estado_modal=true;
						}
						$scope.mostrar_modal_usuario(); 
					}
				
				/**** Listar comentarios ****/
				var union="ID="+data[0].ID;
					$http({
						method: 'POST',
						url:"php/abm/publicacion.comentario.listar.php",
						data: union,	
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
					})
					.success(function(data){
						if(data){
							var rta=angular.fromJson(data);
							$scope.datosSQLcomentario_publicacion=rta.reverse();
						}
					})
					.error(function(){
						//Sin conexion
					});
				
				/****Comentar****/
				$scope.comentar=function(comentario){
					var union="FKPUBLICACION="+$scope.ID+"&COMENTARIO="+comentario.DESCRIPCION;
					$http({
						method: 'POST',
						url:"php/abm/publicacion.comentario.crear.php",
						data: union,	
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
					})
					.success(function(data){
						if(data!="0"){
							//modal ok?
							location.reload();
						}
						else{
							//mensaje No se pudo comentar
						}
					})
					.error(function(){
						//mensaje Sin conexion
					});
				}
				
				/****Editar****/
				$scope.editar=function(id){
					$location.path("/editarPublicacion/"+id);
				}
				
				/****Eliminar****/
				$scope.eliminar=function(){
					var union="ID="+data[0].ID;
					$http({
						method: 'POST',
						url:"php/abm/publicacion.eliminar.php",
						data: union,	
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
					})
					.success(function(data){
						if(data){
							$location.path("/publicaciones/"+localStorage.getItem("grupo_seleccionado_urban"));
						}
						else{
							//No se pudo borrar
						}
					})
					.error(function(){
						//Sin conexion
					});
				}
				
				/****Reportar****/
				$scope.reportar=function(id){
					localStorage.setItem("urban_url",window.location.href);
					$location.path("/reportarPublicacion/"+id);
				}
			})
			.error(function(){
				//mensaje Sin conexion 
			});
	}

});