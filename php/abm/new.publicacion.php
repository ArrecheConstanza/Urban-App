<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Publicacion.php');
	
// 	si hay fotos

	$_POST['GRUPO']="uno"; //<- forzar que el grupo sea uno.
	
	$carpeta=$_POST['GRUPO'].time().rand();
	if(!empty($_FILES)&&$_FILES['FOTO']['name']){
		$foto = $_FILES['FOTO']['name'];
		
		//rever el guardado de la foto en publicaciones/grupo, el grupo puede coincidir. 1ro programar la parte de los grupos 
		if(!is_dir("../../img/publicaciones/".$_POST['GRUPO'])){
			mkdir("../../img/publicaciones/".$_POST['GRUPO']);
		}
	    mkdir("../../img/publicaciones/".$_POST['GRUPO']."/".$carpeta);
		$destino = 'C:/xampp/htdocs/Urban-App/img/publicaciones/'.$_POST['GRUPO']."/".$carpeta.'/'.$foto; //<- este despues se cambia por el de abajo
        // $destino='http://urban-app.com.ar/'.$destino; <- para guardarlo en hosting
		move_uploaded_file( $_FILES['FOTO']['tmp_name'] , $destino );
	}
	
	/****** Creo publicacion ******/
	
	if(isset($_SESSION["s_id"])){
		$publicacion = new Publicacion();
		$_POST["FECHA_CREACION"]=getDatetimeNow();
		$_POST["FKGRUPO"]=1;
		$_POST["FKUSUARIO"]=$_SESSION["s_id"];
		$fin=json_decode($publicacion->crear_publicacion($_POST),true);
		echo $fin;
	}
	else{
		echo 0;
	}	
	
?>