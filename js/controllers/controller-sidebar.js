/********************************************CONTROLLER SIDEBAR***************************************/

Urban.controller("sidebarCtrl", function ($http,$location){ 
	
	//cerrar sesion
	id("cerrar").parentNode.onclick=function(){
		alert("entre");
		/*$http({
			method: 'GET',
			url:"php/abm/logout.usuario.php",
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
		})
		.success(function(data){
			if(data){
				window.localStorage.removeItem("user_urban");
				//$location.path( "../../" );
			}
		});*/
	}	
});

