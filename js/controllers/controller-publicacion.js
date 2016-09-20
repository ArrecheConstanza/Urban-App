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
	
	//************* CREAR *************//
	//else{
		$scope.crear_publicacion=function(publicacion){
			datos_publicacion={
				FKGRUPO: publicacion.FKGRUPO,
				FOTO: publicacion.FILE,
				TITULO: publicacion.TITULO,
				DESCRIPCION: publicacion.DESCRIPCION
			}
			
			//FALTA validacion de datos 
			
			var titulo=datos_publicacion["TITULO"];
			titulo.upload = Upload.upload({
				method: 'POST',
				url:"php/abm/new.publicacion.php",
				data: datos_publicacion,
			})
			.then(function(response){
				if(response.data){
					//modal exito?
					if(localStorage.getItem("grupo_seleccionado_urban")!=null){
						$location.path("/publicaciones/"+localStorage.getItem("grupo_seleccionado_urban"));
					}
				}
				else{
					//modal error
				}
			}
			,function(response){
				//modal error
				
			});
		}
	//}
}]);
	
	