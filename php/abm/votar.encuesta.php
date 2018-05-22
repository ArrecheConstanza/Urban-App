<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Respuesta.php');
	
	
	/****** Creo respuesta a encuesta ******/
	if(isset($_SESSION["s_id"])){
		$_POST["FKUSUARIO"]=$_SESSION["s_id"];
		$respuesta=new Respuesta();
		$rta=$respuesta->ya_voto($_POST);
		if(count($rta)==0){
			$respuesta=$respuesta->crear_respuesta($_POST);
			echo $respuesta;
		}
		else{
			echo "Ya voto";
		}
	}
	else{
		echo 0; //usuario no logeado
	}
	
?>