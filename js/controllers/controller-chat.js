
/******************************************** MODULO Y CONTROLLER CHAT **************************************/

/** configuracion **/

angular.module('chat').constant( 'config', {
    "pubnub": {
        "publish-key"   : "pub-c-aefb421c-b30a-4afc-bae4-b866c5ea3d69",
        "subscribe-key" : "sub-c-76f89e66-c3a9-11e5-b5a8-0693d8625082"
    }
} );

/** modulos **/
var basicChat = angular.module( 'BasicChat', [
	'chat', //chat
	'ngFileUpload' //upload imagenes
] );

/** controller **/
basicChat.controller( 'BasicController', [ 'Messages', 'Upload', '$scope', '$window', '$location', '$http', function( Messages, Upload, $scope, $window, $location, $http ) {
	
	//funcion volver atras
	$scope.$back = function() { 
		window.history.back();
	};
	
	if(localStorage.getItem("nombre_chat")!=null&&localStorage.getItem("nombre_chat")!=""&&localStorage.getItem("user_urban")!=null&&localStorage.getItem("user_urban")!=""){
		
		/** nombre de grupo **/
		$scope.titulo_chat=angular.fromJson(localStorage.getItem("nombre_chat")).NOMBRE; //preguntar si existe sino tirar error
		$scope.id_grupo=localStorage.getItem("grupo_seleccionado_urban"); //preguntar si existe sino tirar error
		$scope.id_chat=angular.fromJson(localStorage.getItem("nombre_chat")).ID; //preguntar si existe sino tirar error
		
		var chat = this;
		chat.status = "";
		chat.messages = [];

		/** nombre de usuario **/
		$scope.nombre_usuario=angular.fromJson(localStorage.getItem("user_urban")).NOMBRE+" "+angular.fromJson(localStorage.getItem("user_urban")).APELLIDO;

		/** listar mensajes **/
		
		//////CREANDO LISTADO DE CHAT 
		var datos="id_chat="+$scope.id_chat;
		$http({ 
			method:"POST",
			url:"../php/abm/chats.comentario.listado.php",
			data: datos,	
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
		})
		.success(function(data, status){
				/* var rta=angular.fromJson(data);
					var id_grupo=[];
					for (var i=0;i<data.length;i++){
						id_grupo.push(data[i].ID);
					}
					$scope.grupos=id_grupo;
				rta.push(todos);
				$scope.listado_grupos=rta.reverse(); */
				var comentarios=[];
				console.log(data);
				for (var i=0;i<data.length;i++){
					comentarios.push(data[i].COMENTARIO);
					//Messages.receive(comentarios);
					/* var chatmessages = document.querySelector(".chat-messages");
					Messages.receive(function(msg){
						chat.messages.push(msg);
						setTimeout( function() {
							chatmessages.scrollTop = chatmessages.scrollHeight;
						}, 1 );
					}); */
				
				}
				var chatmessages = document.querySelector(".chat-messages");
				Messages.receive(function(msg){
					chat.messages.push(msg);
					//console.log(msg)
					console.log(chat.messages);
					/* setTimeout( function() {
						chatmessages.scrollTop = chatmessages.scrollHeight;
					}, 1 );  */
				});
				 
				/** enviar mensaje **/
			chat.send = function(file) {
			$scope.comentario=chat.textbox;
			Messages.send({ data : chat.textbox });
			chat.status = "sending";
			chat.textbox = "";
			$scope.picFile = null;
			setTimeout( function() { chat.status = "" }, 100 );
			
			/**recopilacion de datos**/
			datos_chat={
				FKCHAT: $scope.id_chat,
				FKGRUPO: $scope.id_grupo,
				COMENTARIO: $scope.comentario,
				FOTO: file
			}
			
			/**Si tiene foto**/
			chat.textbox.upload = Upload.upload({
				method: 'POST',
				url:"../php/abm/comentar.chat.php",
				data: datos_chat,
			})
			.then(function(response){
				console.log(response);
				if(response.data){
					if(localStorage.getItem("grupo_seleccionado_urban")!=null){
						$location.path("/publicaciones/"+localStorage.getItem("grupo_seleccionado_urban"));
					}
				}
				else{
					//modal error
				}
			}
			,function(response){
				//modal error
				
			});
			
		};
		})
		.error(function(){
			//mensaje Sin conexion 
		});
	
	
		/* var chatmessages = document.querySelector(".chat-messages");
		Messages.receive(function(msg){
			chat.messages.push(msg);
			setTimeout( function() {
				chatmessages.scrollTop = chatmessages.scrollHeight;
			}, 1 );
		}); */
		
		/** enviar mensaje **/
		chat.send = function(file) {
			$scope.comentario=chat.textbox;
			Messages.send({ data : chat.textbox });
			chat.status = "sending";
			chat.textbox = "";
			$scope.picFile = null;
			setTimeout( function() { chat.status = "" }, 100 );
			
			/**recopilacion de datos**/
			datos_chat={
				FKCHAT: $scope.id_chat,
				FKGRUPO: $scope.id_grupo,
				COMENTARIO: $scope.comentario,
				FOTO: file
			}
			
			/**Si tiene foto**/
			chat.textbox.upload = Upload.upload({
				method: 'POST',
				url:"../php/abm/comentar.chat.php",
				data: datos_chat,
			})
			.then(function(response){
				console.log(response);
				if(response.data){
					if(localStorage.getItem("grupo_seleccionado_urban")!=null){
						$location.path("/publicaciones/"+localStorage.getItem("grupo_seleccionado_urban"));
					}
				}
				else{
					//modal error
				}
			}
			,function(response){
				//modal error
				
			});
			
		};
		
		
		
		////////
		/*var titulo=datos_publicacion["TITULO"];
			titulo.upload = Upload.upload({
				method: 'POST',
				url:"php/abm/new.publicacion.php",
				data: datos_publicacion,
			})
			.then(function(response){
				if(response.data){
					//modal exito?
					if(localStorage.getItem("grupo_seleccionado_urban")!=null){
						$location.path("/publicaciones/"+localStorage.getItem("grupo_seleccionado_urban"));
					}
				}
				else{
					//modal error
				}
			}
			,function(response){
				//modal error
				
			});*/
		
		
		
		
		
		
		
		
		
		
		
		
		/** volver a listado de chats **/
		$scope.volver_chats=function(){
			window.localStorage.removeItem("nombre_chat");
			$window.location.href= "/urban-app/index.html#/chats" ;
		}
	}
	else{
		//modal error
		$window.location.href= "/urban-app/index.html#/chats" ;
	}
}]);