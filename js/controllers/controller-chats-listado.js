
/********************************************CONTROLLER CHATS LISTADO**************************************/

Urban.controller("chatsListadoCtrl", function ($scope,$http,$location,$window){
	
	if(localStorage.getItem("grupo_seleccionado_urban")!=null){
		var id=localStorage.getItem("grupo_seleccionado_urban");
		var datos="id="+id;
		
		$scope.listado_chats=[
			{TITULO:"Seguridad",
			IMG:"chat_seguridad.png"},
			{TITULO:"Animales",
			IMG:"chat_animales.png"},
			{TITULO:"General",
			IMG:"chat_general.png"}
		];
		
		$scope.abrir_chat=function(){
			$window.location.href= "../urban-app/vistas/chat.html" ;
		}
		/*//pido datos de bdd
			$http({ 
				method:"POST",
				url:"php/abm/chats.listado.php",
				data: datos,	
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			})
			.success(function(data, status){
				var rta=angular.fromJson(data);
				$scope.datosSQLpublicaciones=rta.reverse();
			});*/
	}
	else{
		//modal de error, no hay grupo, redireccion a mapa para union a grupo o creacion de grupo
	}
});