<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Denuncia_Publicacion.php');
	require_once('../clases/Publicacion_Multimedia.php');
	require_once('../clases/Publicacion.php');
	
	/****** Creo publicacion ******/
	
	if(isset($_SESSION["s_id"])){
		$denuncia_publicacion = new Denuncia_Publicacion();
		
		//FALTA VALIDACION DE DATOS 
		$rta=$denuncia_publicacion->contar_denuncias($_POST["FKPUBLICACION"]);
		echo $rta;
	}
	else{
		echo 0;
	}	
	
?>