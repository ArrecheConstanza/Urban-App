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
function validar_form(e,estado){
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
		.when('/home', {
			templateUrl : 'vistas/home.html',
			controller : 'homeCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
});



/********************************************CONTROLLERS***************************************/

/////CONTROLLER INDEX (login)
Urban.controller("indexCtrl", function ($scope, $http, $location) { 
	
	//validar inputs en el onblur
	var datos_login=tn(tn(document,'form',0),'input');
	for(var i=0;i<datos_login.length;i++){
		datos_login[i].onblur=function(){
			validar_form(this);
		}
	}
	
	//envio del form
	$scope.login = function (usuario){
		var datos={
			EMAIL : usuario.EMAIL,
			CLAVE : usuario.CLAVE
		}; 
		var item = [];
		var datos_login=tn(tn(document,'form',0),'input');
		for(var i in usuario){
			item.push( i+'='+usuario[i] ); 
		}
		//validar inputs en el submit
		for(var i=0;i<datos_login.length;i++){
			validar_form(datos_login[i],"submit");
		}
		var mensaje=tn(tn(document,'form',0),'p');
		if(!mensaje.length){
			var union = item.join('&');	
			//ABM: login
			$http({
				method: 'POST',
				url:"php/abm/login.usuario.php",
				data: union,	
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			})
			.success(function(data){
				if(!isNaN(data.ID)){
					//redireccion a home de usuario
					$location.path( "/home" );
				}
				else if(data==='Usuario no existente'){
					var p=ce('p');
					p.className='mensaje-validacion';
					p.innerHTML='Mail o contraseña incorrectos';
					datos_login[0].parentNode.insertBefore(p,datos_login[0]);
				}
			})
			.error(function(){
				//mensaje Sin conexion 
			});
		}
	}
	
});


/////CONTROLLER REGISTRO UNO (datos)
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


/////CONTROLLER REGISTRO DOS (mapa)
Urban.controller("registroDosCtrl", function ($scope,$http,$window) { 
	tn(id("title-container"),'a',0).onclick=function(){
		$window.location.href = '/urban-app/index.html#/registroUno';
	}
	id("registroMapa-continue-btn").onclick=function(){
		
		/*var direccion=tn(tn(document,'form',0),'input',0).value;
		if(localStorage.getItem("dts_user")!=null){
			var union=localStorage.getItem("dts_user");
			union+="&DIRECCION="+direccion;
			localStorage.setItem("dts_user",union);
		}
		union+="&DIRECCION="+direccion;
		$http({
			method: 'POST',
			url:"../php/abm/registro.usuario.php",
			data: union,	
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
		})
		.success(function(mdata){
			
		})
		.error(function(){
			
		});*/
	}
});


/////CONTROLLER HOME (home usuario)
Urban.controller("homeCtrl", function ($scope,$http) { 


});
