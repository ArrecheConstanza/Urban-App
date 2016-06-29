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
	
	/////EDITAR
	if(localStorage.getItem("publi_edit")!=null){
		var datos_anteriores=angular.fromJson(localStorage.getItem("publi_edit"));
		var conteiner=id("container_form");
		conteiner.innerHTML+="<form  role='form' ng-submit='update()' enctype='multipart/form-data' name='publi'><select class='select' name='grupo'><option  value='Todos'  ng-model='GRUPO'>Todos</option><option  value='Uno'>Uno</option><option  value='Dos'>Dos</option></select><div class='col-lg-offset-10 col-md-offset-10 col-sm-offset-8 col-xs-offset-6 col-lg-2 col-md-2 col-sm-4 col-xs-6'> <input class='upload-file'  type='file' ngf-select ng-model='FILE' name='file' accept='image/*' ngf-max-size='2MB'><img ng-show='publi.FILE.$valid' ngf-src='FILE' class='thumb'></div><input type='text' name='titulo' placeholder='titulo' class='form-control' required value='"+datos_anteriores.TITULO+"' ng-model='TITULO'><textarea cols='10' rows='6' name='descripcion' placeholder='descripcion' class='form-control' required ng-model='DESCRIPCION'>"+datos_anteriores.DESCRIPCION+"</textarea><input type='submit' class='form-control btn btn-default' value='Enviar'></form>";
		$scope.update=function(){
			var union="ID="+datos_anteriores.ID;
			console.log("clickkk");
			$http({
				method: 'POST',
				url:"php/abm/editar.publicacion.php",
				data: union,	
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			})
			.success(function(data){
				console.log(data);
				if(data==1){
					//window.localStorage.removeItem("publi_edit");
					header.style.display="inline";
					footer.style.display="inline";
					//$location.path("/publicaciones");
				}
				else{
					//mensaje no se pudo editar
				}
			})
			.error(function(){
				//mensaje Sin conexion 
			});
		}
		
	/*	$http({
			method: 'POST',
			url:"php/abm/editar.publicacion.php",
			data: union,	
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
		})
		.success(function(data){
			if(data==1){
				//window.localStorage.removeItem("publi_edit");
				header.style.display="inline";
				footer.style.display="inline";
				$location.path("/publicaciones");
			}
			else{
				//mensaje no se pudo editar
			}
		})
		.error(function(){
			//mensaje Sin conexion 
		});*/
	}
	else{
		var conteiner=id("container_form");
		conteiner.innerHTML+="<form  role='form' ng-submit='update()' enctype='multipart/form-data' name='publi'><select class='select' name='grupo'><option  value='Todos'  ng-model='GRUPO'>Todos</option><option  value='Uno'>Uno</option><option  value='Dos'>Dos</option></select><div class='col-lg-offset-10 col-md-offset-10 col-sm-offset-8 col-xs-offset-6 col-lg-2 col-md-2 col-sm-4 col-xs-6'> <input class='upload-file'  type='file' ngf-select ng-model='FILE' name='file' accept='image/*' ngf-max-size='2MB'><img ng-show='publi.FILE.$valid' ngf-src='FILE' class='thumb'></div><input type='text' name='titulo' placeholder='titulo' class='form-control' required ng-model='TITULO'><textarea cols='10' rows='6' name='descripcion' placeholder='descripcion' class='form-control' required ng-model='DESCRIPCION'></textarea><input type='submit' class='form-control btn btn-default' value='Enviar'></form>";
		
	}
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