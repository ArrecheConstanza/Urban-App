/********************************************CONTROLLER NUEVO GRUPO***************************************/


Urban.controller("newGrupoCtrl",  ['$scope', '$http', '$location', 'Upload', '$timeout', function  ($scope, $http, $location, Upload, $timeout) { 
	
	//ocultado de header y footer
	header.style.display="none";
	footer.style.display="none";
	
	//posicion de grupo almacenada en localstorage
	if(localStorage.getItem("nuevo_grupo_position")!=null && localStorage.getItem("nuevo_grupo_position")!=""){
		var position=angular.fromJson(localStorage.getItem("nuevo_grupo_position"));
		console.log(position);
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
			alert("ok");
		}
		,function(response){
			console.log(response);
			alert("mal");
			
		});
	}
	
}]);