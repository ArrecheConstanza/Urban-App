<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases ******/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Usuario.php');
	require_once('../clases/Encuesta.php');

	//Pido todo el contenido de la encuesta
	$encuesta = Encuesta::all();
	$usuario=new Usuario();
	$arrayFinal=[];
	$array=[];
	foreach($encuesta as $unaEncuesta){

		//usuario creador
		$usuario_nombre=$usuario->getNombreUsuario($unaEncuesta->getFkUsuario());
		$usuario_apellido=$usuario->getApellidoUsuario($unaEncuesta->getFkUsuario());
		$fecha= publicaciones_parsear_fecha($unaEncuesta->getFechaCreacion());

			$array=[
				"ID"=>$unaEncuesta->getCodigoEncuesta(),
				"PREGUNTA"=>$unaEncuesta->getPregunta(),
				"FECHA_CREACION"=>$fecha,
				"BORRADO"=>$unaEncuesta->getBorrado(),
				"FK_GRUPO"=>$unaEncuesta->getFkGrupo(),
				"USUARIO_NOMBRE"=>$usuario_nombre["NOMBRE"],
				"USUARIO_APELLIDO"=>$usuario_apellido['APELLIDO'],
				"FK_USUARIO"=>$unaEncuesta->getFkUsuario(),
			];
		$arrayFinal[]=$array;
	}
	echo json_encode($arrayFinal);
?> 