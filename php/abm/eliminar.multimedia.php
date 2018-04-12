<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Multimedia.php');
	
	if(isset($_SESSION['s_id'])){
		$Multimedia = new Multimedia();
		echo $Multimedia->eliminar_multimedia($_POST);
	}
	
	/** No esta iniciada la sesion, cierro sesion **/
	else{
		/* require_once('../config.php');
		session_destroy(); */
		echo "0";
	}

	
?>