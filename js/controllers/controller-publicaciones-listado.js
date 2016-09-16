/********************************************CONTROLLER PUBLICACIONES LISTADO**************************************/

Urban.controller("publicacionesListadoCtrl", function ($scope,$http,$routeParams){

		if(localStorage.getItem("grupo_seleccionado_urban")!=null){
			var datos="id="+$routeParams["id"];
			var array=[];
			//pido datos de bdd
				$http({ 
					method:"POST",
					url:"php/abm/publicaciones.listado.php",
					data: datos,	
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
				})
				.success(function(data, status){
					for(var i in data){
						if(!data[i].FOTO.length){
							data[i].FOTO="/urban-app/img/fotos/muestra.jpg";
						}
						else{
							//solo 1 foto, editar cuando se suban mas de una
							var foto=data[i].FOTO[0]["DIR"].substring(26,data[i].FOTO[0]["DIR"].length);
							data[i].FOTO=foto;
						}
					}
					var rta=angular.fromJson(data);
					$scope.datosSQLpublicaciones=rta.reverse();
				})
				.error(function(){
					// sin internet
				});
		}
		else{
			//modal de error, no hay grupo, redireccion a mapa para union a grupo o creacion de grupo
		}
});