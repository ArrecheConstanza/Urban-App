/**************************************CONTROLLER MAPA***************************************/

Urban.controller("mapaCtrl", function ($location,$http,$scope,$window) {
	//pido datos de bdd
		$http({ 
				url:"../php/abm/grupos.listado.php",
			})
			.success(function(data, status){
				if(data=="0"){
					console.log("error, no esta iniciada la session");
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