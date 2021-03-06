<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases ******/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Usuario.php');
	require_once('../clases/Categoria.php');
	require_once('../clases/Publicacion.php');
	require_once('../clases/Multimedia.php');
	require_once('../clases/Publicacion_Multimedia.php');
	require_once('../clases/Publicacion_Comentario.php');
	require_once('../clases/Publicacion_Like.php');
	
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
			
		//Pido todo el contenido categoria de la publicacion
			$categoria = new Categoria();
			$rta2 = $categoria->getByPk($unaPublicacion->getFkCategoria());
			//usuario creador
			$usuario=new Usuario();
			//usuario creador
			$usuario_nombre=$usuario->getNombreUsuario($unaPublicacion->getFkUsuario());
			$usuario_apellido=$usuario->getApellidoUsuario($unaPublicacion->getFkUsuario());
			
			//foto usuario
			$usuario_multimedia=[];
			if($usuario->getFkMultimediaUsuario($unaPublicacion->getFkUsuario())["FKMULTIMEDIA"]!=null){
				$multimedia = new Multimedia();
				$foto_usuario=$multimedia->getByPk($usuario->getFkMultimediaUsuario($unaPublicacion->getFkUsuario())["FKMULTIMEDIA"]);
					foreach($foto_usuario as $multi){
						$array=[
							"DIR"=>$multi->getPath()
						];
						$usuario_multimedia[]=$array;
					}
			}
			
			//traigo cantidad de likes
			$publicacion_like = new Publicacion_Like();
			$likes = $publicacion_like->all_likes($unaPublicacion->getCodigoPublicacion());
			$listado_likes=[];
			foreach($likes as $like){
					$array=[
						"ID"=>$like->getCodigoPublicacionLike(),
						"BORRADO"=>$like->getBorrado(),
						"FK_USUARIO"=>$like->getFkUsuario(),
						"FK_PUBLICACION"=>$like->getFkPublicacion()
					];
					$listado_likes[]=$array;
			}
						
			//traigo cantidad de comentarios
			$publicacion_comentario = new Publicacion_Comentario();
			$comentarios = $publicacion_comentario->listar_comentario_publicacion($unaPublicacion->getCodigoPublicacion());
			$listado_comentarios=[];
			foreach($comentarios as $comentario){
					$array=[
						"ID"=>$comentario->getCodigoComentarioPublicacion()
					];
					$listado_comentarios[]=$array;
			}
			
		//
			$array=[
				"ID"=>$unaPublicacion->getCodigoPublicacion(),
				"TITULO"=>$unaPublicacion->getTitulo(),
				"DESCRIPCION"=>$unaPublicacion->getDescripcion(),
				"FECHA_CREACION"=>$fecha,
				"BORRADO"=>$unaPublicacion->getBorrado(),
				"FK_GRUPO"=>$unaPublicacion->getFkGrupo(),
				"FK_USUARIO"=>$unaPublicacion->getFkUsuario(),
				"FK_CATEGORIA"=>$unaPublicacion->getFkCategoria(),
				"USUARIO_NOMBRE"=>$usuario_nombre["NOMBRE"],
				"USUARIO_APELLIDO"=>$usuario_apellido['APELLIDO'],
				"FOTO"=>$arraySemiFinal,
				"FOTO_USUARIO"=>$usuario_multimedia,
				"LIKES"=>$listado_likes,
				"COMENTARIOS"=>$listado_comentarios,
				"CATEGORIA"=>$rta2[0]->getTitulo(),
				"USUARIO_ID"=>$_SESSION["s_id"]
			];
			$arrayFinal[]=$array;
	}
	echo json_encode($arrayFinal);
?> 