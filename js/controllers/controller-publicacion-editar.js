/********************************************CONTROLLER PUBLICACION EDITAR**************************************/

Urban.controller("editarPublicacionCtrl", function ($scope,$http,$location,$routeParams){
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
		$scope.FECHA_CREACION=data[0].FECHA_CREACION;
		console.log($scope.TITULO);
		console.log($scope.DESCRIPCION);
		//FOTO principal
		if(!data[0].FOTO.length){
			var foto="/urban-app/img/fotos/muestra.jpg";
		}
		else{
			var foto=data[0].FOTO[0]["DIR"].substring(26,data[0].FOTO[0]["DIR"].length);
		}
		$scope.FOTO=foto;
		
		$scope.editar=function(id){
			//localStorage.setItem("publi_edit",angular.toJson(data[0]));
			$location.path("/editarPublicacion/"+id);
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
});