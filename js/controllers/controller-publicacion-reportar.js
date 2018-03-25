/********************************************CONTROLLER PUBLICACION EDITAR**************************************/

Urban.controller("reportarPublicacionCtrl",  ['$scope', '$http', '$location', 'Upload', '$timeout', '$routeParams', function  ($scope, $http, $location, Upload, $timeout, $routeParams) { 

		
	//************* REPORTAR *************//
	$scope.reportar_publicacion=function(reporte){
		//console.log(reporte);
		//console.log($routeParams.id);
		var union="DESCRIPCION="+reporte.DESCRIPCION+"&FKPUBLICACION="+$routeParams.id;
		
		//FALTA validacion de datos 
		$http({
			method: 'POST',
			url:"php/abm/publicacion.reportar.php",
			data: union,	
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
		})
		.success(function(data){
			console.log(data);
		})
		.error(function(){
			//mensaje Sin conexion 
		});
	}
}]);