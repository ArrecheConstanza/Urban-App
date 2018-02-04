<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Usuario.php');
	require_once('../clases/Validacion.php');
	
	/***** Validacion ******/
	
	$reglas = [
		'EMAIL' => 'required|email',
		'CLAVE' => 'required|clave',
		'NOMBRE' => 'required|nombre',
		'APELLIDO' => 'required|nombre',
		'EDAD' => 'required|date'
	];
	
	
	// falta validar datos
	
	if(isset($_SESSION["s_id"])){
		$usuario = new Usuario();
		$datos = $usuario->getByPk($_SESSION["s_id"]);
		
		$datos["CLAVE"]="";
		$datos["EDAD"]=edad($datos["EDAD"]);
		echo json_encode($datos);
	}
	else{ //no logueado
		return 0;
	}
	

?>