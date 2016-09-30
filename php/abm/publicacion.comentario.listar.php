<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Publicacion_Comentario.php');
	
	/****** Listar publicacion_comentario ******/
	
	if(isset($_SESSION["s_id"])&&isset($_POST["ID"])){
		$publicacion_comentario = new Publicacion_Comentario();
		$rta=$publicacion_comentario->listar_comentario_publicacion($_POST["ID"]);
		var_dump($rta);
	}
	else{
		echo 0;
	}	
	
?>