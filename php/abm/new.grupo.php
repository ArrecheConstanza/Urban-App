<?php
	//header("Access-Control-Allow-Origin: *");
	
	/****** Clases *****/
	
	require_once('../config.php');
	require_once('../funciones.php');
	require_once('../clases/DBcnx.php');
	require_once('../clases/Grupo.php');
	
	//FALTA validacion de datos por POST
	
	/****** Creo grupo ******/
	
	if(isset($_SESSION["s_id"])){
		$grupo = new Grupo();
		$fin=json_decode($grupo->crear_grupo($_POST),true);
		
		if($fin==1){ //grupo creado ok
		
			$ultimo_grupo=$grupo->ultimo_grupo_creado(); //crear carpeta para grupo
			$ultimo_grupo = new Grupo($ultimo_grupo);
			var_dump($ultimo_grupo->getCodigoGrupo());////////////
			if(!is_dir("../../img/grupos/".$_POST['NOMBRE']."__".$ultimo_grupo->getCodigoGrupo())){
				mkdir("../../img/grupos/".$_POST['NOMBRE']."__".$ultimo_grupo->getCodigoGrupo());
			}
			
			//si hay foto
			if(!empty($_FILES)&&$_FILES['FOTO']['name']){
				$foto = $_FILES['FOTO']['name']; 
				$destino = 'C:/xampp/htdocs/Urban-App/img/grupos/'.$_POST["NOMBRE"]."__".$ultimo_grupo->getCodigoGrupo().'/'.$foto; //<- este despues se cambia por el de abajo
				// $destino='http://urban-app.com.ar/'.$destino; <- para guardarlo en hosting
				move_uploaded_file( $_FILES['FOTO']['tmp_name'] , $destino );
			}
			echo 1;
		}
		else{
			echo 0;
		}
	}
	else{
		echo 0;
	}	
	
?>