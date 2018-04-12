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
		$arrayFinal=[];
		foreach ($_POST as $key => $value){
			if($key!="ID"){
				$array=[
					"VALOR" => $value,
					"ID" => $_POST["ID"],
				];
				$rta=$usuario->editar_usuario($key,$array);
				if(!$rta){ echo 0; } //error al editar
			}
		}
		echo 1;
	}
	else{ //no logueado
		echo 0;
	}
?>