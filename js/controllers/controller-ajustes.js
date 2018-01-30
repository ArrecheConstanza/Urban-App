/********************************************CONTROLLER PERFIL***************************************/

Urban.controller("ajustesCtrl",  ['$scope', '$http', '$location', 'Upload', '$timeout', function  ($scope, $http, $location, Upload, $timeout) { 
	
	$scope.back=function(){
		window.location.href=localStorage.getItem("urban_url");
	}
	$scope.datos_usuario=angular.fromJson(localStorage.getItem("user_urban"));
	
	/**** cargo foto perfil de usuario ****/
	if(localStorage.getItem("foto_final_usuario")!=undefined){
		id("title-container-perfil").style.background="url('"+localStorage.getItem("foto_final_usuario").replace("C:/xampp/htdocs/Urban-App/","")+"') center 100% no-repeat";// <- despues se reemplaza para hosting
		id("title-container-perfil").style.backgroundSize="100vw"; 
	} 
	
	/**** Direccion estado img ****/
	if($scope.datos_usuario.DIRECCION_ESTADO=="Oculto"){
		$scope.datos_usuario.DIRECCION_ESTADO="img/icons/png/privado-mini.png";
	}
	else{
		$scope.datos_usuario.DIRECCION_ESTADO="img/icons/png/publico-mini.png";
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
	}
	
	$scope.deletePic=function(){
		id("pre_vista").style.display="none";
		id("envio_foto").style.display="none";
		id("no_envio_foto").style.display="none";
		console.log(ultimo_fondo);
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
				window.location.href = '/urban-app/vistas/mapa.html';
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
	
	