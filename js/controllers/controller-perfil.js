/********************************************CONTROLLER PERFIL***************************************/

Urban.controller("perfilCtrl",  ['$scope', '$http', '$location', 'Upload', '$timeout', function  ($scope, $http, $location, Upload, $timeout) { 
	
	$scope.back=function(){
		window.location.href=localStorage.getItem("urban_url");
	}
	
	/****listado de grupos ****/
	$http({
		method: 'GET',
		url:"php/abm/usuario.perfil.php",
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
	})
	.success(function(data){
		if(data=="0"){
			//uruario no logueado cerrar sesion
			$http({
				method: 'GET',
				url:"php/abm/logout.usuario.php",
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			})
			.success(function(data){
				if(data){
					window.localStorage.removeItem("user_urban");
					$location.path("/");
				}
			});
		}
		else if(data){
				$scope.listado_publicaciones=[];
				$scope.listado_encuestas=[];
			if(data[0].length){
				for(var i=0;i<data[0].length;i++){
					
					//si tiene o no foto
						if(!data[0][i].FOTO.length){
							data[0][i].FOTO="/urban-app/img/fotos/muestra.jpg";
						}
						else{
							//solo 1 foto, editar cuando se suban mas de una
							var foto=data[0][i].FOTO[0]["DIR"].substring(26,data[0][i].FOTO[0]["DIR"].length);
							data[0][i].FOTO=foto;
						}
						
						
					$scope.listado_publicaciones.push(angular.fromJson(data[0][i]));
				}
				//boton ir a publicacion
				$scope.detallePublicacion=function(num){
					localStorage.setItem("id_publi",num);
					$location.path("/detallePublicacion");
				}
			}
			if(data[1].length){
				for(var i=0;i<data[1].length;i++){
					$scope.listado_encuestas.push(angular.fromJson(data[1][i]));
				}
			}
			if(!$scope.listado_publicaciones.length)
			console.log($scope.listado_publicaciones.length);
		}
		
	})
	.error(function(){ //sin acceso a intenret, cargo datos locales
		
	});
	
}]);
	
	