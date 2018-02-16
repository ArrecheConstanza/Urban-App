<?php

class Respuesta{
	private $fk_usuario;
	private $fk_opcion;
	private $fk_encuesta;
	
	public static $tabla = "respuesta";
	private static $fila = ['FKUSUARIO', 'FKOPCION', 'FKENCUESTA'];

	public function setFkUsuario($a){
		$this->fk_usuario = $a;
	}
	public function getFkUsuario(){
		return $this->fk_usuario;
	}
	public function setFkOpcion($a){
		$this->fk_opcion = $a;
	}
	public function getFkOpcion(){
		return $this->fk_opcion;
	}
	public function setFkEncuesta($a){
		$this->fk_encuesta = $a;
	}
	public function getFkEncuesta(){
		return $this->fk_encuesta;
	}
	
	public function cargarDatos($fila){
		foreach($fila as $prop => $valor) {
			if(in_array($prop, static::$fila)) {
				switch($prop){
					case "fk_usuario":
						$this->setFkUsuario($valor);
					break;
					case "fk_opcion":
						$this->setFkOpcion($valor);
					break;
					case "fk_encuesta":
						$this->setFkEncuesta($valor);
					break;
				}
			}
		}
	}
	
	public function crear_respueta($array){
		$query = "INSERT INTO " . static::$tabla . " (FKUSUARIO, FKOPCION,FKENCUESTA)
				VALUES (?,?,?)";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["FKUSUARIO"],$array["FKOPCION"],$array["FKENCUESTA"]]);
	}
	
	public static function traer_respuesta_encuesta($id){
		$salida = [];
		$query = "SELECT * FROM " . static::$tabla . " WHERE FKENCUESTA='$id' " ;
		$stmt = DBcnx::getStatement($query);
		if($stmt->execute()) {
			while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$respuesta = new Respuesta;
				$respuesta->fk_usuario = $fila['FKUSUARIO'];
				$respuesta->fk_opcion = $fila['FKOPCION'];
				$respuesta->fk_encuesta = $fila['FKENCUESTA'];
				$respuesta->cargarDatos($fila);
				$salida[] = $respuesta;
			}
		}
		return $salida;
	}
}
?>