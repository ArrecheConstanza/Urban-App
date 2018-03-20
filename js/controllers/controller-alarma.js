/********************************************CONTROLLER SIDEBAR ***************************************/

Urban.controller("alarmaCtrl", function ($location,$http,$scope,$timeout,$interval) {

	id("alarma_activa").style.display="none";
	id("myProgress").style.display="none";
	tn(id("title-container"),"h1",0).style.display="inline-block";
	
	//ALARMA ACTIVA 
	function alarma_activa(){
	
	
	//fondo 
	console.log(id("alarma_activa").parentNode.parentNode.parentNode);
	//id("alarma_activa").parentNode.parentNode.parentNode.className="alarma_activada";
	
	//cronometro
	   var timeLimit = 5; //tiempo en minutos
	   var conteo = new Date(timeLimit * 60000);
	   function inicializar(){
		  document.getElementById('cuenta').childNodes[0].nodeValue = 
					  conteo.getMinutes() + ":" + conteo.getSeconds();
	   }
		id("myProgress").style.display="inline-block";

	   function cuenta(){
	//progress bar
		  var elem = document.getElementById("myBar");   
		  var width = 1;
		  var id = setInterval(frame, 3000);
		  function frame() {
			if (width >= 100) {
			  clearInterval(id);
			} else {
			  width++; 
			  elem.style.width = width + '%'; 
			}
		  }
		  
		  intervaloRegresivo = setInterval(
			function regresiva(){
			  if(conteo.getTime() > 0){
				 conteo.setTime(conteo.getTime() - 1000);
			  }
			  else{
				 clearInterval(intervaloRegresivo);
				 alert("Fin");
			  }
			  var segundos=conteo.getSeconds();
			  if(segundos<=9){
				segundos="0"+segundos;
			  }
			  document.getElementById('cuenta').childNodes[0].nodeValue = conteo.getMinutes() + ":" + segundos;
		   } 
		  , 1000);
	   }
		cuenta();
		onload = inicializar;  
	}
	
	// mantener presionado 3s
	id("fonto_boton").style.display="none";

	var myBtn= document.getElementById('boton_alarma');       
	var timer, timePressed = 0;
	myBtn.addEventListener('touchstart', function(e){
			timePressed = 0;
			timer = setInterval(function(){
				id("fonto_boton").style.display="block";
				timePressed += 100;
				if (timePressed > 3000){
				   clearInterval(timer);
				   tn(id("title-container"),"h1",0).style.display="none";
				   id("fonto_boton").style.display="none";
				   id("alarma_inactiva").style.display="none";
				   id("title-container").style.marginBottom="1em";
				   id("alarma_activa").style.display="inline-block";
/* 				   id("title-container").parentNode.style.backgroundColor="white";
 */				   //ALARMA ACTIVA 
				   alarma_activa();
				}
			}, 100);
		});

    myBtn.addEventListener('touchend', function(e){
		id("fonto_boton").style.display="none";
        clearInterval(timer);
    });

});