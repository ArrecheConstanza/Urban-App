<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Usuario.php');
	
	/******  ******/
	if(isset($_SESSION["s_id"])){
		$usuario = new Usuario();
		$_POST["BANNEADO"]="Si";
		$fin=json_decode($usuario->bannear_usuario($_POST),true);
		echo $fin;
	}
	else{
		echo 0; //no logueado
	}
?>