<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases ******/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Usuario.php');
	require_once('../clases/Multimedia.php');
	
	$usuario = new Usuario();
	$arrayFinal = array();
	$unUsuario=$usuario->getByPk($_POST["id"]);

		if($unUsuario["FKMULTIMEDIA"]!=null){
			$multimedia = new Multimedia();
			$multimedia=$multimedia->getByPk($unUsuario["FKMULTIMEDIA"]);
					$array=[
						"ID"=>$multimedia[0]->getCodigoMultimedia(),
						"PATH"=>$multimedia[0]->getPath()
					];
			$unUsuario["FOTO"]=$array;
		}
		else{
			$unUsuario["FOTO"]=null;
		}
		echo json_encode($unUsuario);
		
?>