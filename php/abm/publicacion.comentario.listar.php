<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Publicacion_Comentario.php');
	
	/****** Listar publicacion_comentario ******/
	
	if(isset($_SESSION["s_id"])&&isset($_POST["ID"])){
		$publicacion_comentario = new Publicacion_Comentario();
		$rta=$publicacion_comentario->listar_comentario_publicacion($_POST["ID"]);
		$arrayFinal=[];
		foreach($rta as $comentario_publicacion){
			$fecha= publicaciones_parsear_fecha($comentario_publicacion->getFechaCreacion());
			$array=[
				"ID"=>$comentario_publicacion->getCodigoComentarioPublicacion(),
				"COMENTARIO"=>$comentario_publicacion->getComentario(),
				"BORRADO"=>$comentario_publicacion->getBorrado(),
				"FK_USUARIO"=>$comentario_publicacion->getFkUsuario(),
				"FK_PUBLIACION"=>$comentario_publicacion->getFkPublicacion(),
				"FECHA_CREACION"=>$fecha
			];
			$arrayFinal[]=$array;
		}
		echo json_encode($arrayFinal);
	}
	else{
		echo 0;
	}	
	
?>