<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases ******/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Usuario.php');
	require_once('../clases/Chat.php');
	require_once('../clases/Comentario_Chat.php');
	require_once('../clases/Multimedia.php');
	//require_once('../clases/Publicacion_Multimedia.php');
	
	$comentario_chat=new Comentario_Chat();
	$comentario_chat=$comentario_chat->listado_comentarios($_POST["id_chat"]);
	$arrayFinal=array();
	
	foreach($comentario_chat as $un_comentario_chat){
		$foto="";
		
		//creo clase usuario
		$usuario=new Usuario();
		$user=$usuario->getByPk(intval($un_comentario_chat->getFkUsuario()));
		
		//si hay foto
		if(is_numeric($un_comentario_chat->getFkMultimedia())){
			$multimedia = new Multimedia();
			$rta = $multimedia->getByPk($un_comentario_chat->getFkMultimedia());
			$foto=$rta[0]->getPath();
		}
		
		//cargo datos
		$array=[
			"ID"=>$un_comentario_chat->getCodigoComentarioChat(),
			"COMENTARIO"=>$un_comentario_chat->getComentario(),
			"COMENTARIO_ID"=>$un_comentario_chat->getComentario_id(),
			"FECHA_CREACION"=>$un_comentario_chat->getFechaCreacion(),
			"BORRADO"=>$un_comentario_chat->getBorrado(),
			"FKUSUARIO"=>$un_comentario_chat->getFkUsuario(),
			"FKCHAT"=>$un_comentario_chat->getFkChat(),
			"NOMBRE_USUARIO"=>$user["NOMBRE"]." ".$user['APELLIDO'],
			"FOTO"=>$foto,
		];
		$arrayFinal[]=$array;  
	} 
	echo json_encode($arrayFinal);
?> 