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
			foreach($grupo as $unGrupo){
		
		//traer imagen de grupo
		if($unGrupo->getFkMultimedia()!=null){
			$multimedia = new Multimedia();
			$multimedia=$multimedia->getByPk($unGrupo->getFkMultimedia());
			//foreach($multimedia as $unaMultimedia){
					$array=[
						"ID"=>$multimedia[0]->getCodigoMultimedia(),
						"PATH"=>$multimedia[0]->getPath()
					];
		//	}
			$foto=$array;
		}
		else{
			$foto=null;
		}
		/*$grupo=Grupo::all();
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
			return 0;*/
		
		
		
		//
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