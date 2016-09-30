<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases ******/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Grupo.php');
	require_once('../clases/Usuario_Grupo.php');
	
	if(!isset($_POST)){
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
	}
	else{
		$usuario_grupo=new Usuario_Grupo();
		$usuario_grupo=$usuario_grupo->traer_grupos_usuario($_SESSION["s_id"]);
		$arrayFinal=array();
		/*$todos=[
			"ID"=>"0",
			"NOMBRE"=>"Todos",
		];
		$arrayFinal[]=$todos;*/
		$ans=array();
		$arraySemiFinal=array();
		foreach($usuario_grupo as $elgrupo){
			$grupo=new Grupo();
			$ans[]=$grupo->getByPk($elgrupo->getCodigoGrupo());
		}
		foreach($ans as $unGrupo){
			$array=[
				"ID"=>$unGrupo[0]->getCodigoGrupo(),
				"NOMBRE"=>$unGrupo[0]->getNombre(),
				"LONGITUD"=>$unGrupo[0]->getLongitud(),
				"LATITUD"=>$unGrupo[0]->getLatitud(),
				"ESTADO"=>$unGrupo[0]->getEstado(),
				"BORRADO"=>$unGrupo[0]->getBorrado(),
				"FKMULTIMEDIA"=>$unGrupo[0]->getFkMultimedia()
			];
			$arrayFinal[]=$array;
		}
		echo json_encode($arrayFinal);
	}
?> 

