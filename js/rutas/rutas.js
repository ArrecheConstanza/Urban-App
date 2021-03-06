/////RUTEO

Urban.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl : 'vistas/iniciar-sesion.html',
			controller : 'iniciarSesionCtrl'
		})
		.when('/registroUno', {
			templateUrl : 'vistas/registro-datos.html',
			controller : 'registroUnoCtrl'
		})
		.when('/ajustes', {
			templateUrl : 'vistas/ajustes.html',
			controller : 'ajustesCtrl'
		})
		.when('/perfil', {
			templateUrl : 'vistas/perfil.html',
			controller : 'perfilCtrl'
		})
		.when('/sin_grupo', {
			templateUrl : 'vistas/sin_grupo.html',
			controller : 'sinGrupoCtrl'
		})
		.when('/recuperar-clave', {
			templateUrl : 'vistas/recuperar-clave.html',
			controller : 'recuperarClaveCtrl'
		})
		.when('/ayuda', {
			templateUrl : 'vistas/ayuda.html',
			controller : 'AyudaCtrl'
		})
		.when('/editarDatosUsuario', {
			templateUrl : 'vistas/editar-datos-usuario.html',
			controller : 'editarDatosUsuarioCtrl'
		})
		.when('/newGrupo', {
			templateUrl : 'vistas/nuevo-grupo.html',
			controller : 'newGrupoCtrl'
		})
		.when('/terminosCondiciones', {
			templateUrl : 'vistas/terminos-condiciones.html',
			//controller : 'newGrupoCtrl'
		})
		/* .when('/newChat', {
			templateUrl : 'vistas/nuevo-chat.html',
			controller : 'chatsListadoCtrl'
		}) */
		.when('/publicaciones/:id', {
			templateUrl : 'vistas/publicaciones-listado.html',
			controller : 'publicacionesListadoCtrl'
		})
		/* when('/chat', {
			templateUrl : 'vistas/chat.html',
			controller : 'chat'
		})  */
		/*.when('/unchat', {
			templateUrl : 'vistas/chat.html',
			controller : 'chat'
		})*/
		.when('/encuestas/:id', {
			templateUrl : 'vistas/encuestas-listado.html',
			controller : 'encuestasListadoCtrl'
		})
		.when('/newEncuesta', {
			templateUrl : 'vistas/encuestas.html',
			controller : 'newEncuestaCtrl'
		})
		.when('/detalleEncuesta/:id', {
			templateUrl : 'vistas/encuesta-detalle.html',
			controller : 'encuestaDetalleCtrl'
		})
		.when('/detallePublicacion', {
			templateUrl : 'vistas/publicacion-detalle.html',
			controller : 'publicacionDetalleCtrl'
		})
		.when('/newPublicacion', {
			templateUrl : 'vistas/publicacion.html',
			controller : 'newPublicacionCtrl'
		})
		.when('/editarPublicacion/:id', {
			templateUrl : 'vistas/publicacion-editar.html',
			controller : 'editarPublicacionCtrl'
		})
		.when('/reportarPublicacion/:id', {
			templateUrl : 'vistas/publicacion-reportar.html',
			controller : 'reportarPublicacionCtrl'
		})
		.when('/reportarUsuario/:id', {
			templateUrl : 'vistas/usuario-reportar.html',
			controller : 'modalUsuarioCtrl'
		})
		.when('/alarmas', {
			templateUrl : 'vistas/alarmas.html',
			controller : ''
		})
		.when('/modal', {
			templateUrl : 'vistas/overlay.html',
			controller : ''
		})
		.when('/panelDeControl', {
			templateUrl : 'vistas/panel-de-control.html',
			controller : 'panelDeControlCtrl'
		}) 
		.when('/panelDeControl/Estadisticas', {
			templateUrl : 'vistas/panel-de-control-estadisticas.html',
			controller : 'panelDeControlEstadisticasCtrl'
		}) 
		.when('/panelDeControl/Usuarios', {
			templateUrl : 'vistas/panel-de-control-usuarios.html',
			controller : 'panelDeControlUsuariosCtrl'
		}) 
		.when('/panelDeControl/Usuarios/:id', {
			templateUrl : 'vistas/panel-de-control-usuarios-detalle.html',
			controller : 'panelDeControlUsuariosCtrl'
		}) 
		.when('/panelDeControl/Grupos', {
			templateUrl : 'vistas/panel-de-control-grupos.html',
			controller : 'panelDeControlGruposCtrl'
		}) 
		.when('/panelDeControl/Grupos/:id', {
			templateUrl : 'vistas/panel-de-control-grupos-detalle.html',
			controller : 'panelDeControlGruposCtrl'
		}) 
		.when('/panelDeControl/Encuestas', {
			templateUrl : 'vistas/panel-de-control-encuestas.html',
			controller : 'panelDeControlEncuestasCtrl'
		}) 
		.when('/panelDeControl/Encuestas/:id', {
			templateUrl : 'vistas/panel-de-control-encuestas-detalle.html',
			controller : 'panelDeControlEncuestasCtrl'
		}) 
		.when('/panelDeControl/Publicaciones', {
			templateUrl : 'vistas/panel-de-control-publicaciones.html',
			controller : 'panelDeControlPublicacionesCtrl'
		}) 
		.when('/panelDeControl/Publicaciones/:id', {
			templateUrl : 'vistas/panel-de-control-publicaciones-detalle.html',
			controller : 'panelDeControlPublicacionesCtrl'
		}) 
		.otherwise({
			redirectTo: '/'
		});
});
