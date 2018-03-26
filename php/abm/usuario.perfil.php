<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases ******/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases//Publicacion.php');
	require_once('../clases//Categoria.php');
	require_once('../clases/Encuesta.php');
	require_once('../clases/Multimedia.php');
	require_once('../clases/Publicacion_Multimedia.php');
	
	if(isset($_SESSION["s_id"])){
		//traer publicaciones con multimedia realizadas por el usuario 
		$publicaciones_usuario = new Publicacion();
		$publicaciones_usuario=$publicaciones_usuario->all_usuario($_SESSION["s_id"]);
		$arrayFinal=[];
		$array=[];
		foreach($publicaciones_usuario as $unaPublicacion){
			//$fecha= publicaciones_parsear_fecha($unaPublicacion->getFechaCreacion());
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
				
			//Pido todo el contenido categoria de la publicacion
				$categoria = new Categoria();
				$rta2 = $categoria->getByPk($unaPublicacion->getFkCategoria());
			
			//
				$array=[
					"ID"=>$unaPublicacion->getCodigoPublicacion(),
					"TITULO"=>$unaPublicacion->getTitulo(),
					"DESCRIPCION"=>$unaPublicacion->getDescripcion(),
					"FECHA_CREACION"=>$unaPublicacion->getFechaCreacion(),
					"BORRADO"=>$unaPublicacion->getBorrado(),
					"FK_GRUPO"=>$unaPublicacion->getFkGrupo(),
					"FK_USUARIO"=>$unaPublicacion->getFkUsuario(),
					"FK_CATEGORIA"=>$unaPublicacion->getFkCategoria(),
					"FOTO"=>$arraySemiFinal,
					"CATEGORIA"=>$rta2[0]->getTitulo(),
				];
				$arrayFinal[]=$array;
		}
			echo json_encode($arrayFinal);

		
		//traer encuestas realizadas por el usuario
	}
	else{ //no logueado
		echo 0;
		return 0;
	}
?> 

