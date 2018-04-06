<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases ******/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Grupo.php');
	require_once('../clases/Multimedia.php');
	
	$grupo = new Grupo();
	$arrayFinal = array();
	$grupo=$grupo->getByPk($_POST["id"]);
		if($grupo[0]->getFkMultimedia()!=null){
			$multimedia = new Multimedia();
			$multimedia=$multimedia->getByPk($grupo[0]->getFkMultimedia());
			$array_foto=[
				"ID"=>$multimedia[0]->getCodigoMultimedia(),
				"PATH"=>$multimedia[0]->getPath()
			];
		}
		else{
			$array_foto=null;
		}
	$array=[
			"ID"=>$grupo[0]->getCodigoGrupo(),
			"NOMBRE"=>$grupo[0]->getNombre(),
			"LONGITUD"=>$grupo[0]->getLongitud(),
			"LATITUD"=>$grupo[0]->getLatitud(),
			"ESTADO"=>$grupo[0]->getEstado(),
			"BORRADO"=>$grupo[0]->getBorrado(),
			"FKMULTIMEDIA"=>$grupo[0]->getFkMultimedia(),
			"FOTO" => $array_foto
		];
		$arrayFinal[]=$array; 
	
	echo json_encode($arrayFinal);
?>