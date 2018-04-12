<?php
//header("Access-Control-Allow-Origin: *");

	/****** Clases ******/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Usuario.php');
	require_once('../clases/Denuncia_Usuario.php');
	require_once('../clases/Multimedia.php');
	
	$usuario = new Usuario();
	$arrayFinal = array();
	$unUsuario=$usuario->getByPk($_POST["id"]);

		if($unUsuario["FKMULTIMEDIA"]!=null){
			$multimedia = new Multimedia();
			$multimedia=$multimedia->getByPk($unUsuario["FKMULTIMEDIA"]);
					$array=[
						"ID"=>$multimedia[0]->getCodigoMultimedia(),
						"PATH"=>$multimedia[0]->getPath()
					];
			$unUsuario["FOTO"]=$array;
		}
		else{
			$unUsuario["FOTO"]=null;
		}
		$unUsuario['DENUNCIAS']="";
		//Si es admin traer listado de denuncias de publicacion
					if(isset($_SESSION["s_nivel"])&&$_SESSION["s_nivel"]=="Admin"){
						$Denuncia_Usuario= new Denuncia_Usuario();
						$denuncias=$Denuncia_Usuario->all($unUsuario["ID"]);
						foreach($denuncias as $unaDenuncia){
							$arrayDenuncia=[
								"ID"=>$unaDenuncia->getCodigoDenunciaUsuario(),
								"FKUSUARIO_DENUNCIADO"=>$unaDenuncia->getFkUsuarioDenunciado(),
								"FKUSUARIO"=>$unaDenuncia->getFkUsuario(),
								"DESCRIPCION"=>$unaDenuncia->getDescripcion()
							];
							$arrayFinalDenuncias[]=$arrayDenuncia;
							$unUsuario['DENUNCIAS']=$arrayFinalDenuncias;
						}
						
					}
				//
		//var_dump($unUsuario);
		echo json_encode($unUsuario);
		
?>