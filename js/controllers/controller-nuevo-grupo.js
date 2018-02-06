/********************************************CONTROLLER NUEVO GRUPO***************************************/


Urban.controller("newGrupoCtrl",  ['$scope', '$http', '$location', 'Upload', '$timeout', function  ($scope, $http, $location, Upload, $timeout) { 
	
	//posicion de grupo almacenada en localstorage
	if(localStorage.getItem("nuevo_grupo_position")!=null && localStorage.getItem("nuevo_grupo_position")!=""){
		var position=angular.fromJson(localStorage.getItem("nuevo_grupo_position"));
		localStorage.removeItem("nuevo_grupo_position");
	}
	else{
		//modal("error");
		console.log("error no hay lat y long de nuevo grupo");
	}
	
	//creacion de grupo
	$scope.crear_grupo=function(grupo){
		datos_grupo={
			NOMBRE: grupo.NOMBRE,
			FOTO: grupo.FILE,
			ESTADO: grupo.ESTADO,
			LATITUD: position.LATITUD,
			LONGITUD: position.LONGITUD
		}
		
		//FALTA validacion de datos en submit
		
		var nombre=datos_grupo["NOMBRE"];
		nombre.upload = Upload.upload({
			method: 'POST',
			url:"php/abm/new.grupo.php",
			data: datos_grupo,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
		})
		.then(function(response){
			if(response.data){
				console.log("NUEVO GRUPO\n");
				console.log(response);
				//**** crear chat para grupo *****//
				var datos="id_grupo="+response.data;
				$http({
					method: 'POST',
					url:"php/abm/new.chat.php",
					data: datos,	
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
				})
				.success(function(data, status){
					console.log("NUEVO CHAT\n");
					console.log(data);
					if(data){
						var datos="id_chat"+data;
						//**** unir usuario a chat ****//
						$http({
							method: 'POST',
							url:"php/abm/usuario.chat.unir.php",
							data: datos,	
							headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
						})
						.success(function(data, status){
							console.log("usuario_chat\n\n");
							console.log(data);
							if(!data){
								//error no se pudo unir el usuario con el chat
							}
						});
					}
					else{
						//error, no se pudo crear chat. 
					}
				});

				//**** unir usuario a grupo ****//
				datos="id_grupo="+response.data;
				//unir el usuario a ese grupo
				$http({
					method: 'POST',
					url:"php/abm/usuario.grupos.unir.php",
					data: datos,	
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
				})
				.success(function(data, status){
					console.log("usuario_grupo \n\n");
					console.log(data);
					if(data!="0"){
						localStorage.setItem("grupo_seleccionado_urban",data);
						//$location.path("/publicaciones");
					}
					else{
						//modal, error al crear grupo
						console.log("error no hay data en usuario_grupo");
					}
				});
			}
			else{
				console.log("error no hay response data");
			}
		}
		,function(response){
			console.log("error");
		});
	}
	
}]);