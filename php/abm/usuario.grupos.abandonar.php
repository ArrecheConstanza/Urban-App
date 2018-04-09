<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases ******/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Usuario_Grupo.php');
	
	if(isset($_POST["id_grupo"])){
		$_POST["id_usuario"]=$_SESSION["s_id"];
		$usuario_grupo= new Usuario_Grupo();
		echo $usuario_grupo->abandonar_usuario_grupo($_POST);
	}
	else{
		echo 0;
	}
?> 