<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases ******/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Usuario_Grupo.php');
	
	$usuario_grupo= new Usuario_Grupo();
	$rta=$usuario_grupo->traer_grupos_usuario($_POST["id"]);
	$arrayFinal=array();
	foreach($rta as $grupo){
		$array=[
			"FKGRUPO"=>$unaPublicacion->getCodigoPublicacion()
		];
		$arrayFinal[]=$array;
	}
	echo json_encode($arrayFinal);
?> 