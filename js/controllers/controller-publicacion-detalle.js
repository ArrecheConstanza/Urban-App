/********************************************CONTROLLER PUBLICACIONES DETALLE**************************************/

Urban.controller("publicacionDetalleCtrl", function ($scope,$http,$location){
	header.style.display="none";
	footer.style.display="none";
	//funcion volver atras
	$scope.$back = function() { 
		header.style.display="inline";
		footer.style.display="inline";
		window.history.back();
	};
	
	//pido datos de bdd
	if(localStorage.getItem("id_publi")!=null){
		var union="ID="+localStorage.getItem("id_publi");
		$http({
				method: 'POST',
				url:"php/abm/publicacion.detalle.php",
				data: union,	
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			})
			.success(function(data){
				var rta=angular.fromJson(data[0]);
				$scope.ID=data[0].ID;
				$scope.TITULO=data[0].TITULO;
				$scope.DESCRIPCION=data[0].DESCRIPCION;
				$scope.FECHA_CREACION=data[0].FECHA_CREACION;
				
				$scope.editar=function(){
					localStorage.setItem("publi_edit",angular.toJson(data[0]));
					$location.path("/editPublicacion");
				}
				
				
				
				
			})
			.error(function(){
				//mensaje Sin conexion 
			});
	}

});