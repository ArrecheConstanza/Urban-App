/********************************************CONTROLLER MAPA***************************************/

Urban.controller("mapaCtrl", function ($location,$http,$scope,$window) {
	//pido datos de bdd
		$http({ 
				url:"../php/abm/grupos.listado.php",
			})
			.success(function(data, status){
				grupos=data;
			});
			
	//CREAR GRUPO
	function crear_grupo(grupo){
		alert("entre");
		console.log(gurpo);
	}
});