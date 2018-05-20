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
	require_once('../clases/Publicacion_Like.php');

	if(isset($_SESSION["s_id"])){
		$publicacion = new Publicacion();
		$unaPublicacion=$publicacion->getByPk($_POST["ID"])[0];
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
			}
				
			//usuario creador
			$usuario=new Usuario();
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
			
			//traigo likes
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
					"USUARIO_NOMBRE"=>$usuario_nombre["NOMBRE"],
					"USUARIO_APELLIDO"=>$usuario_apellido['APELLIDO'],
					"DENUNCIAS"=>$arrayFinalDenuncias,
					"LIKES"=>$listado_likes,
					"USUARIO_ID"=>$_SESSION["s_id"],
				];
				$arrayFinal[]=$array;
		echo json_encode($arrayFinal);
	}
	else{
		echo 0; //no logueado
	}
?> 