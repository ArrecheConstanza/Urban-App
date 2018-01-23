/********************************************CONTROLLER PERFIL***************************************/

Urban.controller("perfilCtrl",  ['$scope', '$http', '$location', 'Upload', '$timeout', function  ($scope, $http, $location, Upload, $timeout) { 
	
	$scope.datos_usuario=angular.fromJson(localStorage.getItem("user_urban"));
	//foto generica
	//console.log($scope.picFile);
	if($scope.datos_usuario.FKMULTIMEDIA==null){
		$scope.datos_usuario.FOTO="img/icons/png/usuario.png";
	}
	else{
		
	}
	
	
	/****listado de grupos ****/
	$http({
		method: 'GET',
		url:"php/abm/grupos.listado.php",
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
	})
	.success(function(data){
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
		else{
			
		}
	}
	
	$scope.uploadPic=function(foto){
		
	}
	$scope.deletePic=function(){
		id("pre_vista").style.display="none";
		id("envio_foto").style.display="none";
		id("no_envio_foto").style.display="none";
		id("title-container-perfil").style.background=ultimo_fondo;
		
	}
	
	
	
	
	
	
	
		
	/* var foto=id("foto");
	var foto_actual=id("foto_actual");
	var contenedor_foto;
	var contenedor_foto_actual;
	foto.onchange=function(){
		var clase=this.className;
		if(clase.search("ng-touched")){
			contenedor_foto_acutal=foto_actual.parentNode;
			rc(foto_actual.parentNode,foto_actual);
			/* contenedor_foto=foto.parentNode;
			rc(foto.parentNode,foto); *
			
		}
		else{
			console.log("no lo tiene");
		}
		
	}
	
		$scope.editar_foto_usuario=function(usuario){
			foto_usuario={
				FOTO: usuario.FILE
			}
			console.log($scope);
			var hay_foto=true; 
			/* hay_foto.upload = Upload.upload({
				method: 'POST',
				data: foto_usuario,
				url:"php/abm/foto.usuario.php",
			})
			.then(function(response){
				console.log(response);
				if(response.data){
					
				}
				else{
					//modal error
				}
			}
			,function(response){
				//modal error
				
			}); */
	//	}
	
	
	
	
	
	
	
	
	
	
	
	
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
	
	