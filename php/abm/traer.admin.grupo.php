<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases ******/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Multimedia.php');
	require_once('../clases/Grupo.php');
	
	if(isset($_SESSION['s_id'])){
		//Pido todo el contenido de grupo
		$grupo = new Grupo();
		$unGrupo=$grupo->getByPk($_POST["id"]);
		$arrayFinal=[];
		$array=[];
		$foto=null;
		//traer imagen de grupo
		if($unGrupo[0]->getFkMultimedia()!=null){
			$multimedia = new Multimedia();
			$multimedia=$multimedia->getByPk($unGrupo[0]->getFkMultimedia());
			if(count($multimedia)){
					$array=[
						"ID"=>$multimedia[0]->getCodigoMultimedia(),
						"PATH"=>$multimedia[0]->getPath()
					];
				$foto=$array;
			}
		}
		$array=[
			"ADMIN"=>$unGrupo[0]->getFkUsuario(),
			"FOTO"=>$foto,
		];
		$arrayFinal[]=$array;
		echo json_encode($arrayFinal);
	}
	else{
		echo 0; // no logueado
	}
?> 