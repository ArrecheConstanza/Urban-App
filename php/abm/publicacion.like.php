<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Publicacion_Like.php');
		
	if(isset($_SESSION["s_id"])){
		$publicacion_like = new Publicacion_Like();
		$_POST["FKUSUARIO"]= $_SESSION["s_id"];
		$rta=$publicacion_like->click_like($_POST);
		echo $rta;
	}
	else{
		echo 0;
	}	
	
?>