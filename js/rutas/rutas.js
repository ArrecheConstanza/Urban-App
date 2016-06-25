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
		.when('/home', {
			templateUrl : 'vistas/home.html',
			controller : 'homeCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
});
