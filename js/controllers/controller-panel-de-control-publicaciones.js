/********************************************CONTROLLER PANEL DE CONTROL PUBICACIONES **************************************/

Urban.controller("panelDeControlPublicacionesCtrl", function ($scope,$http,$location,$routeParams){

	//funcion volver atras
	 $scope.back = function() { 
		$location.path( "/panelDeControl");
	}
	 
	var estado_borrado;
	
	//**** crear publicacion como admin ****//
	
	$scope.admin_crea_publi=function(){
		localStorage.setItem("admin","on");
	}
	
	
	$scope.back_publicaciones = function() { 
		var data=[];
		if(estado_borrado!="undefined"){
			if(estado_borrado!=$scope.borrado){
				if($scope.borrado){
					$scope.borrado="No";
				}
				else{
					$scope.borrado="Si";
				}
				data.push("BORRADO="+$scope.borrado);
			}
		}
		
		if(data.length){
			data.push("ID="+$routeParams["id"]);
			var datos=data.join('&');
			$http({ 
				method:"POST",
				url:"php/abm/publicacion.editar.admin.php",
				data : datos,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			})
			.success(function(data, status){
				if(!data){
					//modal error al editar, reload?
				}
			})
			.error(function(data){
				//sin internet, cargo datos locales
			});
		}
			
		$location.path( "/panelDeControl/Publicaciones");
	}
	
		//**** una Publicacion ****//
		if($routeParams["id"]!=undefined){
			var datos="ID="+$routeParams["id"];
			$http({ 
				method:"POST",
				url:"php/abm/publicacion.detalle.php",
				data : datos,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			})
			.success(function(data, status){
				
					//foto
					if(data[0].FOTO.length){
						data[0].FOTO=data[0].FOTO[0].DIR.replace("C:/xampp/htdocs/Urban-App/","");
						$scope.estado_foto=true;
						$scope.imagen= data[0]["FOTO"];
					}
					else{
						$scope.estado_foto=false;
						data[0].FOTO="";
					}
					delete data[0]["FOTO"];
				
				
				//cargo datos en vista
				$scope.datosSQLpublicacion=angular.fromJson(data[0]);
				
				
				$scope.buttonPositionBorrado=function(){
					if($scope.borrado){
						$scope.borrado=false;
					}
					else{
						$scope.borrado=true;
					}
				} 
				
				
				//**** estado de switch ****//
				if(data[0]["BORRADO"]=="No"){
					$scope.borrado=true;
				}
				
				estado_borrado=$scope.borrado;
			})
			.error(function(data){
				//sin internet, cargo datos locales
				
			});
		}
		
		
		//**** Listado de publicaciones ****//
		else{
			$http({ 
				method:"POST",
				url:"php/abm/traer.publicaciones.php",
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			})
			.success(function(data, status){
				for(var i=0;i<data.length;i++){
					if(data[i].FOTO.length){
						data[i].FOTO=data[i].FOTO[0].DIR.replace("C:/xampp/htdocs/Urban-App/","");
					}
					else{
						data[i].FOTO="img/icons/png/newPublicacion.png";
					}

				}
				$scope.datosSQLencuestas=angular.fromJson(data); 
				
			})
			.error(function(data){
				//sin internet, cargo datos locales
				
			});
		}	
});