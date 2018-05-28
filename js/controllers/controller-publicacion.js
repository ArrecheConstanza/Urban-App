/********************************************CONTROLLER NEW PUBLICACION***************************************/

Urban.controller("newPublicacionCtrl",  ['$scope', '$http', '$location', 'Upload', '$timeout', function  ($scope, $http, $location, Upload, $timeout) { 
	var input_titulo;
	
	//**** CATEGORIAS ****//
	
	$http({ 
		method:"POST",
		url:"php/abm/traer.categorias.php",
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
	})
	.success(function(data, status){
		$scope.categorias=data;
		localStorage.setItem("categorias_urban",angular.toJson(data));
	})
	.error(function(data){
		//sin internet, cargo datos locales
		if(localStorage.getItem("categorias_urban")!="undefined"){
			$scope.categorias=localStorage.getItem("categorias_urban");
		}
	});
	
	//**** GRUPOS ****//
	
	if(localStorage.getItem("admin")!=null&&localStorage.getItem("admin")=="on"){
		localStorage.removeItem("admin");
	//MODO ADMIN. listado completo de grupos 
		$http({ 
			method:"POST",
			url:"php/abm/traer.grupos.php",
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
	
	}
	else{
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
	}
			
	//************* CREAR *************//
	
		//valido onblur
		var datos_publicacion=tn(tn(document,'form',0),'textarea','input');
		for(var i=0;i<datos_publicacion.length;i++){
			datos_publicacion[i].onblur=function(){
				validar_publicacion(this);
			}
		}

		$scope.crear_publicacion=function(publicacion){
			datos_publicacion={
				FKGRUPO: publicacion.FKGRUPO,
				GRUPOS: $scope.grupos, //en el caso de seleccionar todos los grupos
				FOTO: publicacion.FILE,
				TITULO: publicacion.TITULO,
				DESCRIPCION: publicacion.DESCRIPCION,
				FKCATEGORIA : publicacion.FKCATEGORIA
			}
			
			//valido submit
			for(var i=0;i<datos_publicacion.length;i++){
				validar_publicacion(datos_publicacion[i],"submit");
			}
			
			var mensaje=tn(tn(document,'form',0),'p');
			
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
	
	