/********************************************CONTROLLER SIDEBAR ***************************************/

Urban.controller("alarmaCtrl", function ($location,$http,$scope) {
	  $scope.model = {
        left:  0,
        right: 0,
        click: 0
    };
    $scope.swipeLeft = function () {
        $scope.model.left += 1;
    };
    $scope.swipeRight = function () {
        $scope.model.right += 1;
    };
    $scope.touchClick = function () {
        $scope.model.click += 1;
    };
	
	
	// mantener presionado 3s
	$(document).ready(function(){
		$("#boton_alarma").click(function(){
			//$("#boton_alarma").hide();
		
			$( "#boton_alarma" ).mouseout(function() {
			 console.log("sali");
			});
		});
	});
		/*var c=0;
		var t;

		function timedCountMas(inputName, vnum){
		hola = inputName;
		x = vnum;
		document.getElementById(inputName).value=c;
		c=c+x;
		c=Math.round(c*100)/100;
		t=setTimeout("timedCountMas(hola, x)", 66);
		}

		function timedCountMenos(inputName, vnum){
		hola = inputName;
		x = vnum;
		document.getElementById(inputName).value=c;
		if (c>0) 
			{ c=c-x;
			  c=Math.round(c*100)/100;
			  t=setTimeout("timedCountMenos(hola, x)", 66); }
		}

		function stopCount(){
		clearTimeout(t);
		}*/
	
});