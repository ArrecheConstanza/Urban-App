<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Usuario.php');
	require_once('../clases/Validacion.php');
	
	/***** Validacion ******/
	
	$reglas = [
		'EMAIL' => 'required|email',
		'CLAVE' => 'required|clave',
		'NOMBRE' => 'required|nombre',
		'APELLIDO' => 'required|nombre',
		'EDAD' => 'required|date'
	];
	
	
	// falta validar datos
	if(isset($_SESSION["s_id"])){
		$usuario = new Usuario();
		
		$datos=$_POST;
		if($datos['EDAD']=="null"){
			unset($datos['EDAD']);
		}
		if(isset($datos['EMAIL'])){
			unset($datos['CLAVE']);
		}
		//es la clave
		if(count($datos)==2&&isset($datos["CLAVE"])){
			$rta=$usuario->es_clave($datos["CLAVE"],$_SESSION["s_id"]);
			
			//la clave es correcta, la puede editar
			if($rta['ID']==$_SESSION["s_id"]){ 
				$rta=$usuario->editar_clave($datos["CLAVE_NUEVA"],$_SESSION["s_id"]);
				echo $rta;
			}
			
			//antigua clave no coincide
			else{
				echo "La clave no coincide";
			}
		}
		
		//es otro dato
		else{
			
			//edad
			if(isset($datos["edad"])){
				$datos["EDAD"]=$datos["edad"];
			}
			
			//direccion_estado
			if(isset($datos["DIRECCION_ESTADO"])){
				if($datos["DIRECCION_ESTADO"]=='true'){
					$valor="Oculta";
				
				}
				else{
					$valor="Visible";
				}
			}
			else{
				$valor=$datos[key($datos)];
			}
			$array_final=[
				"VALOR" => $valor,
				"ID" => $_SESSION['s_id']
			];
			$rta=$usuario->editar_usuario(key($datos),$array_final);
			echo $rta;
		} 
	}
	else{ //no logueado
		echo 0;
	}
	
?>