<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Publicacion.php');
	require_once('../clases/Multimedia.php');
	require_once('../clases/Publicacion_Multimedia.php');
	require_once('../clases/Validacion.php');	
	
	/***** Validacion ******/
	
	$reglas = [
		'TITULO' => 'required|titulo',
		'DESCRIPCION' => 'required|descripcion'
	];

$validacion = new Validacion($_POST, $reglas);
$rta= json_encode($validacion->getErrores())."\n";

//mensaje error
if(count(json_decode($rta))){
	echo $rta;
}else{
	/****** Creo publicacion ******/
	
	if(isset($_SESSION["s_id"])){
		$publicacion = new Publicacion();
		$_POST["FECHA_CREACION"]=getDatetimeNow();
		$_POST["FKUSUARIO"]=$_SESSION["s_id"];
		
		//crear publicacion en todos los grupos
		if($_POST["FKGRUPO"]=="0"){ 
			$rta;
			$ban=0;
			$carpeta;
			for($i=0;$i<count($_POST["GRUPOS"]);$i++){
				$_POST["FKGRUPO"]=$_POST["GRUPOS"][$i];
				$rta=$publicacion->crear_publicacion($_POST);
				if(!$rta){ //error al crear publicacion
					echo $rta;
					return 0;
				}
				else{
					if(!empty($_FILES)&&$_FILES['FOTO']['name']){ //hay foto
						
						//creo carpeta para foto
						if(!$ban){
							$carpeta=$publicacion->ultima_publicacion_creada();
							$carpeta=$carpeta->getCodigoPublicacion();
							$foto = $_FILES['FOTO']['name'];
							if(!is_dir("../../img/publicaciones/".$carpeta)){
								mkdir("../../img/publicaciones/".$carpeta);
							}
							
							//nombre de archivo y ruta
							$foto = $_FILES['FOTO']['name'];
							$destino = 'C:/xampp/htdocs/Urban-App/img/publicaciones/'.$carpeta.'/'.$foto; //<- este despues se cambia por el de abajo
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
							/***************/
							
							
							//move_uploaded_file( $_FILES['FOTO']['tmp_name'] , $destino );
							$multimedia = new Multimedia();
							$rta2=$multimedia->crear_multimedia($destino);
							if(!$rta2){
								echo $rta2; //error al almacenar foto en bdd
								return 0;
							}
							$ban=1;
						}
						//primera publicacion relacionada con la tabla publicacion_multimedia
						if(!$i){ 
							$ultima_multimedia=Multimedia::ultima_multimedia_creada(); 
							$array=[];
							$array["id_publicacion"]=$carpeta;
							$array["id_multimedia"]=$ultima_multimedia[0]->getCodigoMultimedia();
							$publicacion_multimedia = new Publicacion_Multimedia();
							$rta3=$publicacion_multimedia->crear_publicacion_multimedia($array);
							imagedestroy($copia);
							imagedestroy($original);
							if(!$rta3){
								echo $rta3; //error al crear foto en publicacion
								return 0;
							}
						}
						//el resto de las publicaciones relacionadas con la tabla publicacion_multimedia
						else{
							$carpeta=intval($carpeta);
							$carpeta++;
							$ultima_multimedia=Multimedia::ultima_multimedia_creada(); 
							$array=[];
							$array["id_publicacion"]=$carpeta;
							$array["id_multimedia"]=$ultima_multimedia[0]->getCodigoMultimedia();
							$publicacion_multimedia = new Publicacion_Multimedia();
							$rta3=$publicacion_multimedia->crear_publicacion_multimedia($array);
							if(!$rta3){ 
								echo $rta3; //error al crear foto en publicacion
								return 0;
							} 
							
						}
					}
				}
			}
			echo $rta;
		}
		//crear publicacion en un solo grupo
		else{ 
			$rta=$publicacion->crear_publicacion($_POST);
			if(!$rta){ //error al crear publicacion
				echo $rta;
			}
			else{
				if(!empty($_FILES)&&$_FILES['FOTO']['name']){ //hay foto
					//creo carpeta para foto
					$carpeta=$publicacion->ultima_publicacion_creada();
					$carpeta=$carpeta->getCodigoPublicacion();
					$foto = $_FILES['FOTO']['name'];
					if(!is_dir("../../img/publicaciones/".$carpeta)){
						mkdir("../../img/publicaciones/".$carpeta);
					}
					$destino = 'C:/xampp/htdocs/Urban-App/img/publicaciones/'.$carpeta.'/'.$foto; //<- este despues se cambia por el de abajo
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
							/***************/
							
				//	move_uploaded_file( $_FILES['FOTO']['tmp_name'] , $destino );
					$multimedia = new Multimedia();
					$rta2=$multimedia->crear_multimedia($destino);
					if(!$rta2){
						echo $rta2; //error al almacenar foto en bdd
						return 0;
					}
					else{
						//tabla de relacion publicacion_multimedia
						$ultima_multimedia=Multimedia::ultima_multimedia_creada(); 
						$array=[];
						$array["id_publicacion"]=$carpeta;
						$array["id_multimedia"]=$ultima_multimedia[0]->getCodigoMultimedia();
						$publicacion_multimedia = new Publicacion_Multimedia();
						$rta3=$publicacion_multimedia->crear_publicacion_multimedia($array);
						echo $rta3;
						return 0;
					}
				}
				echo $rta;
			}
		}
	}
	else{
		echo 0;
	}	
}	
?>