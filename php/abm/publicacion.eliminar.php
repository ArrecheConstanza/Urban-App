<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Publicacion.php');
	
// guardado de datos en bdd

	/****** Creo publicacion ******/
	if(isset($_SESSION["s_id"])){
	$publicacion = new Publicacion();
	$fin=json_decode($publicacion->eliminar_publicacion($_POST),true);
		echo $fin;
	}
	else{
		echo 0;
	}
?>