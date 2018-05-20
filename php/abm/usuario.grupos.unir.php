<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases ******/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Usuario_Grupo.php');
	require_once('../clases/Grupo.php');
	
	if(isset($_POST["id_grupo"])&&isset($_SESSION["s_id"])){
		$grupo= new Grupo();
		$grupo= $grupo->getByPk($_POST["id_grupo"]);
		if($grupo[0]->getEstado()=="Privado"){ //es privado, enviar solicitud 
			echo "Privado";
		}
		else{ //creo grupo
			$_POST["id_usuario"]=$_SESSION["s_id"];
			$usuario_grupo= new Usuario_Grupo();
			echo $usuario_grupo->crear_usuario_grupo($_POST);
		}
	}
	else{
		echo 0; //no logueado
	}
?> 