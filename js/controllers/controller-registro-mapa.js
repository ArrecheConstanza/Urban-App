/********************************************CONTROLLER REGISTRO DOS***************************************/

//El control del mapa se realiza desde vistas/registro-mapa.html

Urban.controller("registroDosCtrl", function ($scope,$http,$window) { 
	tn(id("title-container"),'a',0).onclick=function(){
		$window.location.href = '/urban-app/index.html#/registroUno';
	}
	id("registroMapa-continue-btn").onclick=function(){
		var direccion=tn(tn(document,'form',0),'input',0).value;
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
			
		});
	}
});
