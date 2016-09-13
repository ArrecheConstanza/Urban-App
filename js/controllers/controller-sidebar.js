/********************************************CONTROLLER SIDEBAR ***************************************/

Urban.controller("sidebarCtrl", function ($location,$http,$scope,$window) {
	
	if(localStorage.getItem("user_urban")!=null){
		
		//nombre de usuario
		$scope.nombre_usuario=angular.fromJson(localStorage.getItem("user_urban")).NOMBRE;
		
		datos="id="+angular.fromJson(localStorage.getItem("user_urban")).ID;
		
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
		});
	
		//redireccion a mapa
		if(id("boton-mapa")!=null){ 
			id("boton-mapa").onclick=function(){
				$window.location.href = '/urban-app/vistas/mapa.html';
			}
		}
				
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
	}
});