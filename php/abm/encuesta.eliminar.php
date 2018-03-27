<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Encuesta.php');
	
	/****** Elimino encuesta  ******/
	if(isset($_SESSION["s_id"])){
		//validar que sea el usuario creador o un admin
		$encuesta = new Encuesta();
		$fin=json_decode($encuesta->eliminar_encuesta($_POST),true);
		echo $fin;
	}
	else{
		echo 0;
	}
?>