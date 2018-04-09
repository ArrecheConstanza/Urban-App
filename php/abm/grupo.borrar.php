<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Grupo.php');

	if(isset($_SESSION["s_id"])){
		$grupo = new Grupo();
		$grupo = $grupo ->eliminar_grupo($_POST);
		echo $grupo;
	}
	else{ //no logueado
		echo 0;
	}
?>