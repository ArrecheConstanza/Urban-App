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
		.when('/publicaciones', {
			templateUrl : 'vistas/publicaciones-listado.html'
		})
		.when('/newPublicacion', {
			templateUrl : 'vistas/publicacion.html',
			controller : 'newPublicacionCtrl'
		})
		.when('/alarmas', {
			templateUrl : 'vistas/alarmas.html',
			controller : ''
		})
		.otherwise({
			redirectTo: '/publicaciones'
		});
});
