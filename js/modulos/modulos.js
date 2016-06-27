/******************************************MODULOS***********************************************/

var Urban = angular.module('Urban', [
  'ngRoute',
  'mobile-angular-ui',
  'mobile-angular-ui.gestures',
  //'google-maps'
  'uiGmapgoogle-maps',
 'ngFileUpload'
]);


/////ADAPTACION DE PANTALLA

Urban.run(function($transform) {
  window.$transform = $transform;
});
