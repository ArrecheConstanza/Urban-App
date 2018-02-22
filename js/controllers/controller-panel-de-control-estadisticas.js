/********************************************CONTROLLER PANEL DE CONTROL ENCUESTAS**************************************/

Urban.controller("panelDeControlEstadisticasCtrl", function ($scope,$http,$location,$routeParams){

	//funcion volver atras
	$scope.back = function() { 
		$location.path( "/panelDeControl");
	}
	
	//************* USUARIOS **************
	
	var newDate = new Date();
	var meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
	//var datos="id="+$scope.id_grupo;
		//$routeParams.id=localStorage.getItem("grupo_seleccionado_urban");
		$http({ 
			method:"POST",
			url:"php/abm/usuarios.estadisticas.php",
			//data: datos,	
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
		})
		.success(function(data, status){
console.log(data);
		})
		.error(function(){
			//mensaje Sin conexion 
		});
	
	/*console.log(newDate.getMonth());
	
	$scope.etiquetas = [meses[newDate.getMonth()-1], meses[newDate.getMonth()], meses[newDate.getMonth()+1]];
    $scope.series = ['1', '2','3'];
	
    $scope.datos = [
      [65, 59, 80, 81],
      [28, 48, 40, 19],
	  [123,12,123,12]
    ];
	
	/* $scope.etiquetas = ['Gastos', 'Ventas', 'Compras'];
 
    $scope.datos2 = [1244, 1500, 2053];*/
});