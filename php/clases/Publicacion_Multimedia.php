<?php

class Publicacion_Multimedia{
	private $codigo_publicacion;
	private $codigo_multimedia;
	public static $tabla = "publicacion_multimedia";
	private static $fila = ['FKPUBLICACION', 'FKMULTIMEDIA'];

	public function setCodigoPublicacion($a){
		$this->codigo_publicacion = $a;
	}
	public function getCodigoPublicacion(){
		return $this->codigo_publicacion;
	}
	public function setCodigoMultiemdia($a){
		$this->codigo_multimedia = $a;
	}
	public function getCodigoMultimedia(){
		return $this->codigo_multimedia;
	}
	
	public function cargarDatos($fila){
		foreach($fila as $prop => $valor) {
			if(in_array($prop, static::$fila)) {
				switch($prop){
					case "codigo_publicacion":
						$this->setCodigoPublicacion($valor);
					break;
					case "codigo_multimedia":
						$this->setCodigoMultiemdia($valor);
					break;
				}
			}
		}
	}
	
	public function crear_publicacion_multiemdia($array){
		$query = "INSERT INTO " . static::$tabla . " (FKPUBLICACION, FKMULTIMEDIA)
				VALUES (?, ?)";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["id_publicacion"],$array["id_multimedia"]]);
	}
	
	public static function traer_publicacion_multimedia($id){
		$salida = [];
		$query = "SELECT * FROM " . static::$tabla . " WHERE FKPUBLICACION='$id'";
		$stmt = DBcnx::getStatement($query);
		if($stmt->execute()) {
			while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$publicacion_multimedia = new Publicacion_Multimedia;
				$publicacion_multimedia->codigo_multimedia = $fila['FKMULTIMEDIA'];
				$publicacion_multimedia->cargarDatos($fila);
				$salida[] = $publicacion_multimedia;
			}
		}
		return $salida;
	}
}

?>