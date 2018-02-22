<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases ******/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	//require_once('../clases/Categoria.php');
	require_once('../clases/Usuario.php');
	require_once('../clases/Encuesta.php');
	require_once('../clases/Opciones.php');
	
	$encuesta=new Encuesta();
	$opciones=new Opciones();
	$usuario=new Usuario();
	$encuesta=$encuesta->detalle($_POST["id"]);
	//$arrayFinal=array();
	
	foreach($encuesta as $unaEncuesta){
		$fecha= publicaciones_parsear_fecha($unaEncuesta->getFechaCreacion());
		
		//opciones de la encuesta
		$opciones_de_encuesta=$opciones->opciones_de_encuesta($unaEncuesta->getCodigoEncuesta());
		$array_opciones=array();
		foreach($opciones_de_encuesta as $unaOpcion){
			$array0=[
				"ID"=>$unaOpcion->getCodigoOpcion(),
				"RESPUESTA"=>$unaOpcion->getRespuesta(),
				"FK_ENCUESTA"=>$unaOpcion->getFkEncuesta(),
			];
			$array_opciones[]=$array0;
		}
		
		//usuario creador
		$usuario_nombre=$usuario->getNombreUsuario($unaEncuesta->getFkUsuario());
		$usuario_apellido=$usuario->getApellidoUsuario($unaEncuesta->getFkUsuario());
		
		//Pido todo el contenido categoria de la encuesta
			/* $categoria = new Categoria();
			$rta2 = $categoria->getByPk($unaEncuesta->getFkCategoria()); */

			$array=[
				"ID"=>$unaEncuesta->getCodigoEncuesta(),
				"PREGUNTA"=>$unaEncuesta->getPregunta(),
				"FECHA_CREACION"=>$fecha,
				"USUARIO_NOMBRE"=>$usuario_nombre["NOMBRE"],
				"USUARIO_APELLIDO"=>$usuario_apellido['APELLIDO'],
				"FK_USUARIO"=>$unaEncuesta->getFkUsuario(),
				"FK_GRUPO"=>$unaEncuesta->getFkGrupo(),
				"BORRADO"=>$unaEncuesta->getBorrado(),
				"OPCIONES"=>$array_opciones
				//"FK_CATEGORIA"=>$unaEncuesta->getFkCategoria(),
				//"CATEGORIA"=>$rta2[0]->getTitulo(),
			];
			$arrayFinal[]=$array;
	}
	echo json_encode($arrayFinal); 
?>