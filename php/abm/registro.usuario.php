<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Usuario.php');
	require_once('../clases/Validacion.php');
	
	/***** Validacion ******/
	
	$reglas = [
		'EMAIL' => 'required|email',
		'CLAVE' => 'required|clave'
	];

$validacion = new Validacion($_POST, $reglas);
$rta= json_encode($validacion->getErrores())."\n";
if(count(json_decode($rta))){
	echo $rta;
}
else{
	$mail = $_POST['EMAIL'];
	$contrasenia = $_POST['CLAVE'];
	$contrasenia = $_POST['NOMBRE'];
	$contrasenia = $_POST['APELLIDO'];
	$contrasenia = $_POST['DIRECCION'];
	$usuario = new Usuario();
	/****** Verificacion de usuario existente ******/
	$fin=json_decode($usuario->verificar_usuario($mail, $contrasenia),true);
	if(count($fin)){
		foreach ($fin as $k => $v) {
			/***** Guardado de datos en SESSION *******/
			switch($k){
				case "ID":
					$_SESSION['s_id'] = $v;
				break;
				case "NIVEL":
					$_SESSION['s_nivel'] = $v;
				break;
			}
		}
		echo json_encode($fin);
	}
	else{
		echo "Usuario no existente";
	}
}
?>