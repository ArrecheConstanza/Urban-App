/********************************************CONTROLLER PUBLICACIONES LISTADO**************************************/

Urban.controller("publicacionesListadoCtrl", function ($scope,$http,$routeParams){
	
		//**** CATEGORIAS ****//
	
		$http({ 
			method:"POST",
			url:"php/abm/traer.categorias.php",
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
		})
		.success(function(data, status){
			$scope.categorias=data;
			localStorage.setItem("categorias_urban",angular.toJson(data));
		})
		.error(function(data){
			//sin internet, cargo datos locales
			if(localStorage.getItem("categorias_urban")!="undefined"){
				$scope.categorias=localStorage.getItem("categorias_urban");
			}
		});
	
		//
		localStorage.setItem("urban_url",window.location.href);
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