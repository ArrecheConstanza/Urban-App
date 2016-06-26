/********************************************CONTROLLER SIDEBAR***************************************/

Urban.controller("sidebarCtrl", function ($http,$location){ 
	//cerrar sesion
	id("cerrar").parentNode.onclick=function(){
		$http({
			method: 'GET',
			url:"php/abm/logout.usuario.php",
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
		})
		.success(function(data){
			if(data){
				$location.path( "../../index.html" );
			}
		});
	}	
});

