
/******************************************** MODULO Y CONTROLLER CHAT **************************************/

/** variable global **/
var array_mensajes=[];


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
	'ngFileUpload', //upload imagenes
] );

/** controller **/
basicChat.controller( 'BasicController', [ 'Messages', 'Upload', '$scope', '$window', '$location', '$http' , function( Messages, Upload, $scope, $window, $location, $http) {
	
	//funcion volver atras
	$scope.$back = function() { 
		window.location.href=localStorage.getItem("urban_url");
	};
	
	if(localStorage.getItem("nombre_chat")!=null&&localStorage.getItem("nombre_chat")!=""&&localStorage.getItem("user_urban")!=null&&localStorage.getItem("user_urban")!=""){
		//$routeParams["id"]=angular.fromJson(localStorage.getItem("nombre_chat")).ID;

		//$scope.titulo_chat=angular.fromJson(localStorage.getItem("nombre_chat")).NOMBRE; //preguntar si existe sino tirar error
		$scope.titulo_chat="vecinos wash";
		$scope.id_grupo=localStorage.getItem("grupo_seleccionado_urban"); //preguntar si existe sino tirar error
		//$scope.id_chat=angular.fromJson(localStorage.getItem("nombre_chat")).ID; //preguntar si existe sino tirar error
		$scope.id_chat=1; //preguntar si existe sino tirar error
		
		var chat = this;
		chat.status = "";
		chat.messages = [];

		/** listar mensajes **/
		
		//////TRAIGO LISTADO DE COMENTARIOS EN CHAT 
		var datos="id_chat="+$scope.id_chat;
		$http({ 
			method:"POST",
			url:"../php/abm/chats.comentario.listado.php",
			data: datos,	
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
		})
		.success(function(data, status){
				var comentarios_chat=[];
				var self; 
				for (var i=0;i<data.length;i++){
					
					//para saber si el mensaje es del propio usuario o de otros					
					if(data[i].FKUSUARIO==angular.fromJson(localStorage.getItem("user_urban")).ID){
						self=true;
					}
					else{
						self=false;
					}
					
					//creo objeto comentario para listar chat
					var comentario={
						'data': data[i].COMENTARIO,
						'user': {
							'id': data[i].FKUSUARIO,
							'name':data[i].NOMBRE_USUARIO,
							'comentario_id':data[i].COMENTARIO_ID,
							
						},
						'self':self,
						'$$hashKey':'object:'+data[i].ID,
						'foto': data[i].FOTO
					}
					comentarios_chat.push(comentario);
				}
				array_mensajes=comentarios_chat;
				var chatmessages = document.querySelector(".chat-messages");
				chat.messages=array_mensajes;

				//scroll en chat
				setTimeout( function() {
					chatmessages.scrollTop = chatmessages.scrollHeight;
				}, 1 );
				
				/** recibir mensaje **/
				Messages.receive(function(msg){
					chat.messages.push(msg);
	
					//scroll en chat
					setTimeout( function() {
						chatmessages.scrollTop = chatmessages.scrollHeight;
					}, 1 );
				}); 
				 
				/** enviar mensaje **/
				chat.send = function(file) {
					$scope.comentario=chat.textbox;
					Messages.send({ data : chat.textbox });
					chat.status = "sending";
					chat.textbox = "";
					$scope.picFile = null;
					setTimeout( function() { chat.status = "" }, 100 );
					
					$scope.comentario_id=localStorage.getItem("coment_temp_id"); //preguntar si no existe tirar error
					
					/**recopilacion de datos**/
					datos_chat={
						FKCHAT: $scope.id_chat,
						FKGRUPO: $scope.id_grupo,
						COMENTARIO: $scope.comentario,
						COMENTARIO_ID: $scope.comentario_id,
						FOTO: file
					}
					
					/**Si tiene foto**/
					chat.textbox.upload = Upload.upload({
						method: 'POST',
						url:"../php/abm/comentar.chat.php",
						data: datos_chat,
					})
					.then(function(response){
						if(response.data){
								console.log(response.data);
							
						}
						else{
							//modal error?
						}
					}
					,function(response){
						//modal error
						
					});
			};
		})
		.error(function(){
			//mensaje Sin conexion mostrar datos de localstorage
		});
		

		
		/* var chatmessages = document.querySelector(".chat-messages");
		Messages.receive(function(msg){
			chat.messages.push(msg);
			setTimeout( function() {
				chatmessages.scrollTop = chatmessages.scrollHeight;
			}, 1 );
		}); */
		
		/** enviar mensaje **/
		/*chat.send = function(file) {
			$scope.comentario=chat.textbox;
			Messages.send({ data : chat.textbox });
			chat.status = "sending";
			chat.textbox = "";
			$scope.picFile = null;
			setTimeout( function() { chat.status = "" }, 100 );
			
			/**recopilacion de datos**
			datos_chat={
				FKCHAT: $scope.id_chat,
				FKGRUPO: $scope.id_grupo,
				COMENTARIO: $scope.comentario,
				FOTO: file
			}
			
			/**Si tiene foto**
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
			
		};*/
		
		
		
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
			$window.location.href= "/urban-app/index.html#/chat" ;
		}
	}
	else{
		//modal error
		$window.location.href= "/urban-app/index.html#/chat" ;
	}
}]);