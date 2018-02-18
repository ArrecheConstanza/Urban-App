/********************************************CONTROLLER PANEL DE CONTROL USUARIOS**************************************/

Urban.controller("panelDeControlUsuariosCtrl", function ($scope,$http,$location){

	//funcion volver atras
	$scope.back = function() { 
		$location.path( "/panelDeControl");
	}
	
	
	
	
});