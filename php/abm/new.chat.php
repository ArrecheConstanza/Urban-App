<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Chat.php');
	
	//FALTA validacion de datos por POST
	
	/****** Creo chat ******/
	
	if(isset($_SESSION["s_id"])){
		$chat = new Chat();
		$fin=$chat->crear_chat($_POST);
		if($fin){
			$chat=Chat::ultimo_chat_creado(); 
			return $chat[0]->getCodigoChat();
		}
		else{ //no se pudo crear chat
			return 0;
		}

	}
	else{ //no logueado
		return 0;
	}