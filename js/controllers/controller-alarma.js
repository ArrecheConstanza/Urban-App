/********************************************CONTROLLER SIDEBAR ***************************************/

Urban.controller("alarmaCtrl", function ($location,$http,$scope,$timeout,$interval) {

	id("alarma_activa").style.display="none";
	id("myProgress").style.display="none";
	tn(id("title-container"),"h1",0).style.display="inline-block";
	
	//ALARMA ACTIVA 
	function alarma_activa(x){
		
	//almacenamiento de datos en bdd	//['CUANDO', 'LONGITUD','LATITUD','FKUSUARIO','FKALARMA'];
		function localizar(position) {
			var latitud = position.coords.latitude;
			var longitud = position.coords.longitude;
		}
		function error(error) {
			switch(error.code) {
				case error.UNKNOWN_ERROR:
				alert("La geolocalización ha encontrado un error.");
				break;
					case error.PERMISSION_DENIED:
					alert("El usuario no ha autorizado el acceso a su posición.");
				break;
					case error.POSITION_UNAVAILABLE:
					alert("El usuario no puede ser localizado.");
				break;
					case error.TIMEOUT:
					alert("La geolocalización ha excedido el tiempo límite.");
				break;
			}
		}
		function getLocalisation(){
			if(navigator.geolocation){
				navigator.geolocation.getCurrentPosition(localizar,error);
			}
			else {
				alert("Lo sentimos, su navegador no soporta la geolocalización");
			}
		}
			
		//LATITUD Y LONGITUD	
		getLocalisation();
		
//***********************************
		
		document.getElementById("sub_alarm").style.display="none";
		if(x!=undefined){
			document.getElementById("sub_alarm").style.display="inline-block";
			switch(x){
				case "policia":
					document.getElementById("sub_alarm").src="img/icons/png/alarm-2.png";
				break;
				case "ambulancia":
					document.getElementById("sub_alarm").src="img/icons/png/alarm-3.png";
				break;
				case "bombero":
					document.getElementById("sub_alarm").src="img/icons/png/alarm-4.png";
				break;
			}
		}
		
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
				 tn(document.getElementById("title-container"),"h1",0).style.display="inline-block";
				   document.getElementById("alarma_inactiva").style.display="inline-block";
				   document.getElementById("alarma_activa").style.display="none";
				   document.getElementById("myProgress").style.display="none";
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
	
	//mantener presionado 3s
	// BOTON PRINCIPAL 
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

				   alarma_activa();
				}
			}, 100);
		});

    myBtn.addEventListener('touchend', function(e){
		id("fonto_boton").style.display="none";
        clearInterval(timer);
    });
	
	var sub_botones=document.getElementsByClassName("sub_botones");
	
	// BOTON POLICIA 
	document.getElementsByClassName("fondo_sub_boton")[0].style.display="none";
	var myBtn= sub_botones[0].childNodes[1];       
	var timer, timePressed = 0;
	myBtn.addEventListener('touchstart', function(e){
			timePressed = 0;
			timer = setInterval(function(){
				document.getElementsByClassName("fondo_sub_boton")[0].style.display="block";
				timePressed += 100;
				if (timePressed > 3000){
				   clearInterval(timer);
				   tn(id("title-container"),"h1",0).style.display="none";
				   document.getElementsByClassName("fondo_sub_boton")[0].style.display="none";
				   id("alarma_inactiva").style.display="none";
				   id("title-container").style.marginBottom="1em";
				   id("alarma_activa").style.display="inline-block";
				   alarma_activa("policia");
				}
			}, 100);
		});

    myBtn.addEventListener('touchend', function(e){
		document.getElementsByClassName("fondo_sub_boton")[0].style.display="none";
        clearInterval(timer);
    });	
		
	// BOTON AMBULANCIA 
	document.getElementsByClassName("fondo_sub_boton")[1].style.display="none";
	var myBtn= sub_botones[0].childNodes[3];       
	var timer, timePressed = 0;
	myBtn.addEventListener('touchstart', function(e){
			timePressed = 0;
			timer = setInterval(function(){
				document.getElementsByClassName("fondo_sub_boton")[1].style.display="block";
				timePressed += 100;
				if (timePressed > 3000){
				   clearInterval(timer);
				   tn(id("title-container"),"h1",0).style.display="none";
				   document.getElementsByClassName("fondo_sub_boton")[1].style.display="none";
				   id("alarma_inactiva").style.display="none";
				   id("title-container").style.marginBottom="1em";
				   id("alarma_activa").style.display="inline-block";
				   alarma_activa("ambulancia");
				}
			}, 100);
		});

    myBtn.addEventListener('touchend', function(e){
		document.getElementsByClassName("fondo_sub_boton")[1].style.display="none";
        clearInterval(timer);
    });
	
		
	// BOTON BOMBEROS 
	document.getElementsByClassName("fondo_sub_boton")[2].style.display="none";
	var myBtn= sub_botones[0].childNodes[5];       
	var timer, timePressed = 0;
	myBtn.addEventListener('touchstart', function(e){
			timePressed = 0;
			timer = setInterval(function(){
				document.getElementsByClassName("fondo_sub_boton")[2].style.display="block";
				timePressed += 100;
				if (timePressed > 3000){
				   clearInterval(timer);
				   tn(id("title-container"),"h1",0).style.display="none";
				   document.getElementsByClassName("fondo_sub_boton")[2].style.display="none";
				   id("alarma_inactiva").style.display="none";
				   id("title-container").style.marginBottom="1em";
				   id("alarma_activa").style.display="inline-block";
				   alarma_activa("bombero");
				}
			}, 100);
		});

    myBtn.addEventListener('touchend', function(e){
		document.getElementsByClassName("fondo_sub_boton")[2].style.display="none";
        clearInterval(timer);
    });



});