/********************************************CONTROLLER INDEX***************************************/

Urban.controller("indexCtrl", function ($location,$http,$scope) {

	//funcion volver atras
	$scope.$back = function() { 
		window.history.back();
	};

	//Si el usuario no esta logeado lo mando al login
	if(localStorage.getItem("user_urban")==null){
		
		$location.path( "/" );
	}
});