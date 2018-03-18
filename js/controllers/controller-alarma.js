/********************************************CONTROLLER SIDEBAR ***************************************/

Urban.controller("alarmaCtrl", function ($location,$http,$scope,$timeout,$interval) {
	
	 // mantener presionado 2s

	var myBtn= document.getElementById('boton_alarma');       
	var timer, timePressed = 0;

	myBtn.addEventListener('touchstart', function(e){
			timePressed = 0;
			timer = setInterval(function(){
				//aqui tienes el control de cuanto tiempo el boton esta presionado
				timePressed += 100;
				if (timePressed > 3000){
				   alert('Largo click!');
				   clearInterval(timer);
				}
			}, 100);
		});

    myBtn.addEventListener('touchend', function(e){
        clearInterval(timer);
    });

	myBtn.addEventListener('click', function(e){
			alert('Corto click!');
		});
	
	/*$scope.tiempo=null;
	$scope.iniciar_click=function(){
		$timeout.cancel($scope.tiempo);
		 $scope.tiempo = $timeout(function () {
			alert("aca pasa algo turbio");
		}	, 3000);
	}
	
	$scope.finalizar_click=function(){
		console.log("ya no");
		$timeout.cancel($scope.tiempo);
	}*/
	 
	
			/* $scope.counter = 0;
			var promise;
			$scope.iniciar_click=function(){
				//var increaseCounter = function () {
					$scope.counter = $scope.counter + 1;
				//}
				var promise = $interval($scope.iniciar_click, 3);
			}

        
            $scope.cancel = function () {
				if(promise!=undefined){
					$interval.cancel(promise);
				}
				$scope.counter = "Cancelled!";
			}; */
			

});