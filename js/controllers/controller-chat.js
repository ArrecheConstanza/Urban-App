
/******************************************** MODULO Y CONTROLLER CHAT **************************************/

/** configuracion **/
angular.module('chat').constant( 'config', {
    "pubnub": {
        "publish-key"   : "pub-c-aefb421c-b30a-4afc-bae4-b866c5ea3d69",
        "subscribe-key" : "sub-c-76f89e66-c3a9-11e5-b5a8-0693d8625082"
    }
} );

/** modulo **/
var basicChat = angular.module( 'BasicChat', ['chat'] );

/** controller **/
basicChat.controller( 'BasicController', [ 'Messages', '$scope', '$window', '$location', function( Messages, $scope, $window, $location ) {
    var chat = this;
    chat.status = "";
    chat.messages = [];
    Messages.user({ name : sillyname() });

	/** cargar mensaje **/
    var chatmessages = document.querySelector(".chat-messages");
    Messages.receive(function(msg){
        chat.messages.push(msg);
        setTimeout( function() {
            chatmessages.scrollTop = chatmessages.scrollHeight;
        }, 10 );
    });
	
	/** enviar mensaje **/
    chat.send = function() {
        Messages.send({ data : chat.textbox });
        chat.status = "sending";
        chat.textbox = "";
        setTimeout( function() { chat.status = "" }, 1200 );
    };
	
	/** volver a listado de chats **/
	$scope.volver_chats=function(){
		$window.location.href= "/urban-app/index.html#/chats" ;
	}

}]);