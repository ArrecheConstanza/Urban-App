/********************************************CONTROLLER PANEL DE CONTROL USUARIOS**************************************/

Urban.controller("panelDeControlUsuariosCtrl", function ($scope,$http,$location,$routeParams){

	//funcion volver atras
	$scope.back = function() { 
		$location.path( "/panelDeControl");
	}
	
	var estado_banneado, estado_borrado, estado_nivel;
	
	if(localStorage.getItem("admin_crea_ok")!=null){
		//modal admin creo usuario ok
		localStorage.removeItem("admin_crea_ok");
	}
	
	//**** crear usuario como admin ****//
	
	$scope.admin_crea_usuario=function(){
		localStorage.setItem("admin","on");
	}
	
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
		if(estado_nivel!="undefined"){
			if(estado_nivel!=$scope.nivel){
				if($scope.nivel){
					$scope.nivel="Admin";
				}
				else{
					$scope.nivel="Usuario";
				}
				data.push("NIVEL="+$scope.nivel);
			}
			
		}
		//console.log(data);
		if(data.length){
			data.push("ID="+$routeParams["id"]);
			var datos=data.join('&');
			$http({ 
				method:"POST",
				url:"php/abm/usuario.editar.admin.php",
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
				if(data["FOTO"]!=null){
					data["FOTO"]=data["FOTO"]["PATH"].replace("C:/xampp/htdocs/Urban-App/","");
					$scope.estado_foto=true;
					$scope.imagen= data["FOTO"];
				}
				else{
					$scope.imagen= data["FOTO"];
					data["FOTO"]="img/icons/png/usuario.png";
					$scope.estado_foto=false;
				}

				delete data["FKMULTIMEDIA"];
				delete data["FOTO"];
				delete data["CLAVE"];
				$scope.datosSQLusuario=angular.fromJson(data);
				//console.log(data);
				
				$scope.buttonPositionBanneado=function(){
					if($scope.banneado){
						$scope.banneado=false;
					}
					else{
						$scope.banneado=true;
					}
				}
				$scope.buttonPositionBorrado=function(){
					if($scope.borrado){
						$scope.borrado=false;
					}
					else{
						$scope.borrado=true;
					}
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
		
		
		//**** Listado de usuarios ****//
		else{
			$scope.listado_usuarios=[];

			$http({ 
				method:"POST",
				url:"php/abm/traer.usuarios.php",
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			})
			.success(function(data, status){
				//$scope.lista=angular.toJson(data);
				$scope.friends=angular.toJson([{name:'John', phone:'555-1276'},
									 {name:'Mary', phone:'800-BIG-MARY'},
									 {name:'Mike', phone:'555-4321'},
									 {name:'Adam', phone:'555-5678'},
									 {name:'Julie', phone:'555-8765'},
									 {name:'Juliette', phone:'555-5678'}]);
				
				
				for(var i=0;i<data.length;i++){
					if(data[i]["FOTO"]!=null){
						data[i]["FOTO"]=data[i]["FOTO"]["PATH"].replace("C:/xampp/htdocs/Urban-App/","");
					}
					else{
						data[i]["FOTO"]="img/icons/png/usuario.png";
					}
				}
				$scope.datosSQLusuarios=angular.fromJson(data);
				//$scope.datosSQLusuariosArray=angular.toJson(data);
				//console.log($scope.datosSQLusuariosArray);
				/* $scope.friends=" [{name:'John', phone:'555-1276'},{name:'Mary', phone:'800-BIG-MARY'},{name:'Mike', phone:'555-4321'}, {name:'Adam', phone:'555-5678'},{name:'Julie', phone:'555-8765'}, {name:'Juliette', phone:'555-5678'}]"; */
				
				
			})
			.error(function(data){
				//sin internet, cargo datos locales
				
			});
		}	
		
		
		
		/* var expectFriendNames = function(expectedNames, key) {
		  element.all(by.repeater(key + ' in friends').column(key + '.name')).then(function(arr) {
			arr.forEach(function(wd, i) {
			  expect(wd.getText()).toMatch(expectedNames[i]);
			});
		  });
		};  */

});