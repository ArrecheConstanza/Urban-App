/********************************************CONTROLLER NEW PUBLICACION***************************************/

/** TAREAS:

CREAR funcion validar_publicacion 
CREAR new.publicacion.php

**/


Urban.controller("newPublicacionCtrl", function ($scope, $http, $location) { 

	/*$scope.traerGrupos = function(  ){
		$http( { 
			url: 'php/traer.grupos.php' ,
		} ).success( function(data, status) {
			$scope.GRUPOS = data ;
		});
	}*/

	//cargar select hardcodeado
	$scope.GRUPOS = [
    	{ID : "0", NOMBRE : "Todos"},
    	{ID : "1", NOMBRE : "Grupo 1"},
   		{ID : "2", NOMBRE : "Grupo 2"},
   		{ID : "3", NOMBRE : "Grupo 3"}
 	];


	//validar inputs en el onblur
	var datos_new_publicacion=tn(tn(document,'form',0),'input');
	for(var i=0;i<datos_new_publicacion.length;i++){
		datos_new_publicacion[i].onblur=function(){
				validar_publicacion(this);
		}
	}
	
	//envio del form
	$scope.submit = function (publicacion){
		var datos={
			GRUPO : publicacion.GRUPO,
			FILE : publicacion.FILE,
			TITULO : publicacion.TITULO,
			DESCRIPCION : publicacion.DESCRIPCION
		}; 

		//validar inputs en el submit
		var datos_new_publicacion=tn(tn(document,'form',0),'input');
		for(var i=0;i<datos_new_publicacion.length;i++){
			validar_publicacion(datos_new_publicacion[i],"submit");
		}
		var mensaje=tn(tn(document,'form',0),'p');

	 	//Guardado de datos en bdd para creacion de publicacion
		if(!mensaje.length){
			localStorage.setItem("dts_publi",JSON.stringify(datos));
			for(var i in publicacion){
				item.push( i+'='+publicacion[i]); 
			}
			var union = item.join('&');	
			//ABM: registro
			$http({
				method: 'POST',
				url:"php/abm/new.publicacion.php",
				data: union,	
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			})
			.success(function(data){
				//modal con mensaje de exito 
				//redireccion a home de publicaciones
				window.localStorage.removeItem("dts_publi");
				$location.path( "/home" );
			})
			.error(function(){
				//mensaje Sin conexion 
			});
		}
	
	}
	
});