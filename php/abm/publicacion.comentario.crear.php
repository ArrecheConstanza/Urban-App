<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Publicacion_Comentario.php');
	
	/****** Creo publicacion_comentario ******/
	
	if(isset($_SESSION["s_id"])){
		$publicacion_comentario = new Publicacion_Comentario();
		$_POST["FECHA_CREACION"]=getDatetimeNow();
		$_POST["FKUSUARIO"]=$_SESSION["s_id"];
		$rta=$publicacion_comentario->crear_comentario_publicacion($_POST);
		echo $rta;
	}
	else{
		echo 0;
	}	
	
?>