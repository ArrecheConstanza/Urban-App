<?php

class Opciones{
	private $codigo_opcion;
	private $respuesta;
	private $fk_encuesta;
	
	public static $tabla = "opciones";
	private static $fila = ['RESPUESTA', 'FKENCUESTA'];

	public function setCodigoOpcion($a){
		$this->codigo_opcion = $a;
	}
	public function getCodigoOpcion(){
		return $this->codigo_opcion;
	}
	public function setRespuesta($a){
		$this->respuesta = $a;
	}
	public function getRespuesta(){
		return $this->respuesta;
	}
	public function setFkEncuesta($a){
		$this->fk_encuesta = $a;
	}
	public function getFkEncuesta(){
		return $this->fk_encuesta;
	}
	
	public function getByPk($id){
		$this->codigo_opcion = $id;
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
					case "respuesta":
						$this->setRespuesta($valor);
					break;
					case "fk_encuesta":
						$this->setFkEncuesta($valor);
					break;
				}
			}
		}
	}
	
	public static function all(){
		$salida = [];
		$query = "SELECT * FROM " . static::$tabla . " WHERE BORRADO='No' " ;
		$stmt = DBcnx::getStatement($query);
		if($stmt->execute()) {
			while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$opcion = new Opciones;
				$opcion->codigo_opcion = $fila['ID'];
				$opcion->respuesta = $fila['RESPUESTA'];
				$opcion->fk_encuesta = $fila['FKENCUESTA'];
				$opcion->cargarDatos($fila);
				$salida[] = $opcion;
			}
		}
		return $salida;
	}
	
	public function crear_opciones($array){
		$query = "INSERT INTO " . static::$tabla . " (RESPUESTA, FKENCUESTA)
				VALUES (?,?)";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["RESPUESTA"],$array["FKENCUESTA"]]);
	}
	
	public static function opciones_de_encuesta($id){
		$salida = [];
		$query = "SELECT * FROM " . static::$tabla . " WHERE FKENCUESTA='$id' " ;
		$stmt = DBcnx::getStatement($query);
		if($stmt->execute()) {
			while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$opcion = new Opciones;
				$opcion->codigo_opcion = $fila['ID'];
				$opcion->respuesta = $fila['RESPUESTA'];
				$opcion->fk_encuesta = $fila['FKENCUESTA'];
				$opcion->cargarDatos($fila);
				$salida[] = $opcion;
			}
		}
		return $salida;
	}
}
?>