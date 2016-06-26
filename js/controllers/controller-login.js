/********************************************CONTROLLER LOGIN***************************************/

Urban.controller("iniciarSesionCtrl", function ($scope, $http, $location, $window) { 
	
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
					localStorage.setItem("user_urban",JSON.stringify(data));
					//redireccion a home de usuario
					$window.location.href = '/urban-app/index.html';
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
