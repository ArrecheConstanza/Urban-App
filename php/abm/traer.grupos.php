<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases ******/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Multimedia.php');
	require_once('../clases/Grupo.php');

	//Pido todo el contenido de grupo
	$grupo = Grupo::all();
	$arrayFinal=[];
	$array=[];
	$foto=null;
	
	foreach($grupo as $unGrupo){
		
		//traer imagen de grupo
		if($unGrupo->getFkMultimedia()!=null){
			$multimedia = new Multimedia();
			$multimedia=$multimedia->getByPk($unGrupo->getFkMultimedia());
			if(count($multimedia)){
					$array=[
						"ID"=>$multimedia[0]->getCodigoMultimedia(),
						"PATH"=>$multimedia[0]->getPath()
					];
				$foto=$array;
			}
		}
			$array=[
				"ID"=>$unGrupo->getCodigoGrupo(),
					"NOMBRE"=>$unGrupo->getNombre(),
					"LONGITUD"=>$unGrupo->getLongitud(),
					"LATITUD"=>$unGrupo->getLatitud(),
					"ESTADO"=>$unGrupo->getEstado(),
					"BORRADO"=>$unGrupo->getBorrado(),
					"FKMULTIMEDIA"=>$unGrupo->getFkMultimedia(),
					"FOTO"=>$foto,
			];
			$arrayFinal[]=$array;
	}
	echo json_encode($arrayFinal);
?> 