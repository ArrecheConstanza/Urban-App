<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Publicacion.php');
	require_once('../clases/Multimedia.php');
	require_once('../clases/Publicacion_Multimedia.php');
	
	
	/****** Creo publicacion ******/
	
	if(isset($_SESSION["s_id"])){
		$publicacion = new Publicacion();
		$_POST["FECHA_CREACION"]=getDatetimeNow();
		$_POST["FKUSUARIO"]=$_SESSION["s_id"];
		
		//crear publicacion en todos los grupos
		if(!$_POST["FKGRUPO"]){ 
			$rta;
			$ban=0;
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
							$destino = 'C:/xampp/htdocs/Urban-App/img/publicaciones/'.$carpeta.'/'.$foto; //<- este despues se cambia por el de abajo
							// $destino='http://urban-app.com.ar/'.$destino; <- para guardarlo en hosting
							move_uploaded_file( $_FILES['FOTO']['tmp_name'] , $destino );
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
								if(!$rta3){
									echo $rta3; //error al crear foto en publicacion
									return 0;
								}
							}
							$ban=1;
						}
						//carpeta ya creada con foto almacenada, asigno esa carpeta a la nueva publicacion
						else{
								//tabla de relacion publicacion_multimedia
								$ultima_multimedia=Multimedia::ultima_multimedia_creada(); 
								$array=[];
								$array["id_publicacion"]=$_POST["FKGRUPO"];
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
					move_uploaded_file( $_FILES['FOTO']['tmp_name'] , $destino );
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
	
?>