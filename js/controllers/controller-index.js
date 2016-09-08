/********************************************CONTROLLER INDEX (header y footer)***************************************/

Urban.controller("indexCtrl", function ($location,$http,$scope,$window) {

	//funcion volver atras
	$scope.$back = function() { 
		window.history.back();
	};
	
	//Si ya esta logeado el usuario lo mando a home cargo el header y el footer
	if(localStorage.getItem("user_urban")!=null){
		// ------------------ HEADER
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
			id("menu-hamburger").onclick=function(e){ //abrir sidebar
				id("sidebar").style.display="inline";
				e.stopPropagation();
			}
			id("sidebar").parentNode.parentNode.parentNode.onclick=function(){ //cerrar sidebar
				if(id("sidebar")!=null){
					id("sidebar").style.display="none";	
				}
			}
			id("cerrar").parentNode.onclick=function(){ //cerrar sesion
				$http({
					method: 'GET',
					url:"php/abm/logout.usuario.php",
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
				})
				.success(function(data){
					if(data){
						rc(tn(document,'header',0).parentNode,tn(document,'header',0));
						rc(tn(document,'footer',0).parentNode,tn(document,'footer',0));
						window.localStorage.removeItem("user_urban");
						$location.path("/");
					}
				});
			}
			if(id("boton-mapa")!=null){ //redireccion a mapa
				id("boton-mapa").onclick=function(){
					$window.location.href = '/urban-app/vistas/mapa.html';
				}
			}			
		});
		// ------------------ FOOTER
		$http({
			method: 'GET',
			url:"vistas/footer.html",
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
		})
		.success(function(data){
			footer=tn(document,'footer',0);
				footer.innerHTML=data;
				if(id("masMenu")!=null){  //cerrar menu mas
					id("masMenu").style.display="none";
				}
				id("menuMas").onclick=function(e){ //abrir menu mas
					id("masMenu").style.display="inline";
					id("masMenu").style.zIndex="3";
					var div=ce("div");
					div.id="fondo";
					div.style.background="rgba(107, 103, 103, 0.4)";
					div.style.width="100vw";
					div.style.padding="0";
					div.style.margin="0";
					div.style.height="100vh";
					div.style.position="fixed";
					div.style.zIndex="2";
					id("publicaciones").insertBefore(div,tn(id("publicaciones"),"ul",0));
					e.stopPropagation();
				}
				id("masMenu").parentNode.parentNode.parentNode.onclick=function(){ //cerrar menu mas
					if(id("masMenu")!=null){
						id("masMenu").style.display="none";
						if(id("fondo")!=undefined){
							rc(id("fondo").parentNode,id("fondo"));
						}
					}					
				}
		});
		
		if($location.path()==""){ //usuario recien logueado enviado a listado de publicaciones
			$location.path( "/publicaciones" );
		}
		else{ //hay path, usuario enviado a esa locacion
			var path=$location.path();
			$location.path( path );
		}
		
	}
	else if(localStorage.getItem("user_urban")==null&&localStorage.getItem("dts_user")!=null&&localStorage.getItem("direc_user")!=null){
		$location.path( "/registroUno" );
	}
	else{
		$location.path( "/" );
	}
	
});