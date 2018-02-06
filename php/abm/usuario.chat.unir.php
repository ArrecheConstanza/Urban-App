<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases ******/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Chat_Grupo.php');
	
	if(isset($_POST["id_chat"])&&isset($_POST["id_grupo"])){
		$chat_usuario= new Chat_Grupo();
		echo $chat_usuario->crear_chat_grupo($_POST);
	}
	else{
		echo 0;
	}
?> 