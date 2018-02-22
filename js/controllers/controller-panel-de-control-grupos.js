/********************************************CONTROLLER PANEL DE CONTROL USUARIOS**************************************/

Urban.controller("panelDeControlGruposCtrl", function ($scope,$http,$location,$routeParams){

	//funcion volver atras
	$scope.back = function() { 
		$location.path( "/panelDeControl");
	}
	
	var estado_banneado, estado_borrado;
	
	$scope.back_usuarios = function() { 
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
		if(estado_banneado!="undefined"){
			if(estado_banneado!=$scope.banneado){
				if($scope.banneado){
					$scope.banneado="No";
				}
				else{
					$scope.banneado="Si";
				}
				data.push("BANNEADO="+$scope.banneado);
			}
		}
		
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
				//corregir para host
				if(!data){
					//modal error al editar, reload?
				}
			})
			.error(function(data){
				//sin internet, cargo datos locales
				
			});
		}
		//console.log(data);
			
		//$location.path( "/panelDeControl/Grupos");
	}
	
		//**** un grupo ****//
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
				if(data["FOTO"]!=null){
					data["FOTO"]=data["FOTO"]["PATH"].replace("C:/xampp/htdocs/Urban-App/","");
				}
				else{
					data["FOTO"]="img/icons/png/usuario.png";
				}

				$scope.imagen= data["FOTO"];
				delete data["FKMULTIMEDIA"];
				delete data["FOTO"];
				delete data["CLAVE"];
				$scope.datosSQLusuario=angular.fromJson(data);
				
				
				$scope.buttonPositionBanneado=function(){
					if($scope.banneado){
						$scope.banneado=false;
					}
					else{
						$scope.banneado=true;
					}
					//console.log($scope.banneado);
				}
				$scope.buttonPositionBorrado=function(){
					if($scope.borrado){
						$scope.borrado=false;
					}
					else{
						$scope.borrado=true;
					}
					//console.log($scope.borrado);
				}
				$scope.buttonPositionNivel=function(){
					if($scope.nivel){
						$scope.nivel=false;
					}
					else{
						$scope.nivel=true;
					}
					//console.log($scope.nivel);
				}
				
				//**** estado de switch ****//
				if(data["BORRADO"]=="No"){
					$scope.borrado=true;
				}
				if(data["BANNEADO"]=="No"){
					$scope.banneado=true;
				}
				if(data["NIVEL"]=="Admin"){
					$scope.nivel=true;
				}
				
				estado_banneado=$scope.banneado;
				estado_borrado=$scope.borrado;
				estado_nivel=$scope.nivel;
			})
			.error(function(data){
				//sin internet, cargo datos locales
				
			});
		}
		
		
		//**** Listado de grupos ****//
		else{

			$http({ 
				method:"POST",
				url:"php/abm/traer.grupos.php",
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