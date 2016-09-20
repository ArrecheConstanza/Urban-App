/********************************************CONTROLLER PUBLICACION EDITAR**************************************/

Urban.controller("editarPublicacionCtrl",  ['$scope', '$http', '$location', 'Upload', '$timeout', '$routeParams', function  ($scope, $http, $location, Upload, $timeout, $routeParams) { 

	
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
		
	//************* EDITAR *************//
	var union="ID="+$routeParams.id;
	$http({
		method: 'POST',
		url:"php/abm/publicacion.detalle.php",
		data: union,	
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
	})
	.success(function(data){
		var rta=angular.fromJson(data[0]);
		$scope.ID=data[0].ID;
		$scope.publicacion.TITULO=data[0].TITULO;
		$scope.publicacion.DESCRIPCION=data[0].DESCRIPCION;
		$scope.publicacion.FKGRUPO=data[0].FK_GRUPO;
		//$scope.FECHA_CREACION=data[0].FECHA_CREACION;
		//FOTO principal
		if(!data[0].FOTO[0].DIR.length){ //re-ver
			var foto="/urban-app/img/fotos/muestra.jpg";
		}
		else{
			var foto=data[0].FOTO[0]["DIR"].substring(26,data[0].FOTO[0]["DIR"].length);
		}
		//$scope.publicacion.FILE=data[0].FOTO[0].DIR;
		
		$scope.editar_publicacion=function(publicacion){
			
			datos_publicacion={
				FKGRUPO: publicacion.FKGRUPO,
				FOTO: publicacion.FILE,
				TITULO: publicacion.TITULO,
				DESCRIPCION: publicacion.DESCRIPCION,
				ID: $routeParams.id
			}
			
			//FALTA validacion de datos 
			
			var titulo=datos_publicacion["TITULO"];
			titulo.upload = Upload.upload({
				method: 'POST',
				url:"php/abm/publicacion.editar.php",
				data: datos_publicacion,
			})
			.then(function(response){
				console.log(response);
				if(response.data){
					//modal exito?
					/*if(localStorage.getItem("grupo_seleccionado_urban")!=null){
						$location.path("/publicaciones/"+localStorage.getItem("grupo_seleccionado_urban"));
					}*/
				}
				else{
					//modal error
				}
			}
			,function(response){
				//modal error
				
			});
		}
		$scope.eliminar=function(){
			var union="ID="+data[0].ID;
			$http({
				method: 'POST',
				url:"php/abm/publicacion.eliminar.php",
				data: union,	
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			})
			.success(function(data){
				if(data){
					$location.path("/publicaciones");
				}
				else{
					//No se pudo borrar
				}
			})
			.error(function(){
				//Sin conexion
			});
		}
	})
	.error(function(){
		//mensaje Sin conexion 
	});
	/*if(localStorage.getItem("publi_edit")!=null){
		var datos_anteriores=angular.fromJson(localStorage.getItem("publi_edit"));
		console.log($scope.TITULO);
		//$scope.TITULO_EDITAR=datos_anteriores.TITULO;
		$scope.DESCRIPCION_EDITAR=datos_anteriores.DESCRIPCION;
		/*var datos_edit_publicacion=tn(tn(document,'form',0),'input');
		for(var i=0;i<datos_edit_publicacion.length;i++){
			//validar_publicacion(datos_edit_publicacion[i],"submit");
			if(datos_edit_publicacion[i].name=="titulo"){
				input_titulo=datos_edit_publicacion[i];
				//datos_edit_publicacion[i].value=datos_anteriores.TITULO;
			}
		}
		var textarea=tn(tn(document,'form',0),'textarea');
		textarea.innerHTML=datos_anteriores.DESCRIPCION;
	}*/
}]);