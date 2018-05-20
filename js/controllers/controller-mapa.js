/**************************************CONTROLLER MAPA***************************************/

Urban.controller("mapaCtrl", function ($location,$http,$scope,$window) {

	//**** listar grupos en mapa ****//
		
		//pido datos de bdd
		var datos="id_grupo="+id;
			$http({ 
				method:"POST",
				url:"../php/abm/mapa.grupos.listado.php",
				data: "mapa=true",	
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			})
			.success(function(data, status){
				if(data=="0"){ // no logueado
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
				else{
					/* console.log(data);
					for(var i=0;i<data.length;i++){
						
					} */
					//traer usuarios por grupo
					/* $http({ 
						method:"POST",
						url:"../php/abm/traer.usuarios.un.grupo.php",
						data: "mapa=true",	
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
					})
					.success(function(data, status){
						
					})
					.error({
						
					}); */
					
					//cambio fk_multimedia por la direccion de la foto
					$http({ 
						url:"../php/abm/traer.multimedia.php"
					})
					.success(function(data2, status){
						for(var j in data2){
							for(var i in data){
								if(data[i]["FKMULTIMEDIA"]==data2[j]["ID"]){
									foto=data2[j]["PATH"].substring(25,data2[j]["PATH"].length);
									data[i]["FKMULTIMEDIA"]=".."+foto;
								}
								else if(data[i]["FKMULTIMEDIA"]==null){ //foto por defecto si no tiene
									data[i]["FKMULTIMEDIA"]="/urban-app/img/fotos/muestra.jpg"; 
								}
							}
							
						}
					})
					.error(function(data){
						//modal("error");
					});
						//******* si ya esta unido no aparece el boton para unirse
						$http({ 
							method:"POST",
							url:"../php/abm/usuario.grupos.listado.php",
							data: "id=este",	
							headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
						})
						.success(function(data3, status){
							grupos_ya_unido=data3;
						})
						.error(function(data){
							//modal("error");
						});
					}
				
				//variable global para listar grupos en google-maps
				grupos=data;
			})
			.error(function(data){
				//sin internet
			});;
});