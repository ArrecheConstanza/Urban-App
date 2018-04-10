<?php 
$cnx = mysqli_connect('localhost','root','','test');
$usuario = $_GET['u'];
$token = $_GET['token'];

$c = "SELECT CLAVE_NUEVA FROM pedidos WHERE EMAIL='$usuario' AND TOKEN='$token' LIMIT 1";
$f = mysqli_query($cnx, $c);
$a = mysqli_fetch_assoc($f);
//2 opciones, que $a tenga algo (existe ese usuario+token) o que sea NULL (alguno fallo)
if( !$a ){
	header("Location: recuperar_clave.php?error=algo fallo");
}else{
	$c2 = "UPDATE usuarios SET CLAVE='$a[CLAVE_NUEVA]' WHERE EMAIL='$usuario' LIMIT 1";
	mysqli_query($cnx, $c2);
	$c3 = "DELETE FROM pedidos WHERE EMAIL='$usuario' LIMIT 1";
	mysqli_query($cnx, $c3);
	header("Location: login.php?msg=Ya te podes loguear");
	
}


?>


