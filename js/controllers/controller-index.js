/**************************************** CONTROLLER INDEX ***************************************/

Urban.controller("indexCtrl", function ($location,$http,$scope,$window,$routeParams) {

	//funcion volver atras
	$scope.$back = function() { 
		window.history.back();
	};
		
	//funcion para cargar o no el header
	$scope.header_footer=function(){
		if(!$location.path().search("/reportarPublicacion/")){
			return 0;
		}
		if(!$location.path().search("/reportarUsuario/")){
			return 0;
		}
		if(!$location.path().search("/detalleEncuesta/")){
			return 0;
		}
		if(!$location.path().search("/panelDeControl/Usuarios/")){
			return 0;
		}
		if(!$location.path().search("/panelDeControl/Encuestas/")){
			return 0;
		}
		if(!$location.path().search("/panelDeControl/Publicaciones/")){
			return 0;
		}
		if(!$location.path().search("/panelDeControl/Grupos/")){
			return 0;
		}
		if(localStorage.getItem("user_urban")==null){
			return 0;
		}
		switch($location.path()){
			case "/ayuda":
			case "/perfil":
			case "/panelDeControl":
			case "/panelDeControl/Usuarios":
			case "/panelDeControl/Grupos":
			case "/panelDeControl/Publicaciones":
			case "/panelDeControl/Encuestas":
			case "/panelDeControl/Estadisticas":
			case "/newPublicacion":
			case "/newGrupo":
			case "/newEncuesta":
			case "/detallePublicacion":
			case "/detalleEncuesta":
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

	//cambiar seccion
	$scope.cambiar_seccion=function(id){
		$scope.estado = {};
		$scope.estado.activo = id;
		$scope.id_grupo=$routeParams.id;
		
		//*** ir a chat ****//
		if(this.item.id=="chat"){
			$window.location.href= "../urban-app/vistas/chat.html" ;
		}
	}
	
		
	//**** si no hay grupo 
	if(localStorage.getItem("hay_grupo")!=null&&localStorage.getItem("hay_grupo")=="no"){
		$location.path("sin_grupo");
	}
	

	//**** FILTRO ****//

		//abrir modal con filtros
		$scope.estado_filtro=false;
		$scope.mostrar_filtros = function(){
			if($scope.estado_filtro){
				return "vistas/modal-filtro.html";
			}
			return "";
		}
		$scope.modal_filtrar=function(){
			if($scope.estado_filtro){
				$scope.estado_filtro=false;
			}
			else{
				$scope.estado_filtro=true;
			}
			$scope.mostrar_filtros();
		}; 
		
		//controller modal-filtro
		
			//traer categorias
			$http({ 
				method:"POST",
				url:"php/abm/traer.categorias.php",
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			})
			.success(function(data, status){
				$scope.categorias=data;
				localStorage.setItem("categorias_urban",angular.toJson(data));
			})
			.error(function(data){
				//sin internet, cargo datos locales
				if(localStorage.getItem("categorias_urban")!="undefined"){
					$scope.categorias=localStorage.getItem("categorias_urban");
				}
			});
			
			//funcion filtrar publicaciones
			  $scope.selection = [];
			  //si las categorias ya estan filtradas mostrarlas en modal
			  $scope.cat_publi=localStorage.getItem("categoria_publicacion");

			  if($scope.cat_publi!=undefined&&$scope.cat_publi!=""){
				  for(var i=0;i<$scope.cat_publi.length;i++){
					$scope.selection.push($scope.cat_publi[i]);
				  }
			  }
			  $scope.toggleSelection = function toggleSelection(categoria) {
				var idx = $scope.selection.indexOf(categoria);
				//si se saca
				if (idx > -1) {
				   $scope.selection.splice(idx, 1);
				}
				//si se agrega
				else {
				  $scope.selection.push(categoria);
				} 
				var final_selection=[];
				for(var i=0;i<$scope.selection.length;i++){
					console.log($scope.selection[i]);
					if($scope.selection[i]!=","){
						final_selection.push($scope.selection[i]);
					}
				}
				$scope.selection=final_selection;
			  };
			//accion filtrar
			$scope.filtrar_publicaciones=function(){
				localStorage.setItem("categoria_publicacion",$scope.selection);
				location.reload();
			}
			
			//accion limpiar filtro
			$scope.limpiar_filtro=function(){
				localStorage.removeItem("categoria_publicacion");
				location.reload();
			}
			
	
	//*************************
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
		
	}
	
	//Si ya esta logeado el usuario
	if(localStorage.getItem("user_urban")!=null){
		
		//********************** UNIRSE A GRUPO **********************//
		//********************** UNIRSE A CHAT **********************//
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
				if(data=="1 "){
					if(localStorage.getItem("hay_grupo")!=null&&localStorage.getItem("hay_grupo")=="no"){
						localStorage.removeItem("hay_grupo");
					}
					localStorage.removeItem("unir_a_grupo_id");
					localStorage.setItem("grupo_seleccionado_urban",id);
					
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
					}
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
		if($location.path()==""){ //usuario recien logueado enviado a listado de publicaciones (REVER)
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