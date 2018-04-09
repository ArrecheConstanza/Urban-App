/********************************************CONTROLLER PANEL DE CONTROL Grupos **************************************/

Urban.controller("panelDeControlGruposCtrl", function ($scope,$http,$location,$routeParams){

	//funcion volver atras
	$scope.back = function() { 
		$location.path( "/panelDeControl");
	}
	
	var estado_banneado, estado_borrado;
	
	$scope.back_grupos = function() { 
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
		/*if(estado_banneado!="undefined"){
			if(estado_banneado!=$scope.banneado){
				if($scope.banneado){
					$scope.banneado="No";
				}
				else{
					$scope.banneado="Si";
				}
				data.push("BANNEADO="+$scope.banneado);
			}
		}*/
		
		if(data.length){
			data.push("ID="+$routeParams["id"]);
			var datos=data.join('&');
			$http({ 
				method:"POST",
				url:"php/abm/grupo.editar.admin.php",
				data : datos,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			})
			.success(function(data, status){
				console.log(data);
				if(!data){
					//modal error al editar, reload?
				}
			})
			.error(function(data){
				//sin internet, cargo datos locales
				
			});
		}
			
		$location.path( "/panelDeControl/Grupos");
	}
	
		//**** un grupo ****//
		if($routeParams["id"]!=undefined){
			var datos="id="+$routeParams["id"];
			$http({ 
				method:"POST",
				url:"php/abm/un.grupo.php",
				data : datos,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			})
			.success(function(data, status){
				console.log(data);
				//corregir para host
				if(data[0]["FOTO"]!=null){
					data[0]["FOTO"]=data[0]["FOTO"]["PATH"].replace("C:/xampp/htdocs/Urban-App/","");
						$scope.estado_foto=true;
						$scope.imagen=data[0]["FOTO"];
				}
				else{
					//data[0]["FOTO"]="img/icons/png/grupo.png";
						$scope.estado_foto=false;
				}
				//$scope.imagen= data[0]["FOTO"];
				delete data[0]["FKMULTIMEDIA"];
				delete data[0]["FOTO"];
				$scope.datosSQLgrupo=angular.fromJson(data[0]);
				
				
				/*$scope.buttonPositionBanneado=function(){
					if($scope.banneado){
						$scope.banneado=false;
					}
					else{
						$scope.banneado=true;
					}
				}*/
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
		
		
		//**** Listado de grupos ****//
		else{

			$http({ 
				method:"POST",
				url:"php/abm/traer.grupos.todos.php",
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			})
			.success(function(data, status){
				//corregir para host 
				for(var i=0;i<data.length;i++){
					if(data[i]["FOTO"]!=null){
						data[i]["FOTO"]=data[i]["FOTO"]["PATH"].replace("C:/xampp/htdocs/Urban-App/","");
					}
					else{
						data[i]["FOTO"]="img/icons/png/grupo.png";
					}
					data[i]["ESTADO"].toLowerCase();
				}
				$scope.datosSQLgrupos=angular.fromJson(data);
				
			})
			.error(function(data){
				//sin internet, cargo datos locales
				
			});
		}	
});