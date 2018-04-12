<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Denuncia_Usuario.php');
	
	/****** Creo Denuncia_Usuario ******/
	
	if(isset($_SESSION["s_id"])){
		$Denuncia_Usuario = new Denuncia_Usuario();
		
		//FALTA VALIDACION DE DATOS 
		
		$_POST["FKUSUARIO"]= $_SESSION["s_id"];
		$rta=$Denuncia_Usuario->crear_denuncia_usuario($_POST);
		echo $rta;
	}
	else{
		echo 0;
	}	
	
?>