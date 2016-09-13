/********************************************CONTROLLER PUBLICACIONES LISTADO**************************************/

Urban.controller("publicacionesListadoCtrl", function ($scope,$http){
	
	if(localStorage.getItem("grupo_seleccionado_urban")!=null){
		var id=localStorage.getItem("grupo_seleccionado_urban");
		var datos="id="+id;
		//pido datos de bdd
			$http({ 
				method:"POST",
				url:"php/abm/publicaciones.listado.php",
				data: datos,	
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			})
			.success(function(data, status){
				var rta=angular.fromJson(data);
				$scope.datosSQLpublicaciones=rta.reverse();
			});
	}
	else{
		//modal de error, no hay grupo, redireccion a mapa para union a grupo o creacion de grupo
	}
});