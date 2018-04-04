<?php

class Alarma{
	private $codigo_alarma;
	private $nombre;
	private $icono;
	
	public static $tabla = "alerta";
	private static $fila = ['NOMBRE', 'ICONO'];

	public function setCodigoAlarma($a){
		$this->codigo_alarma = $a;
	}
	public function getCodigoAlarma(){
		return $this->codigo_alarma;
	}
	public function setNombre($a){
		$this->nombre = $a;
	}
	public function getNombre(){
		return $this->nombre;
	}
	public function setIcono($a){
		$this->icono = $a;
	}
	public function getIcono(){
		return $this->icono;
	}
	public function getByPk($id){
		$this->codigo_alarma = $id;
		$query = "SELECT * FROM " . static::$tabla . "
					WHERE ID = ?";
		$stmt = DBcnx::getStatement($query);
		$stmt->execute([$id]);
		return $this->cargarDatos($stmt->fetch(PDO::FETCH_ASSOC));
	}
	
	public function cargarDatos($fila){
		foreach($fila as $prop => $valor) {
			if(in_array($prop, static::$fila)) {
				switch($prop){
					case "nombre":
						$this->setNombre($valor);
					break;
					case "icono":
						$this->setIcono($valor);
					break;
				}
			}
		}
	}
	public static function all(){
		$salida = [];
		$query = "SELECT * FROM " . static::$tabla ;
		$stmt = DBcnx::getStatement($query);
		if($stmt->execute()) {
			while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$alarma = new Alarma;
				$alarma->codigo_alarma = $fila['ID'];
				$alarma->nombre = $fila['NOMBRE'];
				$alarma->icono = $fila['ICONO'];
				$alarma->cargarDatos($fila);
				$salida[] = $alarma;
			}
		}
		return $salida;
	}

?>