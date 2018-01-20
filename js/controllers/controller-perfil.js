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
		method: 'POST',
		url:"php/abm/grupos.listado.php",
		data: union,	
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
	})
	.success(function(data){
		
	})
	.error(function(){
		//Sin conexion
	});
	
}]);
	
	