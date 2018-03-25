/********************************************CONTROLLER PUBLICACION EDITAR**************************************/

Urban.controller("reportarPublicacionCtrl",  ['$window','$scope', '$http', '$location', 'Upload', '$timeout', '$routeParams', function  ($window, $scope, $http, $location, Upload, $timeout, $routeParams) { 
		var id_publi=$routeParams.id;
	//************* REPORTAR *************//
	$scope.reportar_publicacion=function(reporte){
		var union="FKPUBLICACION="+id_publi+"&DESCRIPCION="+reporte.DESCRIPCION;
		
		//FALTA validacion de datos 
		$http({
			method: 'POST',
			url:"php/abm/publicacion.reportar.php",
			data: union,	
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
		})
		.success(function(data){
			console.log(data);
			if(data=="1"){ //exito creando denuncia
						
				//contar cantidad de denuncias
				var union2="FKPUBLICACION="+id_publi;
					$http({
						method: 'POST',
						url:"php/abm/publicacion.reportar.contar.php",
						data: union2,	
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
					})
					.success(function(data2){
						if(data2=="1"){ //eliminar publicacion
							var union3="ID="+id_publi;
							console.log(union3);
							$http({
								method: 'POST',
								url:"php/abm/publicacion.eliminar.php",
								data: union3,	
								headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
							})
							.success(function(data3){ 
								console.log(data3);
								if(data3=="1"){ //publicacion eliminada
									//modal denuncia con exito.
									$window.location.hash="#/publicaciones/"+localStorage.getItem("grupo_seleccionado_urban")+"";
								}
							})
							.error(function(){
								//mensaje Sin conexion 
							});
						}
					})
					.error(function(){
						//mensaje Sin conexion 
					});
				
				//modal denuncia con exito.
				window.location.href = localStorage.getItem("urban_url");
			}
			else if(data=="3"){
						console.log("ya denunciaste");						
				//modal denuncia ya realizada
				window.location.href = localStorage.getItem("urban_url");
			}
			else{
						console.log("error");						
				//modal no se pudo denunciar.
				window.location.href = localStorage.getItem("urban_url");
			}
		})
		.error(function(){
			//mensaje Sin conexion 
		});
	}
}]);