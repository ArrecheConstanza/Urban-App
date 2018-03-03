/********************************************CONTROLLER SIDEBAR ***************************************/

Urban.controller("alarmaCtrl", function ($location,$http,$scope,$timeout,$interval) {
	
	 // mantener presionado 2s
	 
	var tiempo=null;
	$scope.iniciar_click=function(){
		 tiempo = $timeout(function () {
			alert("aca pasa algo turbio");
		}	, 2000);
	}
	
	$scope.finalizar_click=function(){
		console.log("ya no");
		//console.log( $scope.tiempo);
		$timeout.cancel(tiempo);

		
	}
	 
	
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