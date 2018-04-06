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
		
		var datos;
		var nombre=datos_grupo["NOMBRE"];
		nombre.upload = Upload.upload({
			method: 'POST',
			url:"php/abm/new.grupo.php",
			data: datos_grupo,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
		})
		.then(function(response){
			if(response.data){
				localStorage.removeItem("en_proceso");

				//**** crear chat para grupo *****//
				datos="id_grupo="+response.data;
				$http({
					method: 'POST',
					url:"php/abm/new.chat.php",
					data: datos,	
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
				})
				.success(function(data, status){
					if(data){
						dato="id_chat="+data+"&"+datos;
						//**** unir usuario a chat ****//
						$http({
							method: 'POST',
							url:"php/abm/usuario.chat.unir.php",
							data: dato,	
							headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
						})
						.success(function(data, status){
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
					if(data!="0"){
						localStorage.setItem("grupo_seleccionado_urban",data);
						localStorage.setItem("recien_creado","true");
						$location.path("/publicaciones/"+response.data);
					}
					else{
						//modal, error al crear grupo
						console.log("error no hay data en usuario_grupo");
					}
				});
				//window.location.href="/urban-app/index.html#/";
			}
			else{
				//console.log("error no hay response data");
			}
		}
		,function(response){
			console.log("error");
		});
	}
	
}]);