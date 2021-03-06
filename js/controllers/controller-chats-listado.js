
/********************************************CONTROLLER CHATS LISTADO**************************************/

Urban.controller("chatsListadoCtrl", function ($scope,$http,$location,$window){
	
	if(localStorage.getItem("grupo_seleccionado_urban")!=null){
		var id=localStorage.getItem("grupo_seleccionado_urban");
		var datos="id="+id;
		
		//pido datos de bdd
		$http({ 
			method:"POST",
			url:"php/abm/chats.listado.php",
			data: datos,	
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
		})
		.success(function(data, status){
			for(var i in data){
				//falta poner foto por defecto si no hay foto
				var foto=data[i].FOTO.substring(26,data[i].FOTO.length);
				data[i].FOTO=foto;
			}
			var rta=angular.fromJson(data);
			$scope.listado_chats=rta.reverse();
		})
		.error(function(){
			// sin internet
		});
				
		$scope.abrir_chat=function(nombre,id){
			var grupo={
				ID:id,
				NOMBRE:nombre
			}
			localStorage.setItem("nombre_chat",angular.toJson(grupo));
		
			//$window.location.href= "../urban-app/vistas/chat.html" ;
		}
	}
	else{
		//modal de error, no hay grupo, redireccion a mapa para union a grupo o creacion de grupo
	}
});