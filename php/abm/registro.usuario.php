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

$validacion = new Validacion($_POST, $reglas);
$rta= json_encode($validacion->getErrores())."\n";

//si hay un error
if(count(json_decode($rta))){
	echo $rta;
}

//sino guarda los datos en bdd
else{
	/****** Creo el usuario ******/
	$usuario = new Usuario();
	$_POST["FECHA_ALTA"]=getDatetimeNow();
	$fin=json_decode($usuario->crear_usuario($_POST),true);
	if($fin){
		
		/****** modo admin crea usuario *****/
		if(isset($_POST["Admin"])){
			echo "ok";
		}
		else{
			/****** Logeo al usuario ******/
			$fin2=json_decode($usuario->verificar_usuario($_POST["EMAIL"], $_POST["CLAVE"]),true);
			if(count($fin2)){
				foreach ($fin2 as $k => $v) {
					/***** Guardado de datos en SESSION ****/
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
		}
	}
}
	
?>