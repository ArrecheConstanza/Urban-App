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
/*ID INT(9) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	EMAIL VARCHAR(50) NOT NULL UNIQUE,
	NOMBRE VARCHAR(45) NOT NULL,
	APELLIDO VARCHAR(45) NOT NULL,
	CLAVE VARCHAR(40) NOT NULL,
	EDAD DATE NOT NULL,
	LONGITUD DOUBLE(13,10) NOT NULL,
	LATITUD DOUBLE(13,10) NOT NULL,
	DIRECCION VARCHAR(255) NOT NULL,
	DIRECCION_ESTADO ENUM('Visible','Oculta') NOT NULL,
	FECHA_ALTA DATETIME NOT NULL,
	BANNEADO ENUM('Si','No') NOT NULL,
	NIVEL ENUM('Usuario','Admin') NOT NULL,
	BORRADO ENUM('Si','No') NOT NULL,
	FK_NEGOCIO_SERVICIO INT(9) UNSIGNED,
	FKMULTIMEDIA INT(9) UNSIGNED,
	*/
else{
	$mail = $_POST['EMAIL'];
	$contrasenia = $_POST['NOMBRE'];
	$contrasenia = $_POST['APELLIDO'];
	$contrasenia = $_POST['CLAVE'];
	$contrasenia = $_POST['EDAD'];
	$contrasenia = $_POST['LONGITUD'];
	$contrasenia = $_POST['LATITUD'];
	$contrasenia = $_POST['DIRECCION'];
	$contrasenia = time();
	$contrasenia = "Usuario";
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