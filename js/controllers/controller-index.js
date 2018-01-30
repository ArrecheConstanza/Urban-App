/**************************************** CONTROLLER INDEX ***************************************/

Urban.controller("indexCtrl", function ($location,$http,$scope,$window,$routeParams) {

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
			case "/newGrupo":
			case "/detallePublicacion":
			case "/perfil":
			case "/ajustes":
			case "/editarDatosUsuario":
				return 0;
			break;
			default:
				if($location.path().substr(0,14)=="/publicaciones"){
					$scope.estado.activo = 'publicaciones';
				}
				else if($location.path().substr(0,18)=="/editarPublicacion"){
					return 0;
				}
			break;
		}
		return 1;
	}
	
	//************** HEADER CONTROL *************//
		
	//activar li de navbar
	$scope.estado = {};
	
	$scope.items_navbar = [{
        titulo: 'Publicaciones',
		id: 'publicaciones',
    }, {
        titulo: 'Chat',
        id: 'chat',
    }, {
        titulo: 'Encuestas',
        id: 'encuestas',
    }];
	
	$scope.id_grupo=$routeParams.id;

	$scope.cambiar_seccion=function(id){
		$scope.estado = {};
		$scope.estado.activo = id;
		$scope.id_grupo=$routeParams.id;
		
		if(this.item.id=="chat"){
			console.log($window.location);
			$window.location.href= "../urban-app/vistas/chat.html" ;
		}
		/* tn(document.getElementById("nav-bar"),"a",1).onclick=function(){
			if(localStorage.getItem("nombre_chat")!=undefined){
				/* var grupo={
					ID:id,
					NOMBRE:nombre
				}
				localStorage.setItem("nombre_chat",angular.toJson(grupo)); *
				$window.location.href= "../urban-app/vistas/chat.html" ;
			}
			this.click();
		} */
	}

	//nombre de grupo en footer
	if(localStorage.getItem("grupo_seleccionado_urban")!=null){
		$scope.id_grupo=localStorage.getItem("grupo_seleccionado_urban");
		var datos="id="+$scope.id_grupo;
		$routeParams.id=localStorage.getItem("grupo_seleccionado_urban");
		$http({ 
			method:"POST",
			url:"php/abm/un.grupo.php",
			data: datos,	
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
		})
		.success(function(data, status){
			$scope.nombre_footer=data[0].NOMBRE;
			$scope.id_grupo=$routeParams.id;

		})
		.error(function(){
			//mensaje Sin conexion 
		});
		
		if(localStorage.getItem("grupo_seleccionado_urban")!=null){
		var id=localStorage.getItem("grupo_seleccionado_urban");
		var datos="id="+id;
		}
		else{
			//modal de error, no hay grupo, redireccion a mapa para union a grupo o creacion de grupo
		}
	}
	
	
	//Si ya esta logeado el usuario
	if(localStorage.getItem("user_urban")!=null){
		
		//********************** UNIRSE A GRUPO **********************//
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
					$routeParams.id=id;
					$location.path("/publicaciones/"+id);
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
			$location.path( "/publicaciones/"+localStorage.getItem("grupo_seleccionado_urban") );
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