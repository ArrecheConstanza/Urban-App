<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Respuesta.php');
	//require_once('../clases/Encuesta.php');
	//require_once('../clases/Opciones.php');
	
	
	/****** Creo respuesta a encuesta ******/
	if(isset($_SESSION["s_id"])){
		$respuesta=new Respuesta();
		$respuesta=$respuesta->traer_respuesta_encuesta($_POST["id"]);
		$arrayFinal=[];
		$array=[];
		foreach($respuesta as $unaRespuesta){
			$array=[
				"FKOPCION"=>$unaRespuesta->getFkOpcion(),
				"FKENCUESTA"=>$unaRespuesta->getFkEncuesta(),
				"FKUSUARIO"=>$unaRespuesta->getFkusuario()
			];
			$arrayFinal[]=$array; 
		}
		echo json_encode($arrayFinal); 
	}
	else{
		echo 0; //usuario no logeado
	}
	
?>