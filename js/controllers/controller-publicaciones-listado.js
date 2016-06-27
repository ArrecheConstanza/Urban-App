/********************************************CONTROLLER HEADER-FOOTER**************************************/

Urban.controller("publicacionesListadoCtrl", function ($scope,$http){
	//pido datos de bdd
		$http({ 
			url:"php/abm/publicaciones.listado.php",
		})
		.success(function(data, status){
			var rta=angular.fromJson(data);
			console.log(rta);
			//$scope.datosSQLpublicaciones=data;
		});
			
});