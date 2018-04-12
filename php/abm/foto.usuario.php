<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Multimedia.php');
	require_once('../clases/Usuario.php');
	
	
	/****** Creo publicacion ******/
	
	if(isset($_SESSION["s_id"])){
		$usuario = new Usuario();
		//hay foto
		if(!empty($_FILES)&&$_FILES['FOTO']['name']){
			//creo carpeta para foto
			if(!is_dir("../../img/usuarios/".$_SESSION["s_id"])){
				mkdir("../../img/usuarios/".$_SESSION["s_id"]);
			}
			$foto = $_FILES['FOTO']['name'];
			$destino = 'C:/xampp/htdocs/Urban-App/img/usuarios/'.$_SESSION["s_id"].'/'.$foto; //<- este despues se cambia por el de abajo
			//$destino='http://urban-app.com.ar/'.$destino; <- para guardarlo en hosting
			move_uploaded_file( $_FILES['FOTO']['tmp_name'] , $destino );
			$multimedia = new Multimedia();
			$rta2=$multimedia->crear_multimedia($destino);
			if(!$rta2){
				//error al almacenar foto en bdd
				return 0;
			}
			$ultima_multimedia=Multimedia::ultima_multimedia_creada(); 
			$array=[];
			$array["FKMULTIMEDIA"]=$ultima_multimedia[0]->getCodigoMultimedia();
			$array["ID"]=$_SESSION["s_id"];
			$rta3=$usuario->foto_usuario($array);
			if(!$rta3){
				 //error al crear foto en usuario
				return 0;
			}
			else{
				$foto_final=[
					"ID"=>$array["FKMULTIMEDIA"],
					"PATH"=>$ultima_multimedia[0]->getPath()
				];
				echo json_encode($foto_final);
			}
		}		
		else{ //no hay foto
			return 0;
		} 
		
	}
	//no logueado
	else{
		return 0;
	}	
	
?>