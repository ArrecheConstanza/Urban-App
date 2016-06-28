/********************************************CONTROLLER PUBLICACIONES LISTADO**************************************/

Urban.controller("publicacionDetalleCtrl", function ($scope,$http){

	header.style.display="none";
	footer.style.display="none";
	//funcion volver atras
	$scope.$back = function() { 
		header.style.display="inline";
		footer.style.display="inline";
		window.history.back();
	};

	//pido datos de bdd
		$http({ 
			url:"php/abm/publicacion.detalle.php",
		})
		.success(function(data, status){
			var rta=angular.fromJson(data);
			$scope.item=rta;
		});

});