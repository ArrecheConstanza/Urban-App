/********************************************CONTROLLER PERFIL***************************************/

Urban.controller("perfilCtrl",  ['$scope', '$http', '$location', 'Upload', '$timeout', function  ($scope, $http, $location, Upload, $timeout) { 
	
	$scope.datos_usuario=angular.fromJson(localStorage.getItem("user_urban"));
	//foto generica
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
	$scope.eliminar=function(){
		modal("¿Desea eliminar su cuenta?<br>Perderá toda su información.","&#10004;");
		var ventana_modal=id("ventana_modal");
		var boton_si=tn(ventana_modal,"button",0);
		boton_si.onclick=function(){
/* 
			$http({
				method: 'POST',
				url:"php/abm/usuario.grupos.abandonar.php",
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
		} */
	}
	
}]);
	
	