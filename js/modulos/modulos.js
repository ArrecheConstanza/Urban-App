/******************************************MODULOS*********************************************/

var Urban = angular.module('Urban', [
  'ngRoute', //rutas
  'mobile-angular-ui', //angular
  'mobile-angular-ui.gestures', //gestos 
  'ngFileUpload', //upload imagenes
  'uiGmapgoogle-maps', //mapa
   'chart.js' // para estadisticas
])

/////ADAPTACION DE PANTALLA

Urban.run(function($transform) {
  window.$transform = $transform;
});

