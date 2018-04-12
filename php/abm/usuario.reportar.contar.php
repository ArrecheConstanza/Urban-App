<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Denuncia_Usuario.php');
	
	/****** ******/
	
	if(isset($_SESSION["s_id"])){
		$Denuncia_Usuario = new Denuncia_Usuario();
		
		//FALTA VALIDACION DE DATOS 
		$rta=$Denuncia_Usuario->contar_denuncias($_POST["FKUSUARIO_DENUNCIADO"]);
		echo $rta;
	}
	else{
		echo 0;
	}	
	
?>