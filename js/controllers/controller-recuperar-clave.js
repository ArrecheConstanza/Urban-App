/********************************************CONTROLLER RECUPERAR CLAVE ***************************************/

Urban.controller("recuperarClaveCtrl", function ($location,$http,$scope,$window) {

	$scope.recuperar_clave=function(usuario){
		var union = "EMAIL="+usuario.EMAIL;
		 $http({
			method: 'POST',
			data: union,
			url:"php/abm/recuperar.clave.php",
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
		})
		.success(function(data){
			console.log(data);
			if(data=='0'){
				//sin datos recibidos
			}
			else if(data=='usuario inexistente'){
				//usuario inexistente
			}
			else if(data=='1'){
				//modal mail enviado para recuperar clave
				//$location.path("/iniciar-sesion");
				console.log(data);
			}
		})
		.error(function(){ 
			//sin acceso a intenret, intentar mas tarde
		});
			
	}	
	
});