<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Grupo.php');
	require_once('../clases/Multimedia.php');
	require_once('../clases/Usuario_Grupo.php');
	
	//FALTA validacion de datos por POST
	
	/****** Creo grupo ******/
	
	if(isset($_SESSION["s_id"])){
		$grupo = new Grupo();
		$_POST['FKUSUARIO']=$_SESSION["s_id"];
		$fin=json_decode($grupo->crear_grupo($_POST),true);

		
		//elijo el ultimo grupo creado para tener el ID y crear la carpeta
		$ultimo_grupo=Grupo::ultimo_grupo_creado(); 
		
		if($fin==1){ //grupo creado ok

			//crear carpeta para grupo "grupos/id"
			if(!is_dir("../../img/grupos/".$ultimo_grupo[0]->getCodigoGrupo())){
				mkdir("../../img/grupos/".$ultimo_grupo[0]->getCodigoGrupo());
				/* if(!is_dir("../../img/grupos/".$ultimo_grupo[0]->getCodigoGrupo()."/chats")){
					mkdir("../../img/grupos/".$ultimo_grupo[0]->getCodigoGrupo()."/chats");
				} */
			}			
			
			//si hay foto
			if(!empty($_FILES)&&$_FILES['FOTO']['name']){
				
				//Guardado de foto en carpeta local
				$foto = $_FILES['FOTO']['name']; 
				$destino = 'C:/xampp/htdocs/Urban-App/img/grupos/'.$ultimo_grupo[0]->getCodigoGrupo().'/'.$foto; //<- este despues se cambia por el de abajo
				// $destino='http://urban-app.com.ar/'.$destino; <- para guardarlo en hosting
				
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
				/****************/			
			
				//Guardado de foto en tabla multimedia
				$multimedia = new Multimedia();
				$multimedia->crear_multimedia($destino);
				$ultima_multimedia=Multimedia::ultima_multimedia_creada(); 
				$ids=[];
				$ids["fk_multimedia"]=$ultima_multimedia[0]->getCodigoMultimedia();
				$ids["id"]=$ultimo_grupo[0]->getCodigoGrupo();
				$rta=$ultima_multimedia[0]->cambiar_fkmultimedia($ids,"grupo");
	
				//mover foto a carpeta
				//move_uploaded_file( $_FILES['FOTO']['tmp_name'] , $destino );
			}
			
			echo $ultimo_grupo[0]->getCodigoGrupo();
		}
		else{ //error al crear grupo
			echo 0;
		}
	}
	else{
		echo "no logueado";
	}	
	
?>