<?php 
//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Usuario.php');
	require_once('../clases/Pedidos.php');
	require_once('../clases/Validacion.php');
	
	/********************/
	
	//falta validacion de mail 
	
	if(isset($_POST['EMAIL'])){
		$usuario = new Usuario();
		$usuario = $usuario->verificar_usuario_recuperar_clave($_POST['EMAIL']);

		if(count($usuario)){
			$usuario=json_decode($usuario, true);
			$_POST['NUEVA_CLAVE'] = rand( 111111, 999999 );
			$_POST['TOKEN'] = md5( rand( 0 , 100000) );
			$pedido = new Pedidos();
			$pedido=$pedido->crear_pedido($_POST);
			$vinculo_recuperar = "http://localhost/urban-app/recuperar_clave/confirmar_clave.php?u=$_POST[EMAIL]&token=$_POST[TOKEN]";
			$headers = "MIME-Version: 1.0\r\n";
			$headers .="Content-type: text/html; charst=iso-8859-1\r\n";
			$headers .="To : <$usuario[EMAIL]> \r\n";
			$headers .="From: Urban-App <urbanaplicacion@gmail.com> \r\n";
			$asunto="Recuperar Clave";
$mensaje = <<<MAIL
Hola, $usuario[NOMBRE]!<br />
Pediste una clave nueva en Urban-App, tu contraseña temporal es: $_POST[NUEVA_CLAVE] .<br />
Confirmala haciendo click en este link: <a href='$vinculo_recuperar' target="_blank">Cambiar Clave</a><br />
<small>Si no podes hacerle click al link, copia y pega esto $vinculo_recuperar</small><br />
Si no pediste esta clave, desestima este mail.
Saludos,
Equipo Urban!
MAIL;
			mail($usuario['EMAIL'],$asunto,$mensaje,$headers);
			echo $mensaje; //ok
		}
		else{
			echo "usuario inexistente";
		}
	}
	else{
		echo 0; //sin datos
	}
?>