/********************************************CONTROLLER PUBLICACIONES LISTADO**************************************/

Urban.controller("publicacionesListadoCtrl", function ($scope,$http,$routeParams){
	
	//**** CATEGORIAS ****//
		
		$scope.listado_categorias_seleccionadas=[];

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
	
	//**** LISTADO PUBLICACIONES *****//
		
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
					var nuevo_array=[];
					for(var i in data){
						var es_categoria=false;
						//si se filtra por categoria
						if(localStorage.getItem("categoria_publicacion")!=null&&localStorage.getItem("categoria_publicacion")!=""){
							var categorias=localStorage.getItem("categoria_publicacion");
							for(var j=0;j<categorias.length;j++){
								if(data[i].FK_CATEGORIA==categorias[j]){
									es_categoria=true;
								}
							}
						}
				
						//si tiene o no foto
						if(!data[i].FOTO.length){
							data[i].FOTO="/urban-app/img/fotos/muestra.jpg";
						}
						else{
							//solo 1 foto, editar cuando se suban mas de una
							var foto=data[i].FOTO[0]["DIR"].substring(26,data[i].FOTO[0]["DIR"].length);
							data[i].FOTO=foto;
						}
						
						//es categoria, lo cargo
						if(es_categoria){
							nuevo_array.push(data[i]);
						}
					} 
					
					//si esta filtrado por categorias
					var rta;
					if(localStorage.getItem("categoria_publicacion")!=null&&localStorage.getItem("categoria_publicacion")!=""){
						if(nuevo_array.length>=1){
							rta=angular.fromJson(nuevo_array);
							$scope.hay_filtrado=true;
							var listado_categorias=localStorage.getItem("categoria_publicacion");
							for (i in $scope.categorias){
								for (j in listado_categorias){
									if($scope.categorias[i].ID==listado_categorias[j]){
										$scope.listado_categorias_seleccionadas.push($scope.categorias[i].TITULO);
									}
								}
							}
							id("filtrado_categorias").style.padding=".5em";
						}
						else{
							id("filtrado_categorias").style.padding="0";
							rta=angular.fromJson(data);
							$scope.hay_filtrado=false;
						}
					}
					else{
						id("filtrado_categorias").style.padding="0";
						rta=angular.fromJson(data);
						$scope.hay_filtrado=false;
					}
					
					//cargo datos en vista
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