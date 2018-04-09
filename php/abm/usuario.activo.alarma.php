<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Usuario_Activo_Alarma.php');
	
	
	/****** Creo usuario_activo_alarma ******/
	
	if(isset($_SESSION["s_id"])){
		$usuario_alarma = new Usuario_Activo_Alarma();
		$_POST["CUANDO"]=getDatetimeNow();
		$_POST["FKUSUARIO"]=$_SESSION["s_id"];
		$usuario_alarma=$usuario_alarma->crear_usuario_activo_alarma($_POST);
		echo $usuario_alarma;
	}
	else{ // no logueado
		echo "no logueado";
	}	
	
?>