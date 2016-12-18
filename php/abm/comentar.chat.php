<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases ******/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Usuario.php');
	require_once('../clases/Chat.php');
	require_once('../clases/Comentario_Chat.php');
	require_once('../clases/Multimedia.php');
	
	/****** Creo comentario de chat ******/
	
	if(isset($_SESSION["s_id"])&&$_POST["FKCHAT"]&&$_POST["FKGRUPO"]&&$_POST["COMENTARIO"]){ //si tengo todos los datos
	
		$comentario_chat = new Comentario_Chat();
		$_POST["FECHA_CREACION"]=getDatetimeNow();
		$_POST["FKUSUARIO"]=$_SESSION["s_id"];
	}
		
/*if(!empty($_FILES)&&$_FILES['FOTO']['name']&&$_POST["FKCHAT"]&&$_POST["FKGRUPO"]){ // HAY FOTO
				//busco carpeta de grupo
				$foto = $_FILES['FOTO']['name'];
				if(!is_dir("../../img/grupos/".$_POST["FKGRUPO"]."/chats/".$_POST["FKCHAT"])){
					mkdir("../../img/grupos/".$_POST["FKGRUPO"]."/chats/".$_POST["FKCHAT"]);
				}
				$destino = 'C:/xampp/htdocs/Urban-App/img/grupos/'.$_POST["FKGRUPO"]."/chats/".$_POST["FKCHAT"].'/'.$foto; //<- este despues se cambia por el de abajo
				// $destino='http://urban-app.com.ar/'.$destino; <- para guardarlo en hosting
				move_uploaded_file( $_FILES['FOTO']['tmp_name'] , $destino );
				
				//creo objeto multimedia
				$multimedia = new Multimedia();
				$rta2=$multimedia->crear_multimedia($destino);
				if(!$rta2){
					echo $rta2; //error al almacenar foto en bdd
					return 0;
				}
				else{
					//pido fkmultimedia de objeto comentario_chat
					$ultima_multimedia=Multimedia::ultima_multimedia_creada(); 
					$_POST["FKMULTIMEDIA"]=$ultima_multimedia[0]->getCodigoMultimedia();
					
					//cargo en bdd el comentario con la foto
					$rta=$comentario_chat->crear_comentario_chat($_POST);
					echo $rta;
					return 0;
				}
			}
			else{ //NO HAY FOTO
				$rta=$comentario_chat->crear_comentario_chat($_POST);
				echo $rta;
			}
	}
	else{ //faltan datos
		echo 0;
	}	
	*/
	var_dump($_POST);
	var_dump($_FILES);
?> 