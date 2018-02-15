/********************************************CONTROLLER ENCUESTA LISTADO**************************************/

Urban.controller("encuestasListadoCtrl", function ($scope,$http,$routeParams){
	
		localStorage.setItem("urban_url",window.location.href);
		if(localStorage.getItem("grupo_seleccionado_urban")!=null){
			var datos="id="+$routeParams["id"];
			var array=[];
			
			//pido datos de bdd
				$http({ 
					method:"POST",
					url:"php/abm/encuestas.listado.php",
					data: datos,	
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
				})
				.success(function(data, status){
					console.log(data);
					var rta=angular.fromJson(data);
					$scope.datosSQLencuestas=rta.reverse(); 
				})
				.error(function(){
					// sin internet
				});
		}
		else{
			//modal de error, no hay grupo, redireccion a mapa para union a grupo o creacion de grupo
		}
});