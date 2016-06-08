/****************************************FUNCIONES GLOBALES****************************************/

function ce(e){
	return document.createElement(e);
}
function ac(p,e){
	return p.appendChild(e);
}
function rc(p,e){
	return p.removeChild(e);
}
function tn(p,e,n){
	if(!isNaN(n)){
		return p.getElementsByTagName(e)[n];
	}
	return p.getElementsByTagName(e);
}
function id(e){
	return document.getElementById(e);
}
function txt(s){
	return document.createTextNode(s);
}

/////////VALIDACION DEL FORM REGISTRO UNO
function validar_form_registro_uno(e,estado){
	switch(e.name){
		case 'nombre': case 'apellido':
			if(!validar_nombre_apellido(e.value)){
				if(!e.value==''){
					var tx=txt('Solo puede poseer letras y espacios');		
				}
			}
			break;
			case 'email':
				if(!validar_email(e.value)){
					var tx=txt('El email es invalido.');
				}
			break;
			case 'clave':
				if(!validar_clave(e.value)){
					var tx=txt('Minimo 3 caracteres, máximo 15. Sin espacios.');
				}
			break;
		}
		if(tx){
			e.style.borderBottom='solid red 1px';
			var p=tn(e.parentNode,'p',0);
			if(p==undefined){
				p=ce('p');
				p.className='mensaje-validacion';
				ac(p,tx);
				e.parentNode.insertBefore(p,e);
			}
		}
		else{
			if(!estado){
				e.style.borderBottom='1px solid #aaa';
				var p=tn(e.parentNode,'p',0);
				if(p!=undefined){
					rc(p.parentNode,p);
				}
			}
		}
}


/***********************************VARIABLES GLOBALES*******************************************/


/******************************************MODULOS***********************************************/

var Urban = angular.module('Urban', [
  'ngRoute',
  'mobile-angular-ui',
  'mobile-angular-ui.gestures',
  //'google-maps'
  'uiGmapgoogle-maps'
//  'ngFileUpload' -> para update de fotos (a futuro)
]);


/////ADAPTACION DE PANTALLA

Urban.run(function($transform) {
  window.$transform = $transform;
});

/////RUTEO

Urban.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl : 'vistas/index-cont.html',
			controller : 'indexCtrl'
		})
		.when('/registroUno', {
			templateUrl : 'vistas/registro-datos.html',
			controller : 'registroUnoCtrl'
		})
		/*.when('/registroDos', {
			templateUrl : 'vistas/registro-mapa.html',
			controller : 'registroDosCtrl'
		})*/
		.otherwise({
			redirectTo: '/'
		});
});



/*****************************************************CONTROLLERS************************************************/

/////CONTROLLER INDEX (login)
Urban.controller("indexCtrl", function ($scope, $http) { 

});


/////CONTROLLER REGISTRO UNO 
Urban.controller("registroUnoCtrl", function ($scope, $window) { 

	//validar los inputs en el onblur
	var datos_registro_uno=tn(tn(document,'form',0),'input');
	for(var i=0;i<datos_registro_uno.length;i++){
		datos_registro_uno[i].onblur=function(){
			validar_form_registro_uno(this);
		}
	}
	
	//envio del form
	$scope.submit = function (usuario){
		var datos={
			EMAIL : usuario.EMAIL,
			CLAVE : usuario.CLAVE,
			NOMBRE : usuario.NOMBRE,
			APELLIDO : usuario.APELLIDO
		}; 
		var item = [];
		var datos_registro_uno=tn(tn(document,'form',0),'input');
		for(var i in usuario){
			item.push( i+'='+usuario[i] ); 
		}
		//validar inputs en el submit
		for(var i=0;i<datos_registro_uno.length;i++){
			validar_form_registro_uno(datos_registro_uno[i],"submit");
		}
		var mensaje=tn(tn(document,'form',0),'p');
		if(!mensaje.length){
			var union = item.join('&');	
			localStorage.setItem("dts_user",union);
			//redireccion a vistas/registro-mapa, guardado de datos en variable global union
			$window.location.href = '/urban-app/vistas/registro-mapa.html';
			 //$location.path( "/registroDos" );
		}
	}
	
});


/////CONTROLLER REGISTRO DOS MAPA
Urban.controller("registroDosCtrl", function ($scope,$http) { 
	id("registroMapa-continue-btn").onclick=function(){
		var direccion=tn(tn(document,'form',0),'input',0).value;
		if(localStorage.getItem("dts_user")!=null){
			var union=localStorage.getItem("dts_user");
			union+="&DIRECCION="+direccion;
			localStorage.setItem("dts_user",union);
		}
		union+="&direccion="+direccion;
		$http({
			method: 'POST',
			url:"php/abm/registro.usuario.php",
			data: union,	
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
		})
		.success(function(mdata){
			
		})
		.error(function(){
			
		});
	}
});





