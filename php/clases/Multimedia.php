<?php
	
class Multimedia{
	private $codigo_multimedia;
	private $path;
	private $borrado;
	public static $tabla = "multimedia";
	private static $fila = ['DIR','BORRADO'];

	public function setCodigoMultimedia($a){
		$this->codigo_multimedia = $a;
	}
	public function getCodigoMultimedia(){
		return $this->codigo_multimedia;
	}
	public function setBorrado($a){
		$this->borrado = $a;
	}
	public function getBorrado(){
		return $this->borrado;
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
					 WHERE ID=?";
		$stmt = DBcnx::getStatement($query);
		$stmt->execute([$id]);
		return $this->cargarDatos($stmt->fetch(PDO::FETCH_ASSOC));
	}
	public function cargarDatos($fila){
		foreach($fila as $prop => $valor) {
			if(in_array($prop, static::$fila)) {
				switch($prop){
					case "path":
						$this->setPath($valor);
					break;
					case "borrado":
						$this->setBorrado($valor);
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
	public function crear_multimedia($dir){
		$query = "INSERT INTO " . static::$tabla . " (DIR)
				VALUES (?)";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$dir]);
	}
	public function cambiar_fkmultimedia($array,$tabla){
		$query = "UPDATE " . $tabla . "  SET FKMULTIMEDIA=? WHERE ID=? ";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["fk_multimedia"],$array["id"]]);
	}
	public function ultima_multimedia_creada(){
		$salida = [];
		$query = "SELECT * FROM ".static::$tabla." ORDER BY ID DESC LIMIT 1";
		$stmt = DBcnx::getStatement($query);
		if($stmt->execute()) {
			while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$multimedia = new Multimedia;
				$multimedia->codigo_multimedia = $fila['ID'];
				$multimedia->path = $fila['DIR'];
				$multimedia->cargarDatos($fila);
				$salida[] = $multimedia;
			}
		}
		return $salida;
	}
	
	public static function all(){
		$salida = [];
		$query = "SELECT * FROM " . static::$tabla . " WHERE BORRADO='No'";
		$stmt = DBcnx::getStatement($query);
		if($stmt->execute()) {
			while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$multimedia = new Multimedia;
				$multimedia->codigo_multimedia = $fila['ID'];
				$multimedia->path = $fila['DIR'];
				$multimedia->borrado = $fila['BORRADO'];
				$multimedia->cargarDatos($fila);
				$salida[] = $multimedia;
			}
		}
		return $salida;
	}
}
