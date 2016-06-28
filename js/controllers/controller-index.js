/********************************************CONTROLLER INDEX***************************************/

Urban.controller("indexCtrl", function ($location,$http,$scope) {

	//funcion volver atras
	$scope.$back = function() { 
		window.history.back();
	};
	
	//Si ya esta logeado el usuario lo mando a home cargo el header y el footer
	if(localStorage.getItem("user_urban")!=null){
		$http({
			method: 'GET',
			url:"vistas/header.html",
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
		})
		.success(function(data){
			////////CONTROL DEL SIDEBAR
			header=tn(document,'header',0);
			header.innerHTML=data;
			id("sidebar").style.display="none";
			id("menu-hamburger").onclick=function(e){
				id("sidebar").style.display="inline";
				e.stopPropagation();
			}
			id("sidebar").parentNode.parentNode.parentNode.onclick=function(){
				id("sidebar").style.display="none";	
			}
			id("cerrar").parentNode.onclick=function(){
				$http({
					method: 'GET',
					url:"php/abm/logout.usuario.php",
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
				})
				.success(function(data){
					if(data){
						var header=tn(document,'header',0);
						header.innerHTML="";
						var footer=tn(document,'footer',0);
						footer.innerHTML="";
						window.localStorage.removeItem("user_urban");
						$location.path("/");
					}
				});
	}	
		});
		$http({
			method: 'GET',
			url:"vistas/footer.html",
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
		})
		.success(function(data){
			footer=tn(document,'footer',0);
			footer.innerHTML=data;
			id("masMenu").style.display="none";
			id("menuMas").onclick=function(e){
				id("masMenu").style.display="inline";
				e.stopPropagation();
			}
			id("masMenu").parentNode.parentNode.parentNode.onclick=function(){
				id("masMenu").style.display="none";	
			}
		});
		$location.path( "/publicaciones" );
	}
	else if(localStorage.getItem("user_urban")==null&&localStorage.getItem("dts_user")!=null&&localStorage.getItem("direc_user")!=null){
		$location.path( "/registroUno" );
	}
	else{
		$location.path( "/" );
	}
	
});