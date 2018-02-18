/********************************************CONTROLLER SIDEBAR ***************************************/

Urban.controller("sidebarCtrl", function ($location,$http,$scope,$window,$routeParams) {
	
	if(localStorage.getItem("user_urban")!=null){
		
		//nombre de usuario
		
		$scope.nombre_usuario=angular.fromJson(localStorage.getItem("user_urban")).NOMBRE;
		
		var datos="id="+angular.fromJson(localStorage.getItem("user_urban")).ID;
		
		//foto perfil usuario
		if(angular.fromJson(localStorage.getItem("user_urban")).FKMULTIMEDIA!=null){
			var dato="fkmultimedia="+angular.fromJson(localStorage.getItem("user_urban")).FKMULTIMEDIA;
			$http({ 
				method:"POST",
				url:"php/abm/traer.una.multimedia.php",
				data: dato,	
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			})
			.success(function(data, status){
				if(data){
					var foto=data[0]["PATH"];
					foto=foto.replace("C:/xampp/htdocs/Urban-App/img/","");
					$scope.img=foto; //corregir para hosting

				}
				else{
					//error multimedia
				}
			})
			.error(function(data){
				//no hay internet, usar datos de localstorage
			});
		}
		else{ //sin imagen
			$scope.img="icons/png/usuario.png";
		}
		
		
		
		
		
		
		//funcion cambiar de grupos
		$scope.estado = {};
		$scope.id_grupo=localStorage.getItem("grupo_seleccionado_urban");
		
		$scope.cambiar_grupo=function(id){
			$scope.id_grupo=localStorage.getItem("grupo_seleccionado_urban");
			localStorage.setItem("grupo_seleccionado_urban",id);
			$scope.estado.activo = localStorage.getItem("grupo_seleccionado_urban");
			
			//nombre de grupo en footer
			if(localStorage.getItem("grupo_seleccionado_urban")!=null){
				var datos="id="+localStorage.getItem("grupo_seleccionado_urban");
				$http({ 
					method:"POST",
					url:"php/abm/un.grupo.php",
					data: datos,	
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
				})
				.success(function(data, status){
					document.getElementById("nombreGrupo").getElementsByTagName("p")[0].innerHTML=data[0].NOMBRE;
					$scope.id_grupo=localStorage.getItem("grupo_seleccionado_urban");
				})
				.error(function(){
					//mensaje Sin conexion 
				});
			}
		}
		
		//listar grupos
		$http({
			method: 'POST',
			url:"php/abm/usuario.grupos.listado.php",
			data: datos,	
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
		})
		.success(function(data, status){
			//cambio fk_multimedia por la direccion de la foto
				$http({ 
					url:"/urban-app/php/abm/traer.multimedia.php"
				})
				.success(function(data2, status){
					for(var j in data2){
						for(var i in data){
							if(data[i]["FKMULTIMEDIA"]==data2[j]["ID"]){
								foto=data2[j]["PATH"].substring(25,data2[j]["PATH"].length);
								data[i]["FOTO"]="/urban-app"+foto;
							}
							else if(data[i]["FKMULTIMEDIA"]==null){ //foto por defecto si no tiene
								data[i]["FOTO"]="/urban-app/img/fotos/muestra.jpg"; 
							}
						}
						
					}
				})
				.error(function(data){
					//modal("error");
				});
				var rta=angular.fromJson(data);
				$scope.datosSQLgrupos=rta.reverse();
				
				//grupo activo
				if(localStorage.getItem("grupo_seleccionado_urban")!=null){
					$scope.estado = {};
					$scope.estado.activo = localStorage.getItem("grupo_seleccionado_urban");
				}
				else{
					//error ningun grupo activo
				}
				
		});
	
		//redireccion a mapa
		if(id("boton-mapa")!=null){ 
			id("boton-mapa").onclick=function(){
				$window.location.href = '/urban-app/vistas/mapa.html';
			}
		}
		
		
		//preferencias
		
		id("nombre-menu").onclick=function(){
			localStorage.setItem("urban_url",$window.location.href);
		}
		
		
		
		//ayuda
		
		
		
		
		//cerrar sesion
		id("cerrar").parentNode.onclick=function(){
			$http({
				method: 'GET',
				url:"php/abm/logout.usuario.php",
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			})
			.success(function(data){
				if(data){
					window.localStorage.removeItem("user_urban");
					$location.path("/");
				}
			});
		}	
		
		
		//panel admin
		
		if(angular.fromJson(localStorage.getItem("user_urban")).NIVEL=="Admin"){
			$scope.es_admin=true;
		}
		else{
			$scope.es_admin=false;
		}
		
		
		
		
		
	}
});