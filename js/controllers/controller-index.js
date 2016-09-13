/********************************************CONTROLLER INDEX ***************************************/

Urban.controller("indexCtrl", function ($location,$http,$scope,$window) {

	//funcion volver atras
	$scope.$back = function() { 
		window.history.back();
	};
	
	//funcion para cargar o no el header
	$scope.header_footer=function(){
		if(localStorage.getItem("user_urban")==null){
			return 0;
		}
		switch($location.path()){
			case "/newPublicacion":
				return 0;
			break;
			case "/newGrupo":
				return 0;
			break;
		}
		return 1;
	}
	
	//Si ya esta logeado el usuario lo mando a home cargo el header y el footer
	if(localStorage.getItem("user_urban")!=null){
		
		//UNIRSE A GRUPO
		if(localStorage.getItem("unir_a_grupo_id")!=null){
			var id=angular.fromJson(localStorage.getItem("unir_a_grupo_id"));
			var datos="id_grupo="+id;
			$http({ 
				method:"POST",
				url:"/urban-app/php/abm/usuario.grupos.unir.php",
				data: datos,	
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			})
			.success(function(data, status){
				if(data=="1"){
					localStorage.removeItem("unir_a_grupo_id");
					localStorage.setItem("grupo_seleccionado_urban",id);
					$location.path("/publicaciones");
				}
				else{
					//modal("error");
				}
			})
			.error(function(data){
				//modal("error");
			});
		}
		
		
		if($location.path()==""){ //usuario recien logueado enviado a listado de publicaciones (REVER, si no tiene grupo enviarlo a mapa para union o creacion de grupo)
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