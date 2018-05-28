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
			todos={
				ID : "0",
				NOMBRE : "Todos"
			};
			var rta=angular.fromJson(data);
			rta.push(todos);
			$scope.listado_grupos=rta.reverse();
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
		console.log(data);
		var rta=angular.fromJson(data[0]);
		$scope.ID=data[0].ID;
		$scope.publicacion.TITULO=data[0].TITULO;
		$scope.publicacion.DESCRIPCION=data[0].DESCRIPCION;
		$scope.publicacion.FKGRUPO=data[0].FK_GRUPO;
		$scope.publicacion.FKCATEGORIA=data[0].FK_CATEGORIA;
		
		//FOTO
		if(data[0].FOTO.length!=0){ 
			var foto=data[0].FOTO[0]["DIR"].substring(26,data[0].FOTO[0]["DIR"].length);
		}
		
		//valido onblur
		var datos_publicacion=tn(tn(document,'form',0),'textarea','input');
		for(var i=0;i<datos_publicacion.length;i++){
			datos_publicacion[i].onblur=function(){
				editar_publicacion(this);
			}
		}
		//valido submit
		for(var i=0;i<datos_publicacion.length;i++){
				editar_publicacion(datos_publicacion[i],"submit");
		}
			
		var mensaje=tn(tn(document,'form',0),'p');
		$scope.editar_publicacion=function(publicacion){	
			datos_publicacion={
				FKGRUPO: publicacion.FKGRUPO,
				FKCATEGORIA: publicacion.FKCATEGORIA,
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
				if(response.data=="1"){
					//modal exito
					$location.path("/publicaciones/"+localStorage.getItem("grupo_seleccionado_urban"));
				}
				else{
					//modal error
				}
			}
			,function(response){
				//modal error
				
			});
		}
	})
	.error(function(){
		//mensaje Sin conexion 
	});
}]);