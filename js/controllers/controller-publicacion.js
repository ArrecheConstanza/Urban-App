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
			if(data!="0"){
				todos={
					ID : "0",
					NOMBRE : "Todos"
				};
				var rta=angular.fromJson(data);
				//genero array para guardar todos los grupos en caso de que se quiera publicar en todos los grupos
					var id_grupo=[];
					for (var i=0;i<data.length;i++){
						id_grupo.push(data[i].ID);
					}
					$scope.grupos=id_grupo;
				//
				rta.push(todos);
				$scope.listado_grupos=rta.reverse();
			}
			//else logout
		})
		.error(function(){
			//mensaje Sin conexion 
		});
	
	//************* CREAR *************//

		$scope.crear_publicacion=function(publicacion){
			datos_publicacion={
				FKGRUPO: publicacion.FKGRUPO,
				GRUPOS: $scope.grupos, //en el caso de seleccionar todos los grupos
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
}]);
	
	