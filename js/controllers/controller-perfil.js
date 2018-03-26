/********************************************CONTROLLER PERFIL***************************************/

Urban.controller("perfilCtrl",  ['$scope', '$http', '$location', 'Upload', '$timeout', function  ($scope, $http, $location, Upload, $timeout) { 
	
	$scope.back=function(){
		window.location.href=localStorage.getItem("urban_url");
	}
	
	/****listado de grupos ****/
	$http({
		method: 'GET',
		url:"php/abm/usuario.perfil.php",
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
	})
	.success(function(data){
		console.log(data);
		if(data=="0"){
			//uruario no logueado cerrar sesion
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
	
}]);
	
	