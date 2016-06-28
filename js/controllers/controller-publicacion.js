/********************************************CONTROLLER NEW PUBLICACION***************************************/

/** TAREAS:

CREAR funcion validar_publicacion 
CREAR new.publicacion.php

**/


Urban.controller("newPublicacionCtrl", function ($scope, $http, $location, Upload) { 
	var input_titulo;
	header.style.display="none";
	footer.style.display="none";
	//funcion volver atras
	$scope.$back = function() { 
		header.style.display="inline";
		footer.style.display="inline";
		window.history.back();
	};
	
	/*$scope.GRUPOS = [
    	{ID : "0", NOMBRE : "Todos"},
    	{ID : "1", NOMBRE : "Grupo 1"},
   		{ID : "2", NOMBRE : "Grupo 2"},
   		{ID : "3", NOMBRE : "Grupo 3"}
 	];*/
	
	//validar inputs en el onblur
	var datos_new_publicacion=tn(tn(document,'form',0),'input');
	var textarea=tn(tn(document,'form',0),'textarea');
	for(var i=0;i<datos_new_publicacion.length;i++){
		datos_new_publicacion[i].onblur=function(){
			validar_publicacion(this);
		}
	}
	textarea[0].onblur=function(){
		validar_publicacion(this);
	}
	
	//envio del form
	$scope.submit = function (publicacion){
		//validar inputs en el submit
		var titulo;
		var datos_new_publicacion=tn(tn(document,'form',0),'input');
		var textarea=tn(tn(document,'form',0),'textarea');
		for(var i=0;i<datos_new_publicacion.length;i++){
			validar_publicacion(datos_new_publicacion[i],"submit");
			if(datos_new_publicacion[i].name=="titulo"){
				titulo=datos_new_publicacion[i].value;
			}
		}
		validar_publicacion(textarea[0],"submit");
		var mensaje=tn(tn(document,'form',0),'p');

	 	//Guardado de datos en bdd para creacion de publicacion
		if(!mensaje.length){
			var union="TITULO="+titulo+"&DESCRIPCION="+textarea[0].value;
			//ABM: new publicacion
			$http({
				method: 'POST',
				url:"php/abm/new.publicacion.php",
				data: union,	
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			})
			.success(function(data){
				if(data==1){
					header.style.display="inline";
					footer.style.display="inline";
					$location.path("/publicaciones");
				}
				else{
					//mensaje no estas logueado
				}
			})
			.error(function(){
				//mensaje Sin conexion 
			});
		}
	
	}
});