<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Encuesta.php');
	require_once('../clases/Opciones.php');
	require_once('../clases/Validacion.php');	
	
	/***** Validacion ******/
	
	$reglas = [
		'PREGUNTA' => 'required|pregunta',
		'OPCIONES' => 'required|opciones'
	];

$validacion = new Validacion($_POST, $reglas);
$rta= json_encode($validacion->getErrores())."\n";

//mensaje error
if(count(json_decode($rta))){
	echo $rta;
}else{
	/****** Creo encuesta ******/
	
	if(isset($_SESSION["s_id"])){
		$encuesta = new Encuesta();
		$_POST["FECHA_CREACION"]=getDatetimeNow();
		$_POST["FKUSUARIO"]=$_SESSION["s_id"];
		
		//crear encuesta en todos los grupos
		if($_POST["FKGRUPO"]=="0"){ 
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
					 $rta2=$encuesta->ultima_encuesta_creada();
					if($rta2){
						$opcion = new Opciones();
						$array["FKENCUESTA"]=$rta2->getCodigoEncuesta();
						for($j=0;$j<count($_POST['OPCIONES']);$j++){
							$array["RESPUESTA"]=$_POST["OPCIONES"][$j]["opcion"];
							$rta3=$opcion->crear_opciones($array);
							if(!$rta){
								echo $rta; //no se pudo crear opcion
								return 0;
							}
						} 
					}
					else{
						echo $rta2;
						return 0; //error al buscar ultima encuesta creada
					} 
				}  
			} 
			echo "ok";
		}
		//crear encuesta en un solo grupo
		else{ 
			$rta=$encuesta->crear_encuesta($_POST);
			if(!$rta){ //error al crear encuesta
				echo $rta;
				return 0;
			}
			else{
				$rta2=$encuesta->ultima_encuesta_creada();
				if($rta2){
					$opcion = new Opciones();
					$array["FKENCUESTA"]=$rta2->getCodigoEncuesta();
					for($i=0;$i<count($_POST['OPCIONES']);$i++){
						$array["RESPUESTA"]=$_POST["OPCIONES"][$i]["opcion"];
						/* var_dump($array); */
						$rta3=$opcion->crear_opciones($array);
						if(!$rta){
							echo $rta; //no se pudo crear opcion
							return 0;
						}
					}
				}
				else{
					echo $rta2;
					return 0; //error al buscar ultima encuesta creada
				}
				echo "ok";
			}
		} 
	}
	else{
		echo 0; //no logueado
	}	
}	
?>