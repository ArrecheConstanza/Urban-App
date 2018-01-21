/********************************************CONTROLLER PERFIL***************************************/

Urban.controller("perfilCtrl",  ['$scope', '$http', '$location', 'Upload', '$timeout', function  ($scope, $http, $location, Upload, $timeout) { 
	
	$scope.datos_usuario=angular.fromJson(localStorage.getItem("user_urban"));
	//foto generica
	if($scope.datos_usuario.FKMULTIMEDIA==null){
		$scope.datos_usuario.FOTO="img/icons/png/usuario.png";
	}
	else{
		
	}
	
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
			
		}
	});
	
	$scope.abandonar_grupo=function(id){
		console.log(id);
		
	}
	
}]);
	
	