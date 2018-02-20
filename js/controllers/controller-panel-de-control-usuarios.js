/********************************************CONTROLLER PANEL DE CONTROL USUARIOS**************************************/

Urban.controller("panelDeControlUsuariosCtrl", function ($scope,$http,$location,$routeParams){

	//funcion volver atras
	$scope.back = function() { 
		$location.path( "/panelDeControl");
	}
	
	$scope.back_usuarios = function() { 
		$location.path( "/panelDeControl/Usuarios");
	}
	
		//**** un usuario ****//
		if($routeParams["id"]!=undefined){
			var datos="id="+$routeParams["id"];
			$http({ 
				method:"POST",
				url:"php/abm/un.usuario.php",
				data : datos,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			})
			.success(function(data, status){
				//corregir para host 
				console.log(data);
				for(var i=0;i<data.length;i++){
					if(data[i]["FOTO"]!=null){
						data[i]["FOTO"]=data[i]["FOTO"]["PATH"].replace("C:/xampp/htdocs/Urban-App/","");
					}
					else{
						data[i]["FOTO"]="img/icons/png/usuario.png";
					}
				}
				//$scope.datosSQLusuario=angular.fromJson(data);
				
			})
			.error(function(data){
				//sin internet, cargo datos locales
				
			});
		}
		
		
		//**** Listado de usuarios ****//
		else{
			$scope.listado_usuarios=[];

			$http({ 
				method:"POST",
				url:"php/abm/traer.usuarios.php",
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			})
			.success(function(data, status){
				//corregir para host 
				for(var i=0;i<data.length;i++){
					if(data[i]["FOTO"]!=null){
						data[i]["FOTO"]=data[i]["FOTO"]["PATH"].replace("C:/xampp/htdocs/Urban-App/","");
					}
					else{
						data[i]["FOTO"]="img/icons/png/usuario.png";
					}
				}
				$scope.datosSQLusuarios=angular.fromJson(data);
				
			})
			.error(function(data){
				//sin internet, cargo datos locales
				
			});
		}	
});