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
					var para_votacion_opcion=[];
					for(var i=0;i<data.length;i++){
						para_votacion_opcion.push(data[i]["FKOPCION"]);
					}
					para_votacion_opcion.sort();
					var current = null;
					var cnt = 0;
					var array_votacion_final=[];
					for (var i = 0; i < para_votacion_opcion.length; i++) {
						if (para_votacion_opcion[i] != current) {
							if (cnt > 0) {
								var array_votos=[];
								array_votos["VALOR"]=current;
								array_votos["CANTIDAD"]=cnt;
								array_votacion_final.push(array_votos);
							}
							current = para_votacion_opcion[i];
							cnt = 1;
						} 
						else {
							cnt++;
						}
					}
					if (cnt > 0) {
						var array_votos=[];
						array_votos["VALOR"]=current;
						array_votos["CANTIDAD"]=cnt;
						array_votacion_final.push(array_votos);
					}
					
					//////porcentaje
					$scope.estado_encuesta=array_votacion_final;
					for(var i=0;i<array_votacion_final.length;i++){
						var opcion;
						console.log($scope.datosSQLencuestas);
						for(var j=0;j<$scope.datosSQLencuestas["OPCIONES"].length;j++){
							if($scope.datosSQLencuestas["OPCIONES"][j]["ID"]==array_votacion_final[i]["VALOR"]){
								array_votacion_final[i]["VALOR_OPCION"]=$scope.datosSQLencuestas["OPCIONES"][j]["RESPUESTA"];
								console.log($scope.datosSQLencuestas["OPCIONES"][j]["RESPUESTA"]);
							}
						}
						array_votacion_final[i]["PORCENTAJE"]=(array_votacion_final[i]["CANTIDAD"]*100/data.length).toFixed(2)+"%";
						array_votacion_final[i]["PORCENTAJE_CSS"]=parseInt(array_votacion_final[i]["PORCENTAJE"]);
					}
				})
				.error(function(){
					// sin internet
				}); 
			//////////////////
			
			
			
			
			
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