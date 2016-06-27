/********************************************CONTROLLER NEW PUBLICACION***************************************/

/** TAREAS:

CREAR funcion validar_publicacion 
CREAR new.publicacion.php

**/


Urban.controller("newPublicacionCtrl", function ($scope, $http, $location, Upload) { 

	$scope.$back=back;

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

		//validar inputs en el submit
		var datos_new_publicacion=tn(tn(document,'form',0),'input');
		for(var i=0;i<datos_new_publicacion.length;i++){
			validar_publicacion(datos_new_publicacion[i],"submit");
		}
		var mensaje=tn(tn(document,'form',0),'p');

	 	//Guardado de datos en bdd para creacion de publicacion
		if(!mensaje.length){

			//guardar en localstorage
			if(!window.localStorage.getItem("dts_publi")){
				$scope.datos_en_push=[];
			}else{
				//Si existe en localStorage lo pido y guardo en variable datos_en_push
				$scope.datos_en_push = localStorage.getItem("dts_publi"); 
				$scope.datos_en_push = JSON.parse($scope.datos_en_push);
			}

			var datos={
				GRUPO : publicacion.GRUPO,
				FILE : publicacion.FILE,
				TITULO : publicacion.TITULO,
				DESCRIPCION : publicacion.DESCRIPCION
			}; 
		
			$scope.datos_en_push.push(datos);

			 //Guarda en localStorage datos_en_push, pasado a string como key dts_publi
			localStorage.setItem("dts_publi", JSON.stringify($scope.datos_en_push));
			
			for(var i in publicacion){
				item.push( i+'='+publicacion[i]); 
			}
			var union = item.join('&');	
			//ABM: publicacion
			publicacion.FILE.upload = Upload.upload({
				method: 'POST',
				url:"php/abm/new.publicacion.php",
				data: union,	
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			});

		    publicacion.FILE.upload.then(function (response) {
		    	// si el envio es exitoso
			    $timeout(function () {
		        publicacion.FILE.result = response.data; 

				//guarda la respuesta en local como string
				localStorage.setItem("sql_previos", JSON.stringify(response.data)) 
				
				
				$scope.datos_base = JSON.parse(localStorage.getItem("sql_previos"));
				$scope.pendientes = JSON.parse(localStorage.getItem("pendientes"));
					  
		      });
		    }, function (response) { 
		    	//si el envio fracasa
				if(!window.localStorage.getItem("pendientes")){
					$scope.datos_pend=[]; 
				}else{
					$scope.datos_pend = localStorage.getItem("pendientes"); 
					$scope.datos_pend = angular.fromJson($scope.datos_pend) 
			    }
	
				$scope.fallidos ={	GRUPO : publicacion.GRUPO,
									FILE : publicacion.FILE,
									src_img: publicacion.FILE.$ngfBlobUrl,
									TITULO : publicacion.TITULO,
									DESCRIPCION : publicacion.DESCRIPCION			
								} 
						
				$scope.datos_pend.push($scope.fallidos);

				//guarda en localStorage datos_pendientes, pasado a string.
				localStorage.setItem("pendientes", angular.toJson($scope.datos_pend)); 
	
				$scope.datos_base = JSON.parse(localStorage.getItem("sql_previos"))
				$scope.pendientes = JSON.parse(localStorage.getItem("pendientes"));
				
		   });


			/*ABM: registro
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
			});*/
		}
	
	}
	
});