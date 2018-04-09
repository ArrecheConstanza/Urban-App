/********************************************CONTROLLER PERFIL***************************************/

Urban.controller("AyudaCtrl",  ['$scope', '$http', '$location', 'Upload', '$timeout', function  ($scope, $http, $location, Upload, $timeout) { 
	
	$scope.back=function(){
		window.location.href=localStorage.getItem("urban_url");
	}
	
	/****listado de grupos ****/
	$http({
		method: 'GET',
		url:"",
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
	})
	.success(function(data){
		//localStorage.setItem("grupos_usuario_urban",angular.toJson(data));
		//$scope.listado_grupos=data;
		console.log(data);
		
	})
	.error(function(){ //sin acceso a intenret, cargo datos locales
		
	});
	
}]);
	