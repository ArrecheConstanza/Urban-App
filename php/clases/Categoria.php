<?php

class Categoria{
	private $codigo_categoria;
	private $titulo;
	
	public static $tabla = "categoria";
	private static $fila = ['TITULO'];

	public function setCodigoCategoria($a){
		$this->codigo_categoria = $a;
	}
	public function getCodigoCategoria(){
		return $this->codigo_categoria;
	}
	public function setTitulo($a){
		$this->titulo = $a;
	}
	public function getTitulo(){
		return $this->titulo;
	}
	
	public function getByPk($id){
		$this->codigo_categoria = $id;
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
					case "titulo":
						$this->setTitulo($valor);
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
				$categoria = new Categoria;
				$categoria->codigo_categoria = $fila['ID'];
				$categoria->titulo = $fila['TITULO'];
				$categoria->cargarDatos($fila);
				$salida[] = $categoria;
			}
		}
		return $salida;
	}

	public function crear_categoria($array){
		$query = "INSERT INTO " . static::$tabla . " (TITULO)
				VALUES (?)";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["TITULO"]]);
	}

	public function eliminar_categoria($array){
		$query = "UPDATE " . static::$tabla . " SET BORRADO='Si' WHERE ID=? ";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["ID"]]);
	}
}

?>