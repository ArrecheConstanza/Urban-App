<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases ******/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases//Publicacion.php');
	require_once('../clases/Publicacion_Multimedia.php');
	require_once('../clases/Encuesta.php');
	
	if(isset($_SESSION["s_id"])){
		
	}
	else{ //no logueado
		echo 0;
		return 0;
	}
?> 

