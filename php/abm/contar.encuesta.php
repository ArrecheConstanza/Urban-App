<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Respuesta.php');
	require_once('../clases/Multimedia.php');
	require_once('../clases/Usuario.php');
	require_once('../clases/Opciones.php');
	
	
	/****** Creo respuesta a encuesta ******/
	if(isset($_SESSION["s_id"])){
		$respuesta=new Respuesta();
		$respuesta=$respuesta->traer_respuesta_encuesta($_POST["id"]);
		$arrayFinal=[];
		$array=[];
		foreach($respuesta as $unaRespuesta){
			
			//opcion elegida
			$opciones=new Opciones();
			$opciones=$opciones->getByPk($unaRespuesta->getFkOpcion());

			//usuario creador
			$usuario=new Usuario();
			$usuario_nombre=$usuario->getNombreUsuario($unaRespuesta->getFkUsuario());
			$usuario_apellido=$usuario->getApellidoUsuario($unaRespuesta->getFkUsuario());
			//foto usuario
			$usuario_multimedia=[];
			if($usuario->getFkMultimediaUsuario($unaRespuesta->getFkUsuario())["FKMULTIMEDIA"]!=null){
				$multimedia = new Multimedia();
				$foto_usuario=$multimedia->getByPk($usuario->getFkMultimediaUsuario($unaRespuesta->getFkUsuario())["FKMULTIMEDIA"]);
					foreach($foto_usuario as $multi){
						$array=[
							"DIR"=>$multi->getPath()
						];
						$usuario_multimedia[]=$array;
					}
			}
			
			$array=[
				"FKOPCION"=>$unaRespuesta->getFkOpcion(),
				"FKENCUESTA"=>$unaRespuesta->getFkEncuesta(),
				"FKUSUARIO"=>$unaRespuesta->getFkusuario(),
				"FOTO_USUARIO"=>$usuario_multimedia,
				"USUARIO_NOMBRE"=>$usuario_nombre["NOMBRE"],
				"USUARIO_APELLIDO"=>$usuario_apellido['APELLIDO'],
				"OPCION"=>$opciones[0]->getRespuesta(),
			];
			$arrayFinal[]=$array; 
		}
		echo json_encode($arrayFinal); 
	}
	else{
		echo 0; //usuario no logeado
	}
	
?>