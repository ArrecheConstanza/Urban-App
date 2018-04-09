/********************************************CONTROLLER REGISTRO UNO***************************************/

Urban.controller("registroUnoCtrl", function ($scope, $window, $http, $location) { 

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
			APELLIDO : usuario.APELLIDO,
			EDAD : usuario.EDAD
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
			localStorage.setItem("dts_user",JSON.stringify(datos));
			//redireccion a vistas/registro-mapa, guardado de datos en LocalStorage de variable union
			$window.location.href = '/urban-app/vistas/registro-mapa.html';
		}
	
	}
	
	//Guardado de datos en bdd para creacion de usuario
	if(window.localStorage.getItem("direc_user")!=null&&window.localStorage.getItem("dts_user")!=null){
		var dts_user=JSON.parse(window.localStorage.getItem("dts_user"));
		var direc_user=JSON.parse(window.localStorage.getItem("direc_user"));
		var item = [];
		for(var i in dts_user){
			item.push( i+'='+dts_user[i] ); 
		}
		for(var i in direc_user){
			item.push( i+'='+direc_user[i] ); 
		}
		var union = item.join('&');	
		//ABM: registro
		$http({
			method: 'POST',
			url:"php/abm/registro.usuario.php",
			data: union,	
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
		})
		.success(function(data){
			if(!isNaN(data.ID)){
				//redireccion a mapa para union de grupo
				window.localStorage.removeItem("dts_user");
				window.localStorage.removeItem("direc_user");
				localStorage.setItem("user_urban",JSON.stringify(data));
				$window.location.href= "../urban-app/vistas/mapa.html" ;
			}
			else if(data===''){
				var p=ce('p');
				p.className='mensaje-validacion';
				p.innerHTML='Usuario ya existente';
				var datos_login=tn(tn(document,'form',0),'input');
				datos_login[0].parentNode.insertBefore(p,datos_login[0]);
			}
		})
		.error(function(){
			//mensaje Sin conexion 
		});
	}
});


