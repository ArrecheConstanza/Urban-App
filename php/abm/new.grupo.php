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
		$fin=json_decode($grupo->crear_grupo($_POST),true);
		
		//eligo el ultimo grupo creado para tener el ID y crear la carpeta, ya que los nombres pueden repetirse pero los ids no
		$ultimo_grupo=Grupo::ultimo_grupo_creado(); 
		
		if($fin==1){ //grupo creado ok
		

			//crear carpeta para grupo "grupos/grupo__id"
			if(!is_dir("../../img/grupos/".$_POST['NOMBRE']."__".$ultimo_grupo[0]->getCodigoGrupo())){
				mkdir("../../img/grupos/".$_POST['NOMBRE']."__".$ultimo_grupo[0]->getCodigoGrupo());
				if(!is_dir("../../img/grupos/".$_POST['NOMBRE']."__".$ultimo_grupo[0]->getCodigoGrupo()."/publicaciones")){
					mkdir("../../img/grupos/".$_POST['NOMBRE']."__".$ultimo_grupo[0]->getCodigoGrupo()."/publicaciones");
				}
			}			
			
			//si hay foto
			if(!empty($_FILES)&&$_FILES['FOTO']['name']){
				
				//Guardado de foto en carpeta local
				$foto = $_FILES['FOTO']['name']; 
				$destino = 'C:/xampp/htdocs/Urban-App/img/grupos/'.$_POST["NOMBRE"]."__".$ultimo_grupo[0]->getCodigoGrupo().'/'.$foto; //<- este despues se cambia por el de abajo
				// $destino='http://urban-app.com.ar/'.$destino; <- para guardarlo en hosting
				
				//Guardado de foto en tabla multimedia
				$multimedia = new Multimedia();
				$multimedia->crear_multimedia($destino);
				$ultima_multimedia=Multimedia::ultima_multimedia_creada(); 
				$ids=[];
				$ids["fk_multimedia"]=$ultima_multimedia[0]->getCodigoMultimedia();
				$ids["id"]=$ultimo_grupo[0]->getCodigoGrupo();
				$rta=$ultima_multimedia[0]->cambiar_fkmultimedia($ids,"grupo");

				//mover foto a carpeta
				move_uploaded_file( $_FILES['FOTO']['tmp_name'] , $destino );
				//echo $rta;
				return $ultimo_grupo[0]->getCodigoGrupo();
			}
			
			echo $ultimo_grupo[0]->getCodigoGrupo();
		}
		else{ //error al crear grupo
			echo 0;
		}
	}
	else{
		echo 0;
	}	
	
?>