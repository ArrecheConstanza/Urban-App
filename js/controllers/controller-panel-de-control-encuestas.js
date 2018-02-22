/********************************************CONTROLLER PANEL DE CONTROL ENCUESTAS**************************************/

Urban.controller("panelDeControlEncuestasCtrl", function ($scope,$http,$location,$routeParams){

	//funcion volver atras
	$scope.back = function() { 
		$location.path( "/panelDeControl");
	}
	
	var estado_borrado;
	
	$scope.back_encuestas = function() { 
		var data=[];
		if(estado_borrado!="undefined"){
			if(estado_borrado!=$scope.borrado){
				if($scope.borrado){
					$scope.borrado="No";
				}
				else{
					$scope.borrado="Si";
				}
				data.push("BORRADO="+$scope.borrado);
			}
		}
		
		if(data.length){
			data.push("ID="+$routeParams["id"]);
			var datos=data.join('&');
			$http({ 
				method:"POST",
				url:"php/abm/encuesta.editar.admin.php",
				data : datos,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			})
			.success(function(data, status){
				console.log(data);
				if(!data){
					//modal error al editar, reload?
				}
			})
			.error(function(data){
				//sin internet, cargo datos locales
				
			});
		}
			
		$location.path( "/panelDeControl/Encuestas");
	}
	
		//**** una encuesta ****//
		if($routeParams["id"]!=undefined){
			var datos="id="+$routeParams["id"];
			$http({ 
				method:"POST",
				url:"php/abm/encuesta.detalle.php",
				data : datos,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			})
			.success(function(data, status){
				$scope.datosSQLencuesta=angular.fromJson(data[0]);
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
								array_votos["ID"]=current;
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
						array_votos["ID"]=current;
						array_votos["CANTIDAD"]=cnt;
						array_votacion_final.push(array_votos);
					}
					
					//////porcentaje
					$scope.estado_encuesta=array_votacion_final;
					for(var i=0;i<array_votacion_final.length;i++){
						var opcion;
						for(var j=0;j<$scope.datosSQLencuesta["OPCIONES"].length;j++){
							if($scope.datosSQLencuesta["OPCIONES"][j]["ID"]==array_votacion_final[i]["ID"]){
								array_votacion_final[i]["RESPUESTA"]=$scope.datosSQLencuesta["OPCIONES"][j]["RESPUESTA"];
							}
						}
						array_votacion_final[i]["PORCENTAJE"]=(array_votacion_final[i]["CANTIDAD"]*100/data.length).toFixed(2)+"%";
					}
				 	if(array_votacion_final.length){
						$scope.datosSQLencuesta["OPCIONES"]=array_votacion_final;
					} 
				})
				.error(function(){
					// sin internet
				}); 
				//////////////
				
				$scope.buttonPositionBorrado=function(){
					if($scope.borrado){
						$scope.borrado=false;
					}
					else{
						$scope.borrado=true;
					}
				}
				
				
				//**** estado de switch ****//
				if(data[0]["BORRADO"]=="No"){
					$scope.borrado=true;
				}
				
				estado_borrado=$scope.borrado;
			})
			.error(function(data){
				//sin internet, cargo datos locales
				
			});
		}
		
		
		//**** Listado de encuestas ****//
		else{
			$http({ 
				method:"POST",
				url:"php/abm/traer.encuestas.php",
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			})
			.success(function(data, status){
				//mostrar una sola encuesta en caso de repetirse en grupos.
				/* var sacar=[];
				for(var i=0;i<data.length;i++){
					var j=i;
					j++;
					if(data[j]!=undefined){
						if(data[i]["PREGUNTA"]==data[j]["PREGUNTA"]&&data[i]["FECHA_CREACION"]==data[j]["FECHA_CREACION"]){
							sacar.push(i);
						}
						
					}
					
				} 
				sacar=sacar.reverse();
				for(var i=0;i<sacar.length;i++){
					data.splice(sacar[i],1);
				} */
				$scope.datosSQLencuestas=angular.fromJson(data); 
				
			})
			.error(function(data){
				//sin internet, cargo datos locales
				
			});
		}	
});