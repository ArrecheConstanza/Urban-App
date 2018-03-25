<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Denuncia_Publicacion.php');
	
	/****** Creo publicacion ******/
	
	if(isset($_SESSION["s_id"])){
		$denuncia_publicacion = new Denuncia_Publicacion();
		
		//FALTA VALIDACION DE DATOS 
		
		$_POST["FKUSUARIO"]=$_SESSION["s_id"];
		var_dump($rta);
		$rta=$denuncia_publicacion->crear_denuncia_publicacion($_POST);
		var_dump($rta);
	}
	else{
		echo 0;
	}	
	
?>