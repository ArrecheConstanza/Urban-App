<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases ******/
	
	require_once('../config.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Usuario.php');
	require_once('../clases/Publicacion.php');
	$unaPublicacion=Publicacion::detalle($_POST[["ID"]]);
	$array=[
		"ID"=>$unaPublicacion->getCodigoPublicacion(),
		"TITULO"=>$unaPublicacion->getTitulo(),
		"DESCRIPCION"=>$unaPublicacion->getDescripcion(),
		"FECHA_CREACION"=>$unaPublicacion->getFechaCreacion(),
		"BORRADO"=>$unaPublicacion->getBorrado(),
		"FK_GRUPO"=>$unaPublicacion->getFkGrupo(),
		"FK_USUARIO"=>$unaPublicacion->getFkUsuario()
	];
	echo json_encode($array);
?> 