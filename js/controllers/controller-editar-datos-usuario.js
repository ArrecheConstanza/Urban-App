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
		
		$scope.fecha = new Date();

	}
	if($scope.titulo=='Direccion estado'){

		datos=angular.fromJson(localStorage.getItem("user_urban"));
		var label=ce("label");
		label.innerHTML="Dirección estado";
		ac(id("titulo_estado"),label);
		
		//**** Visible/Oculta ****//
		if(datos.DIRECCION_ESTADO=="Oculta"){
			setTimeout(function() {
				tn(id("form-ingreso"),'ui-switch',0).click()        
			 }, 0);
		}
	}
	else if($scope.titulo!='Direccion estado'){
		tn(id("form-ingreso"),'ui-switch',0).style.display="none";
	} 

	
	/**** Envio de form ****/
	$scope.editar_datos_usuario=function(usuario){

		//validar datos 
		
		
		//Si es edad, parseo fecha
		if(usuario.EDAD!=null){
			var date=usuario.EDAD;
			date = new Date (date);
			var month=parseInt(date.getMonth());
			month+=1;
			var edad=date.getFullYear()+"-"+month+"-"+date.getDate();
			usuario.edad=edad;
		}
		
		
		//creo objeto con datos
		var item = [];
		for(var i in usuario){
			item.push( i+'='+usuario[i] ); 
		}
		var union = item.join('&');	
		
		//guardado de datos en bdd
		$http({
			method: 'POST',
			url:"php/abm/usuario.editar.php",
			data: union,	
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
		})
		.success(function(data){
			if(data){ //exito. reruteo a ajustes
				$location.path("/ajustes");
			}
			else{
				//error, vuelva a intentarlo mas tarde
			}
		})
		.error(function(){
			//mensaje Sin conexion 
		});
	}

	
}]);