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
	
	/*$chat=new Chat();
	$chat=$chat->all($_POST["id"]);
	$arrayFinal=array();
	foreach($chat as $unChat){
		
		//Pido todo el contenido multimedia del chat
			$multimedia = new Multimedia();
			$multimedias = $multimedia->getByPk($unChat->getFkMultimedia());
			$arraySemiFinal=[];
			$array=[];
			foreach($multimedias as $multi){
				if($multi->getCodigoMultimedia()==$unChat->getFkMultimedia()){
					$multimedia = new Multimedia();
					$rta2=$multimedia->getByPk($multi->getCodigoMultimedia());
					foreach($rta2 as $multi){
						$array=[
							"ID"=>$unChat->getCodigoChat(),
							"TITULO"=>$unChat->getTitulo(),
							"ESTADO"=>$unChat->getEstado(),
							"BORRADO"=>$unChat->getBorrado(),
							"FECHA_CREACION"=>$unChat->getFechaCreacion(),
							"FKGRUPO"=>$unChat->getFkGrupo(),
							"FKUSUARIO"=>$unChat->getFkUsuario(),
							"FOTO"=>$multi->getPath()
						];
						$arrayFinal[]=$array;
					}
				}
			}	
	}
	echo json_encode($arrayFinal);*/
	var_dump($_POST);
	var_dump($_FILE);
?> 