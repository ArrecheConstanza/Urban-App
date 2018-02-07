/******************************************MODULOS*********************************************/

var Urban = angular.module('Urban', [
  'ngRoute', //rutas
  'mobile-angular-ui', //angular
  'mobile-angular-ui.gestures', //gestos (ej: arrastrar el dedo)
  'ngFileUpload', //upload imagenes
  'uiGmapgoogle-maps' //mapa
])

/////ADAPTACION DE PANTALLA

Urban.run(function($transform) {
  window.$transform = $transform;
});

