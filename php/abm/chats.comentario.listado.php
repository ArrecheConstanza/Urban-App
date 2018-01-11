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
		$usuario=new Usuario();
		$user=$usuario->getByPk(intval($un_comentario_chat->getFkUsuario()));
		
			/*LOGICA DE	MULTIMEDIA PARA COMENTARIO CHAT 
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
			}*/
			//['COMENTARIO','FECHA_CREACION','BORRADO','FKUSUARIO','FKCHAT','FKMULTIMEDIA'];
			
			$array=[
				"ID"=>$un_comentario_chat->getCodigoComentarioChat(),
				"COMENTARIO"=>$un_comentario_chat->getComentario(),
				"FECHA_CREACION"=>$un_comentario_chat->getFechaCreacion(),
				"BORRADO"=>$un_comentario_chat->getBorrado(),
				"FKUSUARIO"=>$un_comentario_chat->getFkUsuario(),
				"FKCHAT"=>$un_comentario_chat->getFkChat(),
				"NOMBRE_USUARIO"=>$user["NOMBRE"]." ".$user['APELLIDO'],
				
				//"FOTO"=>$arraySemiFinal,
			];
			$arrayFinal[]=$array;  
	} 
	echo json_encode($arrayFinal);
?> 