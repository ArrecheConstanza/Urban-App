<?php
	
class Grupo{
	private $codigo_grupo;
	private $nombre;
	private $longitud;
	private $latitud;
	private $estado;
	private $borrado;
	private $fk_multimedia;
	public static $tabla = "grupo";
	private static $fila = ['NOMBRE', 'LONGITUD','LATITUD','ESTADO','BORRADO','FKMULTIMEDIA'];

	public function setCodigoGrupo($a){
		$this->codigo_grupo = $a;
	}
	public function getCodigoGrupo(){
		return $this->codigo_grupo;
	}
	public function setNombre($a){
		$this->nombre = $a;
	}
	public function getNombre(){
		return $this->nombre;
	}
	public function getLongitud(){
		return $this->longitud;
	}
	public function setLongitud($a){
		$this->longitud = $a;
	}
	public function getLatitud(){
		return $this->latitud;
	}
	public function setLatitud($a){
		$this->latitud = $a;
	}
	public function getEstado(){
		return $this->estado;
	}
	public function setBorrado($a){
		$this->borrado = $a;
	}
	public function getBorrado(){
		return $this->borrado;
	}
	public function setFkMultimedia($a){
		$this->fk_multimedia = $a;
	}
	public function getFkMultimedia(){
		return $this->fk_multimedia;
	}
	
	public function getByPk($id){
		$query = "SELECT * FROM " . static::$tabla . "
					 WHERE ID = '$id'";
		$stmt = DBcnx::getStatement($query);
		if($stmt->execute()) {
			while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$grupo = new Grupo;
				$grupo->codigo_grupo = $fila['ID'];
				$grupo->nombre = $fila['NOMBRE'];
				$grupo->longitud = $fila['LONGITUD'];
				$grupo->latitud = $fila['LATITUD'];
				$grupo->estado = $fila['ESTADO'];
				$grupo->borrado = $fila['BORRADO'];
				$grupo->fk_multimedia = $fila['FKMULTIMEDIA'];
				$grupo->cargarDatos($fila);
				$salida[] = $grupo;
			}
		}
		return $salida;
	}
	public function cargarDatos($fila){
		foreach($fila as $prop => $valor) {
			if(in_array($prop, static::$fila)) {
				switch($prop){
					case "nombre":
						$this->setNombre($valor);
					break;
					case "estado":
						$this->setEstado($valor);
					break;
					case "longitud":
						$this->setLongitud($valor);
					break;
					case "latitud":
						$this->setLatitud($valor);
					break;
					case "borrado":
						$this->setBorrado($valor);
					break;
					case "fk_multimedia":
						$this->setFkMultimedia($valor);
					break;
				}
			}
		}
	}
	public function eliminar_grupo($array){
		$query = "DELETE FROM grupo WHERE ID=?";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["id"]]);
	}
	public function crear_grupo($array){
		$query = "INSERT INTO " . static::$tabla . " (NOMBRE, LONGITUD, LATITUD, ESTADO)
				VALUES (?, ?, ?, ?)";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["NOMBRE"],$array["LONGITUD"],$array["LATITUD"],$array["ESTADO"]]);
	}

	public function ultimo_grupo_creado(){
		$salida = [];
		$query = "SELECT * FROM ".static::$tabla." ORDER BY ID DESC LIMIT 1";
		$stmt = DBcnx::getStatement($query);
		if($stmt->execute()) {
			while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$grupo = new Grupo;
				$grupo->codigo_grupo = $fila['ID'];
				$grupo->nombre = $fila['NOMBRE'];
				$grupo->longitud = $fila['LONGITUD'];
				$grupo->latitud = $fila['LATITUD'];
				$grupo->estado = $fila['ESTADO'];
				$grupo->borrado = $fila['BORRADO'];
				$grupo->fk_multimedia = $fila['FKMULTIMEDIA'];
				$grupo->cargarDatos($fila);
				$salida[] = $grupo;
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
				$grupo = new Grupo;
				$grupo->codigo_grupo = $fila['ID'];
				$grupo->nombre = $fila['NOMBRE'];
				$grupo->longitud = $fila['LONGITUD'];
				$grupo->latitud = $fila['LATITUD'];
				$grupo->estado = $fila['ESTADO'];
				$grupo->borrado = $fila['BORRADO'];
				$grupo->fk_multimedia = $fila['FKMULTIMEDIA'];
				$grupo->cargarDatos($fila);
				$salida[] = $grupo;
			}
		}
		return $salida;
	}
}
