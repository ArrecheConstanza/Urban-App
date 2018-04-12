/********************************************CONTROLLER PERFIL***************************************/

Urban.controller("ajustesCtrl",  ['$scope', '$http', '$location', 'Upload', '$timeout', function  ($scope, $http, $location, Upload, $timeout) { 
	
	$scope.listado_grupos=[];
	//boton volver
	$scope.unite_a_grupo=false;
	
	$scope.back=function(){
		if($scope.unite_a_grupo){
			$location.path("/sin_grupo");
		}
		else{
			window.location.href=localStorage.getItem("urban_url");
		}
	}
	
	//****** C O N T R O L L E R   M O D A L ******//
		$scope.estado_modal=false;
		$scope.mostrar_modal_grupo = function(){
		var x = document.getElementsByTagName("body")[0];
			if(x.className=="ng-scope has-sidebar-left has-sidebar-right has-modal"){
				x.className="ng-scope has-sidebar-left has-sidebar-right";
			}
			if($scope.estado_modal){
				return "vistas/modal-grupo.html";
			}
			return "";
		}
		
		$scope.modal_grupo=function(num){
			for(var i=0;i<$scope.listado_grupos.length;i++){
				if($scope.listado_grupos[i].ID==num){
					$scope.un_grupo=$scope.listado_grupos[i];
				}
			}
			//Traigo listado de usuarios de ese grupo
			if($scope.un_grupo!="undefined"){
				var union="id="+$scope.un_grupo.ID;
				 $http({
					method: 'POST',
					data: union,
					url:"php/abm/traer.usuarios.un.grupo.php",
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
				})
				.success(function(data){
					if(data!="0"){
						for(var i=0;i<data.length;i++){
							//si tiene o no foto
							if(angular.fromJson(data[i].FOTO)!=null){
								var foto=angular.fromJson(data[i].FOTO).PATH.substring(26,angular.fromJson(data[i].FOTO).PATH.length);
								data[i].FOTO=foto;
							}
							else{
								data[i].FOTO="/urban-app/img/icons/png/menu-nombre.png";
							} 
						}
						$scope.listado_usuarios = data;
					}
					else{
						//error usuario no logeado
						$http({
							method: 'GET',
							url:"php/abm/logout.usuario.php",
							headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
						})
						.success(function(data2){
							if(data2){
								window.localStorage.removeItem("user_urban");
								$location.path("/");
							}
						});
					}
				})
				.error(function(){ 
					//sin acceso a intenret, cargo datos locales	
				});
					
				$scope.img_grupo=true;
				// traer admin y foto de grupo
				var union="id="+$scope.un_grupo.ID;
				 $http({
					method: 'POST',
					data: union,
					url:"php/abm/traer.admin.grupo.php",
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
				})
				.success(function(data){
					if(data!="0"){
						//si tiene o no foto
						if(data[0].FOTO!=null){
							var foto=data[0].FOTO.PATH.substring(26,data[0].FOTO.PATH.length);
							data[0].FOTO=foto;
						}
						else{
							data[0].FOTO="/urban-app/img/icons/png/grupo.png";
						} 
						$scope.foto_grupo=data[0].FOTO;
						$scope.admin_grupo=data[0].ADMIN;
						
						/**** cambiar foto de perfil ****/
			
						id("envio_foto").style.display="none";
						id("no_envio_foto").style.display="none";
						
						if(id("foto_grupo")!=null){
							id("foto_grupo").onchange=function(){
								if(this.value!=""){
									$scope.img_grupo=false;
									id("pre_vista_grupo").style.display="inline-block";
									id('envio_foto').style.display="inline-block";
									id('no_envio_foto').style.display="inline-block";
								}
							}
						}
						
						$scope.deletePicGroup=function(){
							$scope.img_grupo=true;
							id("pre_vista_grupo").style.display="none";
							id("envio_foto").style.display="none";
							id("no_envio_foto").style.display="none";
							
						}
						
						$scope.uploadPicGroup=function(foto){
							foto_grupo={
								FOTO: foto,
								ID : $scope.un_grupo.ID
							}
							foto_grupo.upload = Upload.upload({
								method: 'POST',
								data: foto_grupo,
								url:"php/abm/foto.grupo.php",
							})
							.then(function(response){
								if(response.data!=0){
									var foto=response.data.substring(26,response.data.length);
									$scope.foto_grupo=foto;
									$scope.img_grupo=true;
									id("pre_vista_grupo").style.display="none";
									id("envio_foto").style.display="none";
									id("no_envio_foto").style.display="none";
								}
								else{
									//modal error
								}
							}
							,function(response){
								//modal error
							});  
						}
						
						//**** eliminar grupo. solo para admins ****//
						$scope.estado_eliminar=false;
						if(angular.fromJson(localStorage.getItem("user_urban")).ID==$scope.admin_grupo){
							$scope.estado_eliminar=true;
						}
						$scope.eliminar_grupo=function(){
							modal("¿Desea eliminar el grupo <b>"+$scope.un_grupo.NOMBRE+"</b>?","&#10004;");
							var ventana_modal=id("ventana_modal");
							var boton_si=tn(ventana_modal,"button",0);
								boton_si.onclick=function(){
									var union = 'ID='+$scope.un_grupo.ID;
									$http({
										method: 'POST',
										data : union,
										url:"php/abm/grupo.borrar.php",
										headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
									})
									.success(function(data){
										 if(data=='1'){ //modal eliminado con exito
											location.reload();
										} 
										else{
											//modal error al eliminar grupo
										}
									}); 
								}
						}
						$scope.abandonar_grupo=function(){
							modal("¿Desea abandonar el grupo <b>"+$scope.un_grupo.NOMBRE+"</b>?","&#10004;");
							var ventana_modal=id("ventana_modal");
							var boton_si=tn(ventana_modal,"button",0);
								boton_si.onclick=function(){
									var union = 'id_grupo='+$scope.un_grupo.ID;
									$http({
										method: 'POST',
										data : union,
										url:"php/abm/grupo.abandonar.php",
										headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
									})
									.success(function(data){
										 if(data=='1'){ //modal abandonado con exito
											location.reload();
										} 
										else{
											//modal error al abandonar grupo
										}
									}); 
								}
						}
					}
					else{
						//error usuario no logeado
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
				})
				.error(function(){ //sin acceso a intenret, cargo datos locales
					
				});
			}
			
		//abrir o cerrar modal
		if($scope.estado_modal){
			$scope.estado_modal=false;
		}
		else{
			$scope.estado_modal=true;
		}
		$scope.mostrar_modal_grupo(); 
	}; 
		
//*******************************************************

	//editar direccion usuario
	if(localStorage.getItem("direc_user_cambiar")!=null){
		var datos=JSON.parse(localStorage.getItem("direc_user_cambiar"));
		var item = [];
		for(var i in datos){
			item.push( i+'='+datos[i] ); 
		}
		var union = item.join('&');	
		$http({
			method: 'POST',
			data: union,
			url:"php/abm/usuario.editar.direccion.php",
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
		})
		.success(function(data){
			if(data){
				//modal exito al cambiar direc
			}
			else{
				//modal erro cambiando direc, intentar mas tarde
			}
				localStorage.removeItem("direc_user_cambiar");
		})
		.error(function(){ 
		
		});
	}
	
	//traigo contenido usuario de bdd
	 $http({
		method: 'GET',
		url:"php/abm/usuario.datos.php",
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
	})
	.success(function(data){
		localStorage.setItem("user_urban",angular.toJson(data));
		$scope.datos_usuario=angular.fromJson(data);
		
		/**** Direccion estado img ****/
		if($scope.datos_usuario.DIRECCION_ESTADO=="Oculta"){
			$scope.datos_usuario.DIRECCION_ESTADO="img/icons/png/privado-mini.png";
		}
		else{
			$scope.datos_usuario.DIRECCION_ESTADO="img/icons/png/publico-mini.png";
		}
	})
	.error(function(){ //sin acceso a intenret, cargo datos locales
		$scope.datos_usuario=angular.fromJson(localStorage.getItem("user_urban"));
			/**** Direccion estado img ****/
			if($scope.datos_usuario.DIRECCION_ESTADO=="Oculto"){
				$scope.datos_usuario.DIRECCION_ESTADO="img/icons/png/privado-mini.png";
			}
			else{
				$scope.datos_usuario.DIRECCION_ESTADO="img/icons/png/publico-mini.png";
			} 
	});
	
	
	/**** cargo foto perfil de usuario ****/
	if(localStorage.getItem("foto_final_usuario")!=undefined){
		id("title-container-perfil").style.background="url('"+localStorage.getItem("foto_final_usuario").replace("C:/xampp/htdocs/Urban-App/","")+"') center 100% no-repeat";// <- despues se reemplaza para hosting
		id("title-container-perfil").style.backgroundSize="100vw"; 
		localStorage.removeItem("foto_final_usuario");
	} 
	
	/****listado de grupos ****/
	$http({
		method: 'GET',
		url:"php/abm/grupos.listado.php",
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
	})
	.success(function(data){
		if(data.length=="0"){
			localStorage.setItem("hay_grupo","no");
			$scope.unite_a_grupo=true;
		}
		else{
			$scope.unite_a_grupo=false;
		}
		localStorage.setItem("grupos_usuario_urban",angular.toJson(data));
		$scope.listado_grupos=data;
		
	})
	.error(function(){ //sin acceso a intenret, cargo datos locales
		if(localStorage.getItem("grupos_usuario_urban")!=undefined){
			$scope.listado_grupos=angular.fromJson(localStorage.getItem("grupos_usuario_urban"));
		}
		else{
			//modal Sin conexion
			modal("Sin acceso a internet");
		}
	});
					
	/**** cambiar foto de perfil ****/
	
	id("envio_foto").style.display="none";
	id("no_envio_foto").style.display="none";
	var ultimo_fondo=id("title-container-perfil").style.background; 
	
	id("foto").onchange=function(){
		if(this.value!=""){
			id("pre_vista").style.display="inline-block";
			id('envio_foto').style.display="inline-block";
			id('no_envio_foto').style.display="inline-block";
			id("title-container-perfil").style.background="none";
		}
	}
	
	$scope.deletePic=function(){
		id("pre_vista").style.display="none";
		id("envio_foto").style.display="none";
		id("no_envio_foto").style.display="none";
		id("title-container-perfil").style.background=ultimo_fondo;
		
	}
	
	$scope.uploadPic=function(foto){
		foto_usuario={
			FOTO: foto
		}
		foto_usuario.upload = Upload.upload({
			method: 'POST',
			data: foto_usuario,
			url:"php/abm/foto.usuario.php",
		})
		.then(function(response){
			if(response.data!=0){
					localStorage.setItem("foto_final_usuario",response.data);
					id("title-container-perfil").style.background="url('"+response.data.replace("C:/xampp/htdocs/Urban-App/","")+"') no-repeat 100% "; // <- despues se reemplaza para hosting
					id("title-container-perfil").style.backgroundSize="100vw";
					location.reload();
			}
			else{
				//modal error
			}
		}
		,function(response){
			//modal error
			
		});  
	}
	
	
	/**** Editar info de usuario ****/

	var editarUsuario=tn(id("editarUsuario"),'a');

	for(var i=0;i<editarUsuario.length;i++){
		editarUsuario[i].onclick=function(){
			var titulo=tn(this,'li',0);
			titulo=tn(titulo,'span',0).innerHTML;
			localStorage.setItem("editar_usuario",titulo);
			if(titulo=="Direccion"){
				localStorage.setItem("cambiar_direc","si");
				window.location.href = '/urban-app/vistas/registro-mapa.html';
			}
		} 
	}

	/**** funcion abandonar grupo ****/
	$scope.abandonar_grupo=function(nombre,num_id){
		modal("¿Desea abandonar el grupo <b>"+nombre+"</b>?","&#10004;");
		var ventana_modal=id("ventana_modal");
		var boton_si=tn(ventana_modal,"button",0);
		boton_si.onclick=function(){
			var union="id_grupo="+num_id;
			$http({
				method: 'POST',
				url:"php/abm/usuario.grupos.abandonar.php",
				data : union,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			})
			.success(function(data){
				if(data){
					location.reload();
				}
				else{
					modal("Ups! Hubo un error, intentelo nuevamente más tarde");
					
				}
			})
			.error(function(){ //sin acceso a intenret
				modal("Sin acceso a internet");
			}); 
		}
	}
	
	/**** eliminar cuenta ***/
	$scope.eliminar_cuenta=function(){
		modal("¿Desea eliminar su cuenta?<br>Perderá toda su información.","&#10004;");
		var ventana_modal=id("ventana_modal");
		var boton_si=tn(ventana_modal,"button",0);
		boton_si.onclick=function(){
			$http({
				method: 'POST',
				url:"php/abm/eliminar.usuario.php",
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			})
			.success(function(data){
				if(data){
					document.getElementById('cerrar_modal').click();
					modal("Cuenta eliminada con éxito");
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
				else{
					modal("Ups! Hubo un error, intentelo nuevamente más tarde");
				} 
			})
			.error(function(){ //sin acceso a intenret
				modal("Sin acceso a internet");
			}); 
		} 
	}

	
}]);
	
	