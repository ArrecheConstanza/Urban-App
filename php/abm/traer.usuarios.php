<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases ******/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Multimedia.php');
	require_once('../clases/Usuario.php');

	//Pido todo el contenido de usuario
	$usuario = Usuario::all();
	$arrayFinal=[];
	$array=[];
	foreach($usuario as $unUsuario){
		
		//traer imagen de usuario
		if($unUsuario->getFkMultimedia()!=null){
			$multimedia = new Multimedia();
			$multimedia=$multimedia->getByPk($unUsuario->getFkMultimedia());
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
		
		
		
		
		//
			$array=[
				"ID"=>$unUsuario->getCodigoUsuario(),
				"EMAIL"=>$unUsuario->getEmail(),
				"NOMBRE"=>$unUsuario->getNombre(),
				"APELLIDO"=>$unUsuario->getApellido(),
				"CLAVE"=>$unUsuario->getClave(),
				"EDAD"=>$unUsuario->getEdad(),
				"LONGITUD"=>$unUsuario->getLongitud(),
				"LATITUD"=>$unUsuario->getLatitud(),
				"DIRECCION"=>$unUsuario->getDireccion(),
				"DIRECCION_ESTADO"=>$unUsuario->getDireccionEstado(),
				"NIVEL"=>$unUsuario->getNivel(),
				"BORRADO"=>$unUsuario->getBorrado(),
				"BANNEADO"=>$unUsuario->getBanneado(),
				"FK_MULTIMEDIA"=>$unUsuario->getFkMultimedia(),
				"FECHA_ALTA"=>$unUsuario->getFechaAlta(),
				"FOTO"=>$foto,
			];
		$arrayFinal[]=$array;
	}
	echo json_encode($arrayFinal);
?> 