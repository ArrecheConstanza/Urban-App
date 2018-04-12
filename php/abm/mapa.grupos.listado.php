<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases ******/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Grupo.php');
	require_once('../clases/Usuario.php');
	require_once('../clases/Multimedia.php');
	require_once('../clases/Usuario_Grupo.php');

	//Pido todo el contenido de usuario
	/*$usuario_grupo = new Usuario_Grupo();
	$usuario_grupo = $usuario_grupo->traer_usuarios_grupo($_POST["id"]);
	$arrayFinal=[];
	$array=[];
	//traer cada usuario
	for($i=0;$i<count($usuario_grupo);$i++){
		$unUsuario= new Usuario();
		$unUsuario=$unUsuario->getByPk($usuario_grupo[$i]->getCodigoUsuario());
		if($unUsuario["FKMULTIMEDIA"]!=null){
			$multimedia = new Multimedia();
			$multimedia=$multimedia->getByPk($unUsuario["FKMULTIMEDIA"]);
					$array=[
						"ID"=>$multimedia[0]->getCodigoMultimedia(),
						"PATH"=>$multimedia[0]->getPath()
					];
			$foto=$array;
		}
		else{
			$foto=null;
		} 
		$unUsuario["FOTO"]=$foto;
		$arrayFinal[]=$unUsuario;
	}
	echo json_encode($arrayFinal);*/
	
	
	
	if(isset($_SESSION["s_id"])){
		if(isset($_POST["mapa"])){
			$grupo=Grupo::all();
			$arrayFinal=array();
			
			foreach($grupo as $unGrupo){
				if($unGrupo->getBorrado()=="No"){ //saco los borrados
					$usuario_grupo = new Usuario_Grupo();
					$usuario_grupo = $usuario_grupo->traer_usuarios_grupo($unGrupo->getCodigoGrupo());
					//traigo usuarios por grupo
					$array=[
						"ID"=>$unGrupo->getCodigoGrupo(),
						"NOMBRE"=>$unGrupo->getNombre(),
						"LONGITUD"=>$unGrupo->getLongitud(),
						"LATITUD"=>$unGrupo->getLatitud(),
						"ESTADO"=>$unGrupo->getEstado(),
						"BORRADO"=>$unGrupo->getBorrado(),
						"FKMULTIMEDIA"=>$unGrupo->getFkMultimedia(),
						"CANTIDAD_USUARIOS"=>count($usuario_grupo)
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

