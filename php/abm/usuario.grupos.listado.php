<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases ******/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Usuario_Grupo.php');
	require_once('../clases/Grupo.php');
	
	$usuario_grupo= new Usuario_Grupo();
	$grupo_obj= new Grupo();
	$rta=$usuario_grupo->traer_grupos_usuario($_POST["id"]);
	$arrayFinal=array();
	foreach($rta as $grupo){
		$rta2=$grupo_obj->getByPk($grupo->getCodigoGrupo());
		foreach($rta2 as $ans){
			$array=[
				"ID"=>$ans->getCodigoGrupo(),
				"NOMBRE"=>$ans->getNombre(),
				"LONGITUD"=>$ans->getLongitud(),
				"LATITUD"=>$ans->getLatitud(),
				"ESTADO"=>$ans->getEstado(),
				"BORRADO"=>$ans->getBorrado(),
				"FKMULTIMEDIA"=>$ans->getFkMultimedia()
			];
		}
		$arrayFinal[]=$array;
	}
	echo json_encode($arrayFinal);
?> 