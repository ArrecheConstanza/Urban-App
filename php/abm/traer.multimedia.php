<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases ******/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Multimedia.php');
	
	//Pido todo el contenido multimedia
	$multimedia = Multimedia::all();
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
?> 