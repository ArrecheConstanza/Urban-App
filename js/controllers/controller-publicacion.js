/********************************************CONTROLLER NEW PUBLICACION***************************************/

Urban.controller("newPublicacionCtrl",  ['$scope', '$http', '$location', 'Upload', '$timeout', function  ($scope, $http, $location, Upload, $timeout) { 
	var input_titulo;
	
	//listar grupos de usuario
	var datos="usuario=true";
		$http({ 
			method:"POST",
			url:"php/abm/grupos.listado.php",
			data: datos,	
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
		})
		.success(function(data, status){
			var rta=angular.fromJson(data);
			$scope.listado_grupos=rta;
		})
		.error(function(){
			//mensaje Sin conexion 
		});
	
	/////EDITAR
	if(localStorage.getItem("publi_edit")!=null){
		var datos_anteriores=angular.fromJson(localStorage.getItem("publi_edit"));
		window.localStorage.removeItem("publi_edit");
		var conteiner=id("container_form");
		conteiner.innerHTML+="<form  role='form' enctype='multipart/form-data' name='publi'><select class='select' name='grupo'><option  value='Todos'  ng-model='GRUPO'>Todos</option><option  value='Uno'>Uno</option><option  value='Dos'>Dos</option></select><div class='col-lg-offset-10 col-md-offset-10 col-sm-offset-8 col-xs-offset-6 col-lg-2 col-md-2 col-sm-4 col-xs-6'> <input class='upload-file'  type='file' ngf-select ng-model='FILE' name='file' accept='image/*' ngf-max-size='2MB'><img ng-show='publi.FILE.$valid' ngf-src='FILE' class='thumb'></div><input type='text' id='titulo_edit' name='titulo' placeholder='titulo' class='form-control' required value='"+datos_anteriores.TITULO+"' ng-model='TITULO'><textarea id='edit_descripcion' cols='10' rows='6' name='descripcion' placeholder='descripcion' class='form-control' required ng-model='DESCRIPCION'>"+datos_anteriores.DESCRIPCION+"</textarea><input type='button' class='form-control btn btn-default' id='button_upload' value='Enviar'></form>";
		id("button_upload").onclick=function(){
			var titulo_edit=id('titulo_edit').value;
			var edit_descripcion=id('edit_descripcion').value;
			var union="ID="+datos_anteriores.ID+"&TITULO="+titulo_edit+"&DESCRIPCION="+edit_descripcion;
			$http({
				method: 'POST',
				url:"php/abm/editar.publicacion.php",
				data: union,	
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			})
			.success(function(data){
				if(data==1){
					window.localStorage.removeItem("publi_edit");
					$location.path("/publicaciones");
				}
				else{
					//mensaje no se pudo editar
				}
			})
			.error(function(){
				//mensaje Sin conexion 
			});
		}
	}
		////CREAR
	else{
		$scope.crear_publicacion=function(publicacion){
			datos_publicacion={
				FKGRUPO: publicacion.FKGRUPO,
				FOTO: publicacion.FILE,
				TITULO: publicacion.TITULO,
				DESCRIPCION: publicacion.DESCRIPCION
			}
			
			//FALTA validacion de datos en submit
			var titulo=datos_publicacion["TITULO"];
			titulo.upload = Upload.upload({
				method: 'POST',
				url:"php/abm/new.publicacion.php",
				data: datos_publicacion,
			})
			.then(function(response){
				console.log(response);
				alert("ok");
			}
			,function(response){
				console.log(response);
				alert("mal");
				
			});
		}
	}
}]);
	
	