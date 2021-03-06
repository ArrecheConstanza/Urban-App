<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Multimedia.php');
	require_once('../clases/Grupo.php');
	
	
	/****** Creo publicacion ******/
	
	if(isset($_SESSION["s_id"])){
		$grupo = new Grupo();
		//hay foto
		if(!empty($_FILES)&&$_FILES['FOTO']['name']){
			//creo carpeta para foto
			if(!is_dir("../../img/grupos/".$_POST["ID"])){
				mkdir("../../img/grupos/".$_POST["ID"]);
			}
			
			$foto = $_FILES['FOTO']['name'];
			$destino = 'C:/xampp/htdocs/Urban-App/img/grupos/'.$_POST["ID"].'/'.$foto; //<- este despues se cambia por el de abajo
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
			$alto_n = 300; //300px de alto
			$ancho_n = round($alto_n  *$ancho_o / $alto_o) ;
			$copia = imagecreatetruecolor( $ancho_n, $alto_n );
			imagecopyresampled( $copia, $original, 0,0, 0,0, $ancho_n, $alto_n, $ancho_o, $alto_o );
			
			imagejpeg( $copia, $destino, 100 );
			imagedestroy($copia);
			imagedestroy($original);
			/***************/
							
			//move_uploaded_file( $_FILES['FOTO']['tmp_name'] , $destino );
			$multimedia = new Multimedia();
			$rta2=$multimedia->crear_multimedia($destino);
			if(!$rta2){
				//error al almacenar foto en bdd
				return 0;
			}
			$ultima_multimedia=Multimedia::ultima_multimedia_creada(); 
			$array=[];
			//$array["FKMULTIMEDIA"]=$ultima_multimedia[0]->getCodigoMultimedia();
			//$array["ID"]=$_SESSION["s_id"];
			$array["VALOR"]=$ultima_multimedia[0]->getCodigoMultimedia();
			$array["ID"]=$_POST['ID'];
			$varibale="FKMULTIMEDIA";
			$rta3=$grupo->editar_grupo($varibale,$array);
			if(!$rta3){
				 //error al crear foto en grupo
				return 0;
			}
			else{
				$foto_final=$ultima_multimedia[0]->getPath();
				echo $foto_final;
			}
		}		
		else{ //no hay foto
			echo 0;
		} 
		
	}
	//no logueado
	else{
		echo 0;
	}	
	
?>