
/******************************************** MODULO Y CONTROLLER CHAT **************************************/

var chat = angular.module( 'BasicChat', ['chat'] );
chat.controller( 'chat', [ 'Messages', '$scope',
function( Messages, $scope ) {
    // Message Inbox
    $scope.messages = [];

    // Receive Messages
    Messages.receive(function(message){
        $scope.messages.push(message);
    });

    // Send Messages
    $scope.send = function() {
        Messages.send({ data : $scope.textbox });
    };
} ] );