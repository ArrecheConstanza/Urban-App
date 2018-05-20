/********************************************CONTROLLER AYUDA***************************************/

Urban.controller("AyudaCtrl",  ['$scope', '$http', '$location', 'Upload', '$timeout', function  ($scope, $http, $location, Upload, $timeout) { 
	
	$scope.back=function(){
		window.location.href=localStorage.getItem("urban_url");
	}
	
	$http({
		method: 'GET',
		url:"",
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
	})
	.success(function(data){

	})
	.error(function(){ //sin acceso a intenret, cargo datos locales
		
	});
	
}]);
	