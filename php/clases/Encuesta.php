<?php

class Encuesta{
	private $codigo_encuesta;
	private $pregunta;
	private $fecha_creacion;
	private $borrado;
	private $fk_grupo;
	private $fk_usuario;
	
	public static $tabla = "encuesta";
	private static $fila = ['PREGUNTA', 'FECHA_CREACION', 'BORRADO','FKGRUPO','FKUSUARIO'];

	public function setCodigoEncuesta($a){
		$this->codigo_encuesta = $a;
	}
	public function getCodigoEncuesta(){
		return $this->codigo_encuesta;
	}
	public function setPregunta($a){
		$this->pregunta = $a;
	}
	public function getPregunta(){
		return $this->pregunta;
	}
	public function setFechaCracion($a){
		$this->fecha_creacion = $a;
	}
	public function getFechaCreacion(){
		return $this->fecha_creacion;
	}
	public function setBorrado($a){
		$this->borrado = $a;
	}
	public function getBorrado(){
		return $this->borrado;
	}
	public function setFkGrupo($a){
		$this->fk_grupo = $a;
	}
	public function getFkGrupo(){
		return $this->fk_grupo;
	}
	public function setFkUsuario($a){
		$this->fk_usuario = $a;
	}
	public function getFkUsuario(){
		return $this->fk_usuario;
	}
	
	public function getByPk($id){
		$this->codigo_publicacion = $id;
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
					case "descripcion":
						$this->setDescripcion($valor);
					break;
					case "avalado":
						$this->setAvalado($valor);
					break;
					case "fecha_creacion":
						$this->setFechaCracion($valor);
					break;
					case "borrado":
						$this->setBorrado($valor);
					break;
					case "fk_grupo":
						$this->setFkGrupo($valor);
					break;
					case "fk_usuario":
						$this->setFkUsuario($valor);
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
				$publicacion = new Publicacion;
				$publicacion->codigo_publicacion = $fila['ID'];
				$publicacion->titulo = $fila['TITULO'];
				$publicacion->descripcion = $fila['DESCRIPCION'];
				$publicacion->avalado = $fila['AVALADO'];
				$publicacion->fecha_creacion = $fila['FECHA_CREACION'];
				$publicacion->borrado = $fila['BORRADO'];
				$publicacion->fk_grupo = $fila['FKGRUPO'];
				$publicacion->fk_usuario = $fila['FKUSUARIO'];
				$publicacion->cargarDatos($fila);
				$salida[] = $publicacion;
			}
		}
		return $salida;
	}

	
	public static function all_grupo($id){
		$salida = [];
		$query = "SELECT * FROM " . static::$tabla . " WHERE BORRADO='No' AND FKGRUPO='$id' " ;
		$stmt = DBcnx::getStatement($query);
		if($stmt->execute()) {
			while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$publicacion = new Publicacion;
				$publicacion->codigo_publicacion = $fila['ID'];
				$publicacion->titulo = $fila['TITULO'];
				$publicacion->descripcion = $fila['DESCRIPCION'];
				$publicacion->avalado = $fila['AVALADO'];
				$publicacion->fecha_creacion = $fila['FECHA_CREACION'];
				$publicacion->borrado = $fila['BORRADO'];
				$publicacion->fk_grupo = $fila['FKGRUPO'];
				$publicacion->fk_usuario = $fila['FKUSUARIO'];
				$publicacion->cargarDatos($fila);
				$salida[] = $publicacion;
			}
		}
		return $salida;
	}
	
	public static function detalle($id){
		$salida = [];
		$query = "SELECT * FROM " . static::$tabla . "WHERE ID='" . $id ."'";
		$stmt = DBcnx::getStatement($query);
		if($stmt->execute()) {
			while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$publicacion = new Publicacion;
				$publicacion->codigo_publicacion = $fila['ID'];
				$publicacion->titulo = $fila['TITULO'];
				$publicacion->descripcion = $fila['DESCRIPCION'];
				$publicacion->avalado = $fila['AVALADO'];
				$publicacion->fecha_creacion = $fila['FECHA_CREACION'];
				$publicacion->borrado = $fila['BORRADO'];
				$publicacion->fk_grupo = $fila['FKGRUPO'];
				$publicacion->fk_usuario = $fila['FKUSUARIO'];
				$publicacion->cargarDatos($fila);
			}
			return $publicacion;
		}
	}
	
	public function crear_publicacion($array){
		$query = "INSERT INTO " . static::$tabla . " (TITULO, DESCRIPCION, FECHA_CREACION, FKGRUPO, FKUSUARIO)
				VALUES (?,?,?,?,?)";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["TITULO"],$array["DESCRIPCION"],$array["FECHA_CREACION"],$array["FKGRUPO"],$array["FKUSUARIO"]]);
	}
	
	public function ultima_publicacion_creada(){
		$query = "SELECT ID FROM " . static::$tabla . " ORDER BY ID DESC LIMIT 1";
		$stmt = DBcnx::getStatement($query);
		if($stmt->execute()) {
			while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$publicacion = new Publicacion;
				$publicacion->codigo_publicacion = $fila['ID'];
				$publicacion->cargarDatos($fila);
			}
			return $publicacion;
		}
		return 0;
	}
	
	public function editar_publicacion($array){
		$query = "UPDATE " . static::$tabla . "  SET TITULO=?, DESCRIPCION=?, FKGRUPO=? WHERE ID=? ";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["TITULO"],$array["DESCRIPCION"],$array["FKGRUPO"],$array["ID"]]);
	}
	
	public function eliminar_publicacion($array){
		$query = "UPDATE " . static::$tabla . " SET BORRADO='Si' WHERE ID=? ";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["ID"]]);
	}
}

?>