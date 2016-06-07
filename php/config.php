<?php

date_default_timezone_set( "America/Argentina/Buenos_Aires" );
session_start( );

$php=array('$var','$exp','$exp,','"','preg_match');
	$js=array('val','var exp','','','exp.test');
	$sustituir=array("VAR","EXP","EX,",'"',"FUNC");
	if(file_exists("txt/funciones.txt")){  
		if(!file_exists('php/funciones.php')){
			copy('txt/funciones.txt','php/funciones.txt');
			$archivo=file_get_contents("php/funciones.txt");
			$archivo=str_replace($sustituir,$php,$archivo);
			$archivo2="<?php";
			$archivo2.=$archivo;
			$archivo2.='?>';
			file_put_contents('php/funciones.php', $archivo2, FILE_APPEND);
			unlink('php/funciones.txt');
		}
		if(!file_exists('js/funciones.js')){
			copy('txt/funciones.txt','js/funciones.txt');
			$archivo=file_get_contents("js/funciones.txt");
			$archivo=str_replace($sustituir,$js,$archivo);
			file_put_contents('js/funciones.js', $archivo, FILE_APPEND);
			unlink('js/funciones.txt');
		}
}	


function cambiar_formato($fecha,$b){
	$datetime = new DateTime($fecha);
	if($b){
		return $datetime->format('d/m/Y');
	}
	else{
		return $datetime->format('H:i d/m/Y');
	}
}

function edad($fecha){
	$array=explode("-",$fecha);
	$year=$array[0];
	$month=$array[1];
	$day=$array[2];
	$year_diff=date("Y")-$year;
	$month_diff=date("m")-$month;
	$day_diff=date("d")-$day;
	if($day_diff<0&&$month_diff==0){
		$year_diff--;
	}
	if($day_diff<0&&$month_diff<0){
		$year_diff--;
	}
	return $year_diff;
}

function getDatetimeNow() {
	$tz_object = new DateTimeZone('America/Argentina/Buenos_Aires');
	$datetime = new DateTime();
	$datetime->setTimezone($tz_object);
	return $datetime->format('Y-m-d\TH:i:s.u');
}


?>