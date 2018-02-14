<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Encuesta.php');
	require_once('../clases/Multimedia.php');
	
	
	/****** Creo encuesta ******/
	
	if(isset($_SESSION["s_id"])){
		$encuesta = new Encuesta();
		$_POST["FECHA_CREACION"]=getDatetimeNow();
		$_POST["FKUSUARIO"]=$_SESSION["s_id"];
		var_dump($_POST);
		//crear encuesta en todos los grupos
		/* if($_POST["FKGRUPO"]=="0"){ 
			$rta;
			$ban=0;
			$carpeta;
			for($i=0;$i<count($_POST["GRUPOS"]);$i++){
				$_POST["FKGRUPO"]=$_POST["GRUPOS"][$i];
				$rta=$encuesta->crear_encuesta($_POST);
				if(!$rta){ //error al crear encuesta
					echo $rta;
					return 0;
				}
				else{

				}
			}
			echo $rta;
		}
		//crear encuesta en un solo grupo
		else{ 
			$rta=$encuesta->crear_encuesta($_POST);
			var_dump($_POST);
			if(!$rta){ //error al crear encuesta
				echo $rta;
			}
			else{
				
				}
				echo $rta;
			}
		} */
	}
	else{
		echo 0;
	}	
	
?>