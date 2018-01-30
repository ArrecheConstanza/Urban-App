<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Usuario.php');
	require_once('../clases/Validacion.php');
	
	/***** Validacion ******/
	
	$reglas = [
		'EMAIL' => 'required|email',
		'CLAVE' => 'required|clave',
		'NOMBRE' => 'required|nombre',
		'APELLIDO' => 'required|nombre',
		'EDAD' => 'required|date'
	];
	
	if(isset($_SESSION["s_id"])){
		$usuario = new Usuario();
		$user=$usuario->getByPk($_SESSION["s_id"]);
		//if($user["EMAIL"])
		
	}
	else{ //no logueado
		return 0;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
/* 
$validacion = new Validacion($_POST, $reglas);
$rta= json_encode($validacion->getErrores())."\n";

//si hay un error
if(count(json_decode($rta))){
	echo $rta;
}
 */
//sino guarda los datos en bdd
	
	/****** Edito el usuario ******/
	
	/* $fin=json_decode($usuario->editar_usuario($_POST),true);
	if($fin){
		/****** Logeo al usuario ******
		$fin2=json_decode($usuario->verificar_usuario($_POST["EMAIL"], $_POST["CLAVE"]),true);
		if(count($fin2)){
			foreach ($fin2 as $k => $v) {
				/***** Guardado de datos en SESSION ****
				switch($k){
					case "ID":
						$_SESSION['s_id'] = $v;
					break;
					case "NIVEL":
						$_SESSION['s_nivel'] = $v;
					break;
				}
			}
			echo json_encode($fin2);
		}
	} */

	
?>