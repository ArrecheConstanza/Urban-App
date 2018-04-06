/**************************************CONTROLLER MAPA***************************************/

Urban.controller("mapaCtrl", function ($location,$http,$scope,$window) {

	//**** listar grupos en mapa ****//
		//pido datos de bdd
		
		var datos="id_grupo="+id;
			$http({ 
				method:"POST",
				url:"../php/abm/grupos.listado.php",
				data: "mapa=true",	
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			})
			.success(function(data, status){
				if(data=="0"){
					console.log("error, no esta iniciada la sesion");
				}
				else{
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
				}
				
				//variable global para listar grupos en google-maps
				grupos=data;
			});
});