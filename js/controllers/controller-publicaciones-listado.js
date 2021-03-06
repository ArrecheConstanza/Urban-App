/********************************************CONTROLLER PUBLICACIONES LISTADO**************************************/

Urban.controller("publicacionesListadoCtrl", function ($scope,$http,$routeParams){
	
	if(localStorage.getItem("recien_creado")!=null&&localStorage.getItem("recien_creado")=="true"){
		localStorage.removeItem("recien_creado");
		location.reload();
	}
	id("es_footer").style.display="inline-block";
			id("nav-bar").style.display="inline-block";
			id("es_filtro").style.display="inline-block";
	if(localStorage.getItem("hay_grupo")!=null&&localStorage.getItem("hay_grupo")=="no"){
			localStorage.removeItem("hay_grupo");			
		}
	//icono filtro
		id("buscador").style.display='inline-block';

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
	
	//**** LISTADO PUBLICACIONES ****//
		
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
							//data[i].FOTO="/urban-app/img/fotos/muestra.jpg";
							data[i].FOTO="";
						}
						else{
							//solo 1 foto, editar cuando se suban mas de una
							var foto=data[i].FOTO[0]["DIR"].substring(26,data[i].FOTO[0]["DIR"].length);
							data[i].FOTO=foto;
						}
						
						//si tiene o no foto el usuario creador
						if(!data[i].FOTO_USUARIO.length){
							data[i].FOTO_USUARIO="/urban-app/img/fotos/usuario.jpg";
						}
						else{
							//solo 1 foto, editar cuando se suban mas de una
							var foto=data[i].FOTO_USUARIO[0]["DIR"].substring(26,data[i].FOTO_USUARIO[0]["DIR"].length);
							data[i].FOTO_USUARIO=foto;
						}
						
						//es categoria, lo cargo
						if(es_categoria){
							nuevo_array.push(data[i]);
						}
						
						//si el usuario likeo esta publicacion
						data[i].LIKEADA=false;
						if(data[i].LIKES.length){
							for(var j=0;j<data[i].LIKES.length;j++){
								if(data[i].LIKES[j]["FK_USUARIO"]==data[i].USUARIO_ID){
									//corazon verde 
									data[i].LIKEADA=true;
								}
							}
						}
						
					} 
					
					//si esta filtrado por categorias
					var rta;
					if(localStorage.getItem("categoria_publicacion")!=null&&localStorage.getItem("categoria_publicacion")!=""){
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
					
					//cargo datos en vista
					$scope.datosSQLpublicaciones=rta.reverse();
					
					//almacenamiento local. sin internet
					localStorage.setItem("listado_publicaciones",angular.toJson(rta));

				})
				.error(function(){	// sin internet
					//CARGO DATOS LOCALES
					if(localStorage.getItem("listado_publicaciones")!=null){
						console.log("entre");
						data=angular.fromJson(localStorage.getItem("listado_publicaciones"));
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
							//data[i].FOTO="/urban-app/img/fotos/muestra.jpg";
							data[i].FOTO="";
						}
						else{
							//solo 1 foto, editar cuando se suban mas de una
							var foto=data[i].FOTO[0]["DIR"].substring(26,data[i].FOTO[0]["DIR"].length);
							data[i].FOTO=foto;
						}
						
						//si tiene o no foto el usuario creador
						if(!data[i].FOTO_USUARIO.length){
							data[i].FOTO_USUARIO="/urban-app/img/fotos/usuario.jpg";
						}
						else{
							//solo 1 foto, editar cuando se suban mas de una
							var foto=data[i].FOTO_USUARIO[0]["DIR"].substring(26,data[i].FOTO_USUARIO[0]["DIR"].length);
							data[i].FOTO_USUARIO=foto;
						}
						
						//es categoria, lo cargo
						if(es_categoria){
							nuevo_array.push(data[i]);
						}
						
						//si el usuario likeo esta publicacion
						data[i].LIKEADA=false;
						if(data[i].LIKES.length){
							for(var j=0;j<data[i].LIKES.length;j++){
								if(data[i].LIKES[j]["FK_USUARIO"]==data[i].USUARIO_ID){
									//corazon verde 
									data[i].LIKEADA=true;
								}
							}
						}
						
					} 
					
					//si esta filtrado por categorias
					var rta;
					if(localStorage.getItem("categoria_publicacion")!=null&&localStorage.getItem("categoria_publicacion")!=""){
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
					
					//cargo datos en vista
					$scope.datosSQLpublicaciones=rta.reverse();
					}
					
					
				});
				
				//**** VER PUBLICACION ****//
				$scope.detallePublicacion=function(publi){
					localStorage.setItem("id_publi",publi);
					window.location.href="/urban-app/index.html#/detallePublicacion";
				}
				
				//**** LIKE PUBLICACION ****//
				$scope.dar_like=function(publi){
					var datos="FKPUBLICACION="+publi.ID;
					$http({ 
						method:"POST",
						url:"php/abm/publicacion.like.php",
						data: datos,	
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
					})
					.success(function(data, status){
						if(data=='1'){
							 //mostrar o sacar corazon
							 if(publi.LIKEADA){
								 publi.LIKEADA=false;
								 publi.LIKES.length-=1;
							 }
							 else{
								publi.LIKEADA=true;
								publi.LIKES.length+=1;
							 }
						}
						
					})
					.error(function(){
						//sin internet, modal intentar mas tarde
					});
				}

		}
		else{
			//modal de error, no hay grupo, redireccion a mapa para union a grupo o creacion de grupo
		}
});