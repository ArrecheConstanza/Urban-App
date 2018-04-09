<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Usuario.php');
	require_once('../clases/Validacion.php');
	
	/***** Validacion ******/
	
	// falta validar datos
	
	if(isset($_SESSION["s_id"])){
		$usuario = new Usuario();
		$_POST["ID"]=$_SESSION["s_id"];
		$usuario=$usuario->editar_direccion($_POST);
		echo $usuario;
	}
	else{ //no logueado
		echo 0;
	}

?>