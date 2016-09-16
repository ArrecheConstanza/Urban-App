<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases ******/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Usuario.php');
	require_once('../clases/Publicacion.php');
	require_once('../clases/Multimedia.php');
	require_once('../clases/Publicacion_Multimedia.php');
	
	$publicacion=new Publicacion();
	$publicacion=$publicacion->all_grupo($_POST["id"]);
	$arrayFinal=array();
	foreach($publicacion as $unaPublicacion){
		$fecha= publicaciones_parsear_fecha($unaPublicacion->getFechaCreacion());
		
		//Pido todo el contenido multimedia de la publicacion
			$publicacion_multimedia = new Publicacion_Multimedia();
			$rta = $publicacion_multimedia->traer_publicacion_multimedia($unaPublicacion->getCodigoPublicacion());
			$arraySemiFinal=[];
			$array=[];
			foreach($rta as $multi_publi){
				if($multi_publi->getCodigoPublicacion()==$unaPublicacion->getCodigoPublicacion()){
					$multimedia = new Multimedia();
					$rta2=$multimedia->getByPk($multi_publi->getCodigoMultimedia());
					foreach($rta2 as $multi){
						$array=[
							"DIR"=>$multi->getPath()
						];
						$arraySemiFinal[]=$array;
					}
				}
			}
			$array=[
				"ID"=>$unaPublicacion->getCodigoPublicacion(),
				"TITULO"=>$unaPublicacion->getTitulo(),
				"DESCRIPCION"=>$unaPublicacion->getDescripcion(),
				"FECHA_CREACION"=>$fecha,
				"BORRADO"=>$unaPublicacion->getBorrado(),
				"FK_GRUPO"=>$unaPublicacion->getFkGrupo(),
				"FK_USUARIO"=>$unaPublicacion->getFkUsuario(),
				"FOTO"=>$arraySemiFinal,
			];
			$arrayFinal[]=$array;
	}
	echo json_encode($arrayFinal);
?> 