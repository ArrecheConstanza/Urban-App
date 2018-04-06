<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Usuario_Grupo.php');

	if(isset($_SESSION["s_id"])){
		$grupo = new Usuario_Grupo();
		$_POST['id_usuario']=$_SESSION["s_id"];
		$grupo = $grupo ->abandonar_usuario_grupo($_POST);
		echo $grupo;
	}
	else{ //no logueado
		echo 0;
	}
?>