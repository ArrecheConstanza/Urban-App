<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Grupo.php');
	
	// falta validar datos
	
	if(isset($_SESSION["s_id"])){
		$grupo = new Grupo();
		$arrayFinal=[];
		foreach ($_POST as $key => $value){
			if($key!="ID"){
				$array=[
					"VALOR" => $value,
					"ID" => $_POST["ID"],
				];
				$rta=$grupo->editar_grupo($key,$array);
				if(!$rta){ return 0; } //error al editar
			}
		}
		return 1;
	}
	else{ //no logueado
		return 0;
	}
?>