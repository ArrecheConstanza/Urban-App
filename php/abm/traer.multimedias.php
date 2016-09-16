<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases ******/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Multimedia.php');
	require_once('../clases/Publicacion_Multimedia.php');
	
	if(isset($_POST["id"])){
		//Pido todo el contenido multimedia de la publicacion
		$publicacion_multimedia = new Publicacion_Multimedia();
		$rta = $publicacion_multimedia->traer_publicacion_multimedia($_POST["id"]);
		$arrayFinal=[];
		$array=[];
		foreach($rta as $multi_publi){
			if($multi_publi->getCodigoPublicacion()==$_POST["id"]){
				$multimedia = new Multimedia();
				$rta2=$multimedia->getByPk($multi_publi->getCodigoMultimedia());
				foreach($rta2 as $multi){
					$array=[
						"ID"=>$multi->getCodigoMultimedia(),
						"DIR"=>$multi->getPath(),
						"BORRADO"=>$multi->getBorrado(),
						"FKPUBLICACION"=>$_POST["id"]
					];
					$arrayFinal[]=$array;
				}
			}
		}
		echo json_encode($arrayFinal);
	}
	else{
		echo 0;
	}
?> 