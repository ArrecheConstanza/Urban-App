/********************************************CONTROLLER ENCUESTA DETALLE**************************************/

Urban.controller("encuestaDetalleCtrl", function ($scope,$http,$location,$routeParams){
	var datos="id="+$routeParams["id"];
			
	//una encuesta
		$http({ 
			method:"POST",
			url:"php/abm/encuesta.detalle.php",
			data: datos,	
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
		})
		.success(function(data, status){
			for(var i=0;i<data.length;i++){
				data[i]["cantidad_opciones"]=data[i]["OPCIONES"].length;
			}
			var rta=angular.fromJson(data[0]);
			$scope.datosSQLencuestas=rta;
			
			//****** ESTADO DE ENCUESTA *****//
				$http({ 
					method:"POST",
					url:"php/abm/contar.encuesta.php",
					data: datos,	
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
				})
				.success(function(data, status){
					for(var i=0;i<data.length;i++){
						console.log(data[i]["FKOPCION"]);
					}
				})
				.error(function(){
					// sin internet
				}); 
			
			
			
			
			
			//****** VOTAR ******//
			$scope.votar=function(opcion){
				var datos;
				var li=tn(tn(tn(id("detalle-encuesta"),"form",0),"ul",0),"li");
				for(var i=0;i<li.length;i++){
					if(tn(li[i],"input",0).checked){
						datos="FKOPCIONES="+tn(li[i],"input",0).id+"&FKENCUESTA="+data[0].ID;
						
						//envio de datos a sql
						$http({ 
							method:"POST",
							url:"php/abm/votar.encuesta.php",
							data: datos,	
							headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
						})
						.success(function(data, status){
							console.log(data);
							//modal exito;
						})
						.error(function(){
							// sin internet
						}); 
					}
				}
			};
			//////////////////////
			
			
			
			
			
		})
		.error(function(){
			// sin internet
		}); 
		
	
	
	
});