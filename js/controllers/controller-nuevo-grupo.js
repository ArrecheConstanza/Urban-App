/********************************************CONTROLLER NUEVO GRUPO***************************************/


Urban.controller("newGrupoCtrl",  ['$scope', '$http', '$location', 'Upload', '$timeout', function  ($scope, $http, $location, Upload, $timeout) { 
	
	//posicion de grupo almacenada en localstorage
	if(localStorage.getItem("nuevo_grupo_position")!=null && localStorage.getItem("nuevo_grupo_position")!=""){
		var position=angular.fromJson(localStorage.getItem("nuevo_grupo_position"));
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
			console.log(response);
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
					console.log(data);
					/*var rta=angular.fromJson(data);
					$scope.datosSQLpublicaciones=rta.reverse();*/
				});
				//modal("ok");
				if(id("boton_modal")!=undefined){ //redireccion a las publicaciones de ese grupo
					id("boton_modal").onclick=function(){
						localStorage.setItem("urban_selected_group", grupo.NOMBRE);
						$location.path("\publicaciones");
					}
				}
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