/********************************************CONTROLLER PUBLICACION EDITAR**************************************/

Urban.controller("reportarPublicacionCtrl",  ['$scope', '$http', '$location', 'Upload', '$timeout', '$routeParams', function  ($scope, $http, $location, Upload, $timeout, $routeParams) { 

	//************* REPORTAR *************//
	$scope.reportar_publicacion=function(reporte){
		var union="FKPUBLICACION="+$routeParams.id+"&DESCRIPCION="+reporte.DESCRIPCION;
		
		//FALTA validacion de datos 
		$http({
			method: 'POST',
			url:"php/abm/publicacion.reportar.php",
			data: union,	
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
		})
		.success(function(data){
			if(data=="1"){
				//modal denuncia con exito.
				window.location.href = localStorage.getItem("urban_url");
			
			}
			else if(data=="3"){
				//modal denuncia ya realizada
				window.location.href = localStorage.getItem("urban_url");
			}
			else{
			console.log("error");
				//modal no se pudo denunciar.
				window.location.href = localStorage.getItem("urban_url");
			}
		})
		.error(function(){
			//mensaje Sin conexion 
		});
	}
}]);