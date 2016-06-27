<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Usuario.php');
	require_once('../clases/Publicacion.php');
	
	$publicaciones=Publicacion::all();
	var_dump ($publicaciones);

?> 