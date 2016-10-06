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
				var rta=angular.fromJson(data[0]);
				$scope.ID=data[0].ID;
				$scope.TITULO=data[0].TITULO;
				$scope.DESCRIPCION=data[0].DESCRIPCION;
				$scope.FECHA_CREACION=data[0].FECHA_CREACION;
				//FOTO principal
				if(!data[0].FOTO.length){
					var foto="/urban-app/img/fotos/muestra.jpg";
				}
				else{
					var foto=data[0].FOTO[0]["DIR"].substring(26,data[0].FOTO[0]["DIR"].length);
				}
				$scope.FOTO=foto;
				
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
						if(data){
							//modal ok?
							
						}
						else{
							//No se pudo comentar
						}
					})
					.error(function(){
						//Sin conexion
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
				
				
				
				
			})
			.error(function(){
				//mensaje Sin conexion 
			});
	}

});