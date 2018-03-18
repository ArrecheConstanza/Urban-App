/********************************************CONTROLLER SIDEBAR ***************************************/

Urban.controller("alarmaCtrl", function ($location,$http,$scope,$timeout,$interval) {
	
	
	// mantener presionado 3s

	var myBtn= document.getElementById('boton_alarma');       
	var timer, timePressed = 0;

	myBtn.addEventListener('touchstart', function(e){
			timePressed = 0;
			timer = setInterval(function(){
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

});