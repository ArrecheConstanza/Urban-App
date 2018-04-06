<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases ******/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Grupo.php');
	require_once('../clases/Usuario_Grupo.php');
	
	if(isset($_SESSION["s_id"])){
		if(isset($_POST["mapa"])){
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
			$ans=array();
			$arraySemiFinal=array();
			foreach($usuario_grupo as $elgrupo){
					$grupo=new Grupo();
					$ans[]=$grupo->getByPk($elgrupo->getCodigoGrupo());
			}
			foreach($ans as $unGrupo){
				if($unGrupo[0]->getBorrado()=="No"){ //saco los borrados
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
			}
			echo json_encode($arrayFinal);
		}
	}
	else{ //no logueado
		echo 0;
	}
?> 

