/******************************************MODULOS*********************************************/

var Urban = angular.module('Urban', [
  'ngRoute',
  'mobile-angular-ui',
  'mobile-angular-ui.gestures',
  'ngFileUpload',
  'uiGmapgoogle-maps'
])

/////ADAPTACION DE PANTALLA

Urban.run(function($transform) {
  window.$transform = $transform;
});
