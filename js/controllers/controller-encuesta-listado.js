/********************************************CONTROLLER ENCUESTA LISTADO**************************************/

Urban.controller("encuestasListadoCtrl", function ($scope,$http,$routeParams){
	
		localStorage.setItem("urban_url",window.location.href);
		
		//saco icono de filtro
		
		console.log(id("buscador"));
		id("buscador").style.display='none';
		
		if(localStorage.getItem("grupo_seleccionado_urban")!=null){
			var datos="id="+$routeParams["id"];
			var array=[];
			
			//listado de encuestas
				$http({ 
					method:"POST",
					url:"php/abm/encuestas.listado.php",
					data: datos,	
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
				})
				.success(function(data, status){
					for(var i=0;i<data.length;i++){
						data[i]["cantidad_opciones"]=data[i]["OPCIONES"].length;
					}
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