<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases ******/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Usuario_Activo_Alarma.php');
	
	//Pido todo el contenido de Usuario_Activo_Alarma
	$usurio_alarma = Usuario_Activo_Alarma::all();
	$arrayFinal=[];
	$array=[];
	foreach($usurio_alarma as $unaAlarma){
			$array=[
				/* "ID"=>$unaAlarma->getCodigoUsuarioActivoAlarma(),
				"CUANDO"=>$unaAlarma->getCuando(),
				"LONGITUD"=>$unaAlarma->getLongitud(),
				"LATITUD"=>$unaAlarma->getLatitud(),
				"FKUSUARIO"=>$unaAlarma->getFkUsuario(), */
				"FKALARMA"=>$unaAlarma->getFkAlarma(),
			];
		$arrayFinal[]=$array;
	}
	echo json_encode($arrayFinal);
?> 