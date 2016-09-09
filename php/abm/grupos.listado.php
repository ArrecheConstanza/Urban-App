<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases ******/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Grupo.php');
	
	$grupo=Grupo::all();
	$arrayFinal=array();
	
	foreach($grupo as $unGrupo){
		$array=[
			"ID"=>$unGrupo->getCodigoGrupo(),
			"NOMBRE"=>$unGrupo->getNombre(),
			"LONGITUD"=>$unGrupo->getLongitud(),
			"LATITUD"=>$unGrupo->getLatitud(),
			"ESTADO"=>$unGrupo->getEstado(),
			"BORRADO"=>$unGrupo->getBorrado(),
			"FKMULTIMEDIA"=>$unGrupo->getFkMultimedia()
		];
		$arrayFinal[]=$array;
	}
	echo json_encode($arrayFinal);
?> 

