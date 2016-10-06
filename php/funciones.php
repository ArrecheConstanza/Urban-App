<?php 

function cambiar_formato_fecha($fecha,$b){
	$datetime = new DateTime($fecha);
	if($b){
		return $datetime->format('d/m/Y');
	}
	else{
		return $datetime->format('H:i d/m/Y');
	}
}

function publicaciones_parsear_fecha($fecha){
	$secs=strtotime('now') - strtotime($fecha);
	$bit = array(
     ' año' => $secs / 31556926 % 12,
     ' semana' => $secs / 604800 % 52,
     ' día' => $secs / 86400 % 7,
     ' h' => $secs / 3600 % 24,
     ' min' => $secs / 60 % 60,
     ' seg' => $secs % 60
     );
	$ret[]= "Hace ";
	foreach($bit as $k => $v){
		if($v > 1)$ret[] = $v . $k . 's';
		if($v == 1)$ret[] = $v . $k;
	}
	array_splice($ret, count($ret)-1, 0);
	return join(' ', $ret);
}

/*function edad($fecha){
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
}*/

function getDatetimeNow() {
	$tz_object = new DateTimeZone('America/Argentina/Buenos_Aires');
	$datetime = new DateTime();
	$datetime->setTimezone($tz_object);
	return $datetime->format('Y-m-d H:i:s');
}

?>