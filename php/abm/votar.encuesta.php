<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Respuesta.php');
	//require_once('../clases/Encuesta.php');
	//require_once('../clases/Opciones.php');
	
	
	/****** Creo respuesta a encuesta ******/
	if(isset($_SESSION["s_id"])){
		$_POST["FKUSUARIO"]=$_SESSION["s_id"];
		$respuesta=new Respuesta();
		
		$respuesta=$respuesta->crear_respuesta($_POST);
		
		var_dump($respuesta);
		var_dump($_POST);
	
	}
	else{
		echo 0; //usuario no logeado
	}
	
?>