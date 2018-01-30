/********************************************CONTROLLER EDITAR DATOS USUARIO***************************************/

Urban.controller("editarDatosUsuarioCtrl",  ['$scope', '$http', '$location', 'Upload', '$timeout', function  ($scope, $http, $location, Upload, $timeout) { 

	$scope.titulo=localStorage.getItem("editar_usuario"); //preguntar si no es undefined
	var inputs=tn(id("form-ingreso"),"input");
	for(var i=0;i<inputs.length;i++){
		if(inputs[i].name!=$scope.titulo.toLowerCase()&&inputs[i].value!="Guardar"){
			inputs[i].style.display="none";
		}
	}
	if($scope.titulo.toLowerCase()=='edad'){
		var label=ce("label");
		label.innerHTML="Edad";
		ac(id("form-ingreso"),label);
		id("form-ingreso").insertBefore(label, id("form-ingreso").childNodes[0]);
	}

	
	/**** Envio de form ****/
	$scope.editar_datos_usuario=function(usuario){
		
	}

	
}]);