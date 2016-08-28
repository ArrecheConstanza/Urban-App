/********************************************CONTROLLER PUBLICACIONES LISTADO**************************************/

Urban.controller("publicacionesListadoCtrl", function ($scope,$http){
	
	//pido datos de bdd
		$http({ 
			url:"php/abm/publicaciones.listado.php",
		})
		.success(function(data, status){
			var rta=angular.fromJson(data);
			$scope.datosSQLpublicaciones=rta.reverse();
			tn(tn(tn(tn(document,"header",0),"ul",0),"li",0),"a",0).style.borderBottom="5px solid #fff";
		});
});