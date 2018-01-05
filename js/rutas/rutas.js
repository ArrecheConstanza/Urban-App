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
		.when('/newGrupo', {
			templateUrl : 'vistas/nuevo-grupo.html',
			controller : 'newGrupoCtrl'
		})
		.when('/newChat', {
			templateUrl : 'vistas/nuevo-chat.html',
			controller : 'chatsListadoCtrl'
		})
		.when('/publicaciones/:id', {
			templateUrl : 'vistas/publicaciones-listado.html',
			controller : 'publicacionesListadoCtrl'
		})
		.when('/chats/:id', {
			templateUrl : 'vistas/chats-listado.html',
			controller : 'chatsListadoCtrl'
		})
		/*.when('/unchat', {
			templateUrl : 'vistas/chat.html',
			controller : 'chat'
		})*/
		.when('/encuestas/:id', {
			templateUrl : 'vistas/encuestas-listado.html',
			//controller : 'encuestasListadoCtrl'
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
		.when('/alarmas', {
			templateUrl : 'vistas/alarmas.html',
			controller : ''
		})
		.when('/modal', {
			templateUrl : 'vistas/overlay.html',
			controller : ''
		})
		.otherwise({
			redirectTo: '/publicaciones'
		});
});
