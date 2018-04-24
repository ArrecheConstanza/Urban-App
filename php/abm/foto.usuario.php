<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Multimedia.php');
	require_once('../clases/Usuario.php');
		
	/****** Creo foto usuario ******/
	
	if(isset($_SESSION["s_id"])){
		$usuario = new Usuario();
		//hay foto
		if(!empty($_FILES)&&$_FILES['FOTO']['name']){
			
			$limite = 2; //max 2mb
			if( $_FILES['FOTO']['size'] > $limite * 1024 * 1024 ){
				echo "Maximo 2mb";
				return 0;
			}
			
			//creo carpeta para foto
			if(!is_dir("../../img/usuarios/".$_SESSION["s_id"])){
				mkdir("../../img/usuarios/".$_SESSION["s_id"]);
			}
			
			//nombre de archivo y ruta
			$foto = $_FILES['FOTO']['name'];
			$destino = 'C:/xampp/htdocs/Urban-App/img/usuarios/'.$_SESSION["s_id"].'/'.$foto; //<- este despues se cambia por el de abajo
			//$destino='http://urban-app.com.ar/'.$destino; <- para guardarlo en hosting
			
			/**** RESIZE ****/
			$ruta_temporal = $_FILES['FOTO']['tmp_name']; 
			if($_FILES['FOTO']['type']=='image/png'){
				$original=imagecreatefrompng( $ruta_temporal );
			}
			else if($_FILES['FOTO']['type']=='image/jpeg'||$_FILES['FOTO']['type']=='image/jpg'){
				$original=imagecreatefromjpeg( $ruta_temporal );
			}
			else{
				//error formato no permitido
			}
			
			$ancho_o = imagesx( $original );
			$alto_o = imagesy( $original );
			$alto_n = 50; //50px de alto
			$ancho_n = round($alto_n  *$ancho_o / $alto_o) ;
			$copia = imagecreatetruecolor( $ancho_n, $alto_n );
			imagecopyresampled( $copia, $original, 0,0, 0,0, $ancho_n, $alto_n, $ancho_o, $alto_o );
			
			imagejpeg( $copia, $destino, 100 );
			
			/***************/
			
			//move_uploaded_file( $copia , $destino );
			$multimedia = new Multimedia();
			$rta2=$multimedia->crear_multimedia($destino);
			if(!$rta2){
				//error al almacenar foto en bdd
				return 0;
			}
			
			imagedestroy($copia);
			imagedestroy($original);
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