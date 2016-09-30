<?php

class Publicacion_Comentario{
	private $codigo_publicacion_comentario;
	private $comentario;
	private $borrado;
	private $fecha_creacion;
	private $fk_usuario;
	private $fk_publicacion;
	
	public static $tabla = "comentario_publicacion";
	private static $fila = ['COMENTARIO', 'BORRADO', 'FECHA_CREACION','FKUSUARIO','FKPUBLICACION'];

	public function setCodigoComentarioPublicacion($a){
		$this->codigo_comentario_publicacion = $a;
	}
	public function getCodigoComentarioPublicacion(){
		return $this->codigo_comentario_publicacion;
	}
	public function setComentario($a){
		$this->comentario = $a;
	}
	public function getComentario(){
		return $this->comentario;
	}
	public function setBorrado($a){
		$this->borrado = $a;
	}
	public function getBorrado(){
		return $this->borrado;
	}
	public function setFechaCracion($a){
		$this->fecha_creacion = $a;
	}
	public function getFechaCreacion(){
		return $this->fecha_creacion;
	}
	public function setFkUsuario($a){
		$this->fk_usuario = $a;
	}
	public function getFkUsuario(){
		return $this->fk_usuario;
	}
	public function setFkPublicacion($a){
		$this->fk_publicacion = $a;
	}
	public function getFkPublicacion(){
		return $this->fk_publicacion;
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
					case "comentario":
						$this->setComentario($valor);
					break;
					case "borrado":
						$this->setBorrado($valor);
					break;
					case "fecha_creacion":
						$this->setFechaCracion($valor);
					break;
					case "fk_usuario":
						$this->setFkUsuario($valor);
					break;
					case "fk_publicacion":
						$this->setFkPublicacion($valor);
					break;
				}
			}
		}
	}
	public static function listar_comentario_publicacion($id){
		$salida = [];
		$query = "SELECT * FROM " . static::$tabla . " WHERE BORRADO='No' AND FKPUBLICACION='$id' ";
		$stmt = DBcnx::getStatement($query);
			if($stmt->execute()) {
				while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
					$publicacion_comentario = new Publicacion_Comentario;
					$publicacion_comentario->comentario = $fila['COMENTARIO'];
					$publicacion_comentario->borrado = $fila['BORRADO'];
					$publicacion_comentario->fecha_creacion = $fila['FECHA_CREACION'];
					$publicacion_comentario->fk_usuario = $fila['FKUSUARIO'];
					$publicacion_comentario->cargarDatos($fila);
					$salida[] = $publicacion_comentario;
				}
			}
			return $salida;
	}

	public function crear_comentario_publicacion($array){
		$query = "INSERT INTO " . static::$tabla . " (FKPUBLICACION, COMENTARIO, FECHA_CREACION, FKUSUARIO)
				VALUES (?,?,?,?)";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["FKPUBLICACION"],$array["COMENTARIO"],$array["FECHA_CREACION"],$array["FKUSUARIO"]]);
	}

	public function editar_comentario_publicacion($array){
		$query = "UPDATE " . static::$tabla . "  SET COMENTARIO=? WHERE ID=? ";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["COMENTARIO"],$array["ID"]]);
	}
	
	public function eliminar_comentario_publicacion($array){
		$query = "UPDATE " . static::$tabla . " SET BORRADO='Si' WHERE ID=? ";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["ID"]]);
	}
}

?>