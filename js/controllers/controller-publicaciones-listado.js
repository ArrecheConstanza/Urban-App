/********************************************CONTROLLER PUBLICACIONES LISTADO**************************************/

Urban.controller("publicacionesListadoCtrl", function ($scope,$http){
	
	//pido datos de bdd
		$http({ 
			url:"php/abm/publicaciones.listado.php",
		})
		.success(function(data, status){
			//console.log(data);
			var rta=angular.fromJson(data);
			$scope.datosSQLpublicaciones=rta.reverse();
		});

});