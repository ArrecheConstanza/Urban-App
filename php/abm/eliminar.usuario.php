<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Usuario.php');
	
	if(isset($_SESSION['s_id'])){
		$usuario = new Usuario();
		$array=[];
		$array["BORRADO"]="Si";
		$array["ID"]=$_SESSION['s_id'];
		echo $usuario->eliminar_usuario($array);
		
	}
	
	/** No esta iniciada la sesion, cierro sesion **/
	else{
		require_once('../config.php');
		session_destroy();
		echo "1";
	}

	
?>