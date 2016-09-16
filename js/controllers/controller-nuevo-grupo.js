/********************************************CONTROLLER NUEVO GRUPO***************************************/


Urban.controller("newGrupoCtrl",  ['$scope', '$http', '$location', 'Upload', '$timeout', function  ($scope, $http, $location, Upload, $timeout) { 
	
	//posicion de grupo almacenada en localstorage
	if(localStorage.getItem("nuevo_grupo_position")!=null && localStorage.getItem("nuevo_grupo_position")!=""){
		var position=angular.fromJson(localStorage.getItem("nuevo_grupo_position"));
		localStorage.removeItem("nuevo_grupo_position");
	}
	else{
		modal("error");
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
		})
		.then(function(response){
			if(response.data){
				datos="id_grupo="+response.data;
				//unir el usuario a ese grupo
				$http({
					method: 'POST',
					url:"php/abm/usuario.grupos.unir.php",
					data: datos,	
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
				})
				.success(function(data, status){
					//console.log(data);
					if(data!="0"){
						localStorage.setItem("grupo_seleccionado_urban",data);
						$location.path("/publicaciones");
					}
					else{
						//modal, error al crear grupo
					}
				});
			}
			else{
				modal("error");
			}
		}
		,function(response){
			modal("error");
		});
	}
	
}]);