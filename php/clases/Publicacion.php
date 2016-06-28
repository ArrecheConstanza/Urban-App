<?php

class Publicacion{
	private $codigo_publicacion;
	private $titulo;
	private $descripcion;
	private $avalado;
	private $fecha_creacion;
	private $borrado;
	private $fk_grupo;
	private $fk_usuario;
	
	public static $tabla = "publicacion";
	private static $fila = ['TITULO', 'DESCRIPCION','AVALADO','FECHA_CREACION','BORRADO','FKGRUPO','FKUSUARIO'];

	public function setCodigoPublicacion($a){
		$this->codigo_publicacion = $a;
	}
	public function getCodigoPublicacion(){
		return $this->codigo_publicacion;
	}
	public function setTitulo($a){
		$this->titulo = $a;
	}
	public function getTitulo(){
		return $this->titulo;
	}
	public function setDescripcion($a){
		$this->descripcion = $a;
	}
	public function getDescripcion(){
		return $this->descripcion;
	}
	public function setAvalado($a){
		$this->avalado = $a;
	}
	public function getAvalado(){
		return $this->avalado;
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
		$this->cargarDatos($stmt->fetch(PDO::FETCH_ASSOC));
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
		$query = "SELECT * FROM " . static::$tabla;
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
		}
		return $publicacion;
	}
	
	public function crear_publicacion($array){
		$query = "INSERT INTO " . static::$tabla . " (TITULO, DESCRIPCION, FECHA_CREACION, FKGRUPO, FKUSUARIO)
				VALUES (?,?,?,?,?)";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["TITULO"],$array["DESCRIPCION"],$array["FECHA_CREACION"],$array["FKGRUPO"],$array["FKUSUARIO"]]);
	}

	public function editar_publicacion($array){
		$query = "UPDATE " . static::$tabla . "  SET TITULO=?,CONFESION=? WHERE ID=? ";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["titulo"],$array["confesion"],$array["num_confesion"]]);
	}
	/*
	public function eliminar_usuario($array){
		$query = "DELETE FROM confesion WHERE FKUSUARIO=?";
		$stmt = DBcnx::getStatement($query);
		$stmt->execute([$array["id"]]);
		if($stmt){
			$query = "DELETE FROM " . static::$tabla . " WHERE ID=?";
			$stmt = DBcnx::getStatement($query);
			return $stmt->execute([$array["id"]]);
		}
		else{
			return 0;
		}
	}
	/*public function cambiar_nivel_usuario($array){
		$query = "UPDATE " . static::$tabla . "  SET NIVEL=? WHERE ID=? ";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["nivel"],$array["id"]]);
	}*/
	/*public function crear_usuario($array){
		$query = "INSERT INTO " . static::$tabla . " (EMAIL, CLAVE, NOMBRE, APELLIDO, EDAD, DIRECCION, LATITUD, LONGITUD, FECHA_ALTA)
				VALUES (?, md5(?), ?, ?, ?, ?, ?, ?, ?)";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["EMAIL"],$array["CLAVE"],$array["NOMBRE"],$array["APELLIDO"],$array["EDAD"],$array["DIRECCION"],$array["LATITUD"],$array["LONGITUD"],$array["FECHA_ALTA"]]);
	}
	public function verificar_usuario($mail, $contrasenia){
		$query = "SELECT * FROM " . static::$tabla . " WHERE EMAIL=? AND CLAVE=md5(?)";
		$stmt = DBcnx::getStatement($query);
		$array=[];
		if($stmt->execute([$mail,$contrasenia])){
			while($f = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$array=$f;
			}
		}
		$json=json_encode($array);
		return $json;
	}*/
}
