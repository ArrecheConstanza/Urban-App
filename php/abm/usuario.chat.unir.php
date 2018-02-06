<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases ******/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Chat_Usuario.php');
	
	if(isset($_POST["id_chat"])){
		$_POST["id_usuario"]=$_SESSION["s_id"];
		$chat_usuario= new Chat_Usuario();
		echo $chat_usuario->crear_chat_usuario($_POST);
	}
	else{
		echo 0;
	}
?> 