/********************************************CONTROLLER PANEL DE CONTROL**************************************/

Urban.controller("panelDeControlCtrl", function ($scope,$http){

	$scope.back=function(){
		window.location.href=localStorage.getItem("urban_url");
	}
	
	$scope.listado=["Usuarios", "Grupos", "Publicaciones", "Encuestas", "Estadisticas"];
});