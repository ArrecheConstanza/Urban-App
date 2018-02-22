<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Usuario.php');
	
	// falta validar datos
	
	if(isset($_SESSION["s_id"])){
		$usuario = new Usuario();
		//$array="Admin";
		$rta=$usuario->usuario_estadistica_user();
		//$rta2=$usuario->usuario_estadistica_nivel("Usuario");
		//var_dump("entre");
		var_dump($rta);
		//var_dump($rta2);
	}
	else{ //no logueado
		return 0;
	}
?>