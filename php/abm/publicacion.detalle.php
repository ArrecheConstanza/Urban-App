<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases ******/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Usuario.php');
	require_once('../clases/Publicacion.php');
	require_once('../clases/Denuncia_Publicacion.php');
	require_once('../clases/Multimedia.php');
	require_once('../clases/Publicacion_Multimedia.php');

	if(isset($_SESSION["s_id"])){
		
		$publicacion=Publicacion::all();
		$arrayFinal=array();
		foreach($publicacion as $unaPublicacion){
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
				
			if($unaPublicacion->getCodigoPublicacion()==$_POST['ID']){
				$arrayFinalDenuncias=array();
				//Si es admin traer listado de denuncias de publicacion
					if(isset($_SESSION["s_nivel"])&&$_SESSION["s_nivel"]=="Admin"){
						$denuncia_publiacion= new Denuncia_Publicacion();
						$denuncias=$denuncia_publiacion->all($unaPublicacion->getCodigoPublicacion());
						foreach($denuncias as $unaDenuncia){
							$arrayDenuncia=[
								"ID"=>$unaDenuncia->getCodigoDenunciaPublicacion(),
								"FKUSUARIO"=>$unaDenuncia->getFkUsuario(),
								"FKPUBLICACION"=>$unaDenuncia->getFkPublicacion(),
								"DESCRIPCION"=>$unaDenuncia->getDescripcion()
							];
							$arrayFinalDenuncias[]=$arrayDenuncia;
						}
						
					}
				//
				$fecha= publicaciones_parsear_fecha($unaPublicacion->getFechaCreacion());
				$array=[
					"ID"=>$unaPublicacion->getCodigoPublicacion(),
					"TITULO"=>$unaPublicacion->getTitulo(),
					"DESCRIPCION"=>$unaPublicacion->getDescripcion(),
					"FECHA_CREACION"=>$fecha,
					"BORRADO"=>$unaPublicacion->getBorrado(),
					"FK_GRUPO"=>$unaPublicacion->getFkGrupo(),
					"FK_USUARIO"=>$unaPublicacion->getFkUsuario(),
					"FK_CATEGORIA"=>$unaPublicacion->getFkCategoria(),
					"FOTO"=>$arraySemiFinal,
					"DENUNCIAS"=>$arrayFinalDenuncias
				];
				$arrayFinal[]=$array;
			}
		}
		echo json_encode($arrayFinal);
	}
	else{
		echo 0; //no logueado
	}
?> 