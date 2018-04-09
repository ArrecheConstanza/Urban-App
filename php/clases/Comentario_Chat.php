<?php

class Comentario_Chat{
	private $codigo_comentario_chat;
	private $comentario;
	private $comentario_id;
	private $fecha_creacion;
	private $borrado;
	private $fk_usuario;
	private $fk_chat;
	private $fk_multimedia;
	
	public static $tabla = "comentario_chat";
	private static $fila = ['COMENTARIO','COMENTARIO_ID','FECHA_CREACION','BORRADO','FKUSUARIO','FKCHAT','FKMULTIMEDIA'];

	public function setCodigoComentarioChat($a){
		$this->codigo_comentario_chat = $a;
	}
	public function getCodigoComentarioChat(){
		return $this->codigo_comentario_chat;
	}
	public function setComentario($a){
		$this->comentario = $a;
	}
	public function getComentario(){
		return $this->comentario;
	}
	public function setComentario_id($a){
		$this->comentario_id = $a;
	}
	public function getComentario_id(){
		return $this->comentario_id;
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
	public function setFkUsuario($a){
		$this->fk_usuario = $a;
	}
	public function getFkUsuario(){
		return $this->fk_usuario;
	}
	public function setFkChat($a){
		$this->fk_chat = $a;
	}
	public function getFkChat(){
		return $this->fk_chat;
	}
	public function setFkMultimedia($a){
		$this->fk_multimedia = $a;
	}
	public function getFkMultimedia(){
		return $this->fk_multimedia;
	}
	
	public function getByPk($id){
		$this->codigo_comentario_chat = $id;
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
					case "comentario_id":
						$this->setComentario_id($valor);
					break;
					case "fecha_creacion":
						$this->setFechaCracion($valor);
					break;
					case "borrado":
						$this->setBorrado($valor);
					break;
					case "fk_usuario":
						$this->setFkUsuario($valor);
					break;
					case "fk_chat":
						$this->setFkChat($valor);
					break;
					case "fk_multimedia":
						$this->setFkMultimedia($valor);
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
				$comentario_chat = new Comentario_Chat;
				$comentario_chat->codigo_comentario_chat = $fila['ID'];
				$comentario_chat->comentario = $fila['COMENTARIO'];
				$comentario_chat->comentario_id = $fila['COMENTARIO_ID'];
				$comentario_chat->fecha_creacion = $fila['FECHA_CREACION'];
				$comentario_chat->borrado = $fila['BORRADO'];
				$comentario_chat->fk_usuario = $fila['FKUSUARIO'];
				$comentario_chat->fk_chat = $fila['FKCHAT'];
				//$comentario_chat->fk_multimedia = $fila['FKMULTIMEDIA'];
				$comentario_chat->cargarDatos($fila);
				$salida[] = $comentario_chat;
			}
		}
		return $salida;
	}

	public function crear_comentario_chat($array){
		$query = "INSERT INTO " . static::$tabla . " (COMENTARIO,COMENTARIO_ID,FECHA_CREACION,FKUSUARIO,FKCHAT)
				VALUES (?,?,?,?,?)";	
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["COMENTARIO"],$array["COMENTARIO_ID"],$array["FECHA_CREACION"],$array["FKUSUARIO"],$array["FKCHAT"]/* ,$array["FKMULTIMEDIA"] */]);
	}
	
	public function eliminar_comentario_chat($array){
		$query = "UPDATE " . static::$tabla . " SET BORRADO='Si' WHERE ID=? ";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["ID"]]);
	}
		
	public static function listado_comentarios($id){
		$salida = [];
		$query = "SELECT * FROM " . static::$tabla . " WHERE BORRADO='No' AND FKCHAT='$id' " ;
		$stmt = DBcnx::getStatement($query);
		if($stmt->execute()) {
			while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$comentario_chat = new Comentario_Chat;
				$comentario_chat->codigo_comentario_chat = $fila['ID'];
				$comentario_chat->comentario = $fila['COMENTARIO'];
				$comentario_chat->comentario_id = $fila['COMENTARIO_ID'];
				$comentario_chat->fecha_creacion = $fila['FECHA_CREACION'];
				$comentario_chat->borrado = $fila['BORRADO'];
				$comentario_chat->fk_usuario = $fila['FKUSUARIO'];
				$comentario_chat->fk_chat = $fila['FKCHAT'];
				//$comentario_chat->fk_multimedia = $fila['FKMULTIMEDIA'];
				$comentario_chat->cargarDatos($fila);
				$salida[] = $comentario_chat;
			}
		}
		return $salida;
	}

}

?>