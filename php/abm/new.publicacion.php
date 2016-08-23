<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Publicacion.php');
	
// guardado de datos en bdd

	/****** Creo publicacion ******/
	if(isset($_SESSION["s_id"])){
	$publicacion = new Publicacion();
	$_POST["FECHA_CREACION"]=getDatetimeNow();
	$_POST["FKGRUPO"]=1;
	$_POST["FKUSUARIO"]=$_SESSION["s_id"];
	$fin=json_decode($publicacion->crear_publicacion($_POST),true);
		echo $fin;
	}
	else{
		echo 0;
	}
?>