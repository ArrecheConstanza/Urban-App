/********************************************CONTROLLER REGISTRO UNO***************************************/

Urban.controller("registroUnoCtrl", function ($scope, $window) { 

	//validar inputs en el onblur
	var datos_registro_uno=tn(tn(document,'form',0),'input');
	for(var i=0;i<datos_registro_uno.length;i++){
		datos_registro_uno[i].onblur=function(){
				validar_form(this);
		}
	}
	
	//envio del form
	$scope.submit = function (usuario){
		var edad = new Date(usuario.EDAD);
		var edad=edad.getDate()+"-"+(edad.getMonth()+1)+"-"+edad.getFullYear();
		console.log(edad);
		var datos={
			EMAIL : usuario.EMAIL,
			CLAVE : usuario.CLAVE,
			NOMBRE : usuario.NOMBRE,
			APELLIDO : usuario.APELLIDO,
			APELLIDO : usuario.EDAD
		}; 
		var item = [];
		var datos_registro_uno=tn(tn(document,'form',0),'input');
		for(var i in usuario){
			item.push( i+'='+usuario[i] ); 
		}
		//validar inputs en el submit
		for(var i=0;i<datos_registro_uno.length;i++){
			validar_form(datos_registro_uno[i],"submit");
		}
		var mensaje=tn(tn(document,'form',0),'p');
		if(!mensaje.length){
			var union = item.join('&');	
			localStorage.setItem("dts_user",union);
			//redireccion a vistas/registro-mapa, guardado de datos en LocalStorage de variable union
			$window.location.href = '/urban-app/vistas/registro-mapa.html';
		}
	}
	
});

