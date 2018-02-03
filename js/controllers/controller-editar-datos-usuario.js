/********************************************CONTROLLER EDITAR DATOS USUARIO***************************************/

Urban.controller("editarDatosUsuarioCtrl",  ['$scope', '$http', '$location', 'Upload', '$timeout', function  ($scope, $http, $location, Upload, $timeout) { 


	//**** Formulario ****//
	$scope.titulo=localStorage.getItem("editar_usuario"); //preguntar si no es undefined
	var inputs=tn(id("form-ingreso"),"input");
	for(var i=0;i<inputs.length;i++){
		if(inputs[i].name!=$scope.titulo.toLowerCase()&&inputs[i].value!="Guardar"){
			inputs[i].style.display="none";
		}
		if($scope.titulo=="Clave"){
			if(inputs[i].name=="clave_nueva"){
				inputs[i].style.display="inline-block";
			}
		}
	}
	if($scope.titulo.toLowerCase()=='edad'){
		var label=ce("label");
		label.innerHTML="Edad";
		ac(id("titulo_edad"),label);
	}
	if($scope.titulo=='Direccion estado'){
		var label=ce("label");
		label.innerHTML="Dirección estado";
		ac(id("titulo_estado"),label);
	}
	else if($scope.titulo!='Direccion estado'){
		tn(id("form-ingreso"),'ui-switch',0).style.display="none";
	} 
	
	
	
	
	
	
	/**** Envio de form ****/
	$scope.editar_datos_usuario=function(usuario){

	
		//creo objeto para enviar a bdd 
	/* 	datos_usuario={};
		if(usuario.CLAVE!=undefined){
			var numero='', ban=0;
			for(var name in usuario) {
				if(ban<2){
					if(numero==''||numero=="1"){
						if(numero==""){
							datos_usuario={
								VARIABLE : name,
								VALOR : usuario[name],
							};
						}
						else{
							datos_usuario={
								VARIABLE1 : name,
								VALOR1 : usuario[name],
							};
						}
					}
					if(!ban){
						numero="1";
					}
					ban++;
				}
			}
		}
		else{
			var ban=0;
			for(var name in usuario) {
				if(!ban){
					datos_usuario={
						VARIABLE : name,
						VALOR : usuario[name],
					};
					ban=1;
				}
			}
		}

		console.log(datos_usuario); */
		
		
		//validar datos en onblur
		
		
		$http({
			method: 'POST',
			url:"php/abm/usuario.editar.php",
			data: usuario,	
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
		})
		.success(function(data){
			console.log(data);
		})
		.error(function(){
			//mensaje Sin conexion 
		});
		
	}

	
}]);