<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases ******/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Multimedia.php');
	
	if(isset($_SESSION["s_id"])){
		//Pido todo el contenido multimedia
		$multimedia = new Multimedia();
		$multimedia=$multimedia->getByPk($_POST["fkmultimedia"]);
		$arrayFinal=[];
		$array=[];
		foreach($multimedia as $unaMultimedia){
				$array=[
					"ID"=>$unaMultimedia->getCodigoMultimedia(),
					"PATH"=>$unaMultimedia->getPath()
				];
			$arrayFinal[]=$array;
		}
		echo json_encode($arrayFinal); 
	}
	else{
		echo 0;//no logueado
	}
?> 