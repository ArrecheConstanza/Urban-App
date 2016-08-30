<?php
	
class Multimedia{
	private $codigo_multimedia;
	private $path;
	public static $tabla = "multimedia";
	private static $fila = ['DIR'];

	public function setCodigoMultimedia($a){
		$this->codigo_multimedia = $a;
	}
	public function getCodigoMultimedia(){
		return $this->codigo_multimedia;
	}
	public function setPath($a){
		$this->path = $a;
	}
	public function getPath(){
		return $this->path;
	}
	
	public function getByPk($id){
		$this->codigo_multimedia = $id;
		$query = "SELECT * FROM " . static::$tabla . "
					WHERE ID = ?";
		$stmt = DBcnx::getStatement($query);
		$stmt->execute([$id]);
		$this->cargarDatos($stmt->fetch(PDO::FETCH_ASSOC));
	}
	public function cargarDatos($fila){
		foreach($fila as $prop => $valor) {
			if(in_array($prop, static::$fila)) {
				switch($prop){
					case "path":
						$this->setNombre($valor);
					break;
				}
			}
		}
	}
	public function eliminar_multimedia($array){
		$query = "DELETE FROM " . static::$tabla . " WHERE ID=?";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["id"]]);
	}
	public function crear_multimedia($array){
		$query = "INSERT INTO " . static::$tabla . " (DIR)
				VALUES (?)";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["DIR"]]);
	}
	public static function all(){
		$salida = [];
		$query = "SELECT * FROM " . static::$tabla;
		$stmt = DBcnx::getStatement($query);
		if($stmt->execute()) {
			while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$multimedia = new Multimedia;
				$multimedia->codigo_multimedia = $fila['ID'];
				$multimedia->cargarDatos($fila);
				$salida[] = $multimedia;
			}
		}
		return $salida;
	}
}
