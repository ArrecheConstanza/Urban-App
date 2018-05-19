<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Publicacion_Comentario.php');
	require_once('../clases/Usuario.php');
	require_once('../clases/Multimedia.php');


	
	/****** Listar publicacion_comentario ******/
	
	if(isset($_SESSION["s_id"])&&isset($_POST["ID"])){
		$publicacion_comentario = new Publicacion_Comentario();
		$rta=$publicacion_comentario->listar_comentario_publicacion($_POST["ID"]);
		$arrayFinal=[];
		foreach($rta as $comentario_publicacion){
			
			//usuario creador
			$usuario=new Usuario();
			//usuario creador
			$usuario_nombre=$usuario->getNombreUsuario($comentario_publicacion->getFkUsuario());
			$usuario_apellido=$usuario->getApellidoUsuario($comentario_publicacion->getFkUsuario());
			
			//foto usuario
			$usuario_multimedia=[];
			if($usuario->getFkMultimediaUsuario($comentario_publicacion->getFkUsuario())["FKMULTIMEDIA"]!=null){
				$multimedia = new Multimedia();
				$foto_usuario=$multimedia->getByPk($usuario->getFkMultimediaUsuario($comentario_publicacion->getFkUsuario())["FKMULTIMEDIA"]);
					foreach($foto_usuario as $multi){
						$array=[
							"DIR"=>$multi->getPath()
						];
						$usuario_multimedia[]=$array;
					}
			}
			
			$fecha= publicaciones_parsear_fecha($comentario_publicacion->getFechaCreacion());
			$array=[
				"ID"=>$comentario_publicacion->getCodigoComentarioPublicacion(),
				"COMENTARIO"=>$comentario_publicacion->getComentario(),
				"BORRADO"=>$comentario_publicacion->getBorrado(),
				"FK_USUARIO"=>$comentario_publicacion->getFkUsuario(),
				"FK_PUBLIACION"=>$comentario_publicacion->getFkPublicacion(),
				"FECHA_CREACION"=>$fecha,
				"USUARIO_NOMBRE"=>$usuario_nombre["NOMBRE"],
				"USUARIO_APELLIDO"=>$usuario_apellido['APELLIDO'],
				"FOTO_USUARIO"=>$usuario_multimedia,
			];
			$arrayFinal[]=$array;
		}
		echo json_encode($arrayFinal);
	}
	else{
		echo 0;
	}	
	
?>