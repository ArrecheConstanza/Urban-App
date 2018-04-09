<?php

class Chat{
	private $codigo_chat;
	//private $titulo;
	//private $estado;
	private $borrado;
	//private $fecha_creacion;
	private $fk_grupo;
	private $fk_usuario;
	//private $fk_multimedia;
	
	public static $tabla = "chat";
	private static $fila = [/*'TITULO', /* 'ESTADO', */'BORRADO'/*, 'FECHA_CREACION' */,'FKGRUPO','FKUSUARIO'/* ,'FKMULTIMEDIA' */];

	public function setCodigoChat($a){
		$this->codigo_chat = $a;
	}
	public function getCodigoChat(){
		return $this->codigo_chat;
	}
	/* public function setTitulo($a){
		$this->titulo = $a;
	}
	public function getTitulo(){
		return $this->titulo;
	} */
	/* public function setEstado($a){
		$this->estado = $a;
	}
	public function getEstado(){
		return $this->estado;
	} */
	public function setBorrado($a){
		$this->borrado = $a;
	}
	public function getBorrado(){
		return $this->borrado;
	}
	/* public function setFechaCreacion($a){
		$this->fecha_creacion = $a;
	}
	public function getFechaCreacion(){
		return $this->fecha_creacion;
	} */
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
/* 	public function setFkMultimedia($a){
		$this->fk_multimedia = $a;
	}
	public function getFkMultimedia(){
		return $this->fk_multimedia;
	} */
	
	public function getByPk($id){
		$this->codigo_chat = $id;
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
					/* case "titulo":
						$this->setTitulo($valor);
					break;
					case "estado":
						$this->setEstado($valor);
					break; */
					case "borrado":
						$this->setBorrado($valor);
					break;
					/* case "fecha_creacion":
						$this->setFechaCreacion($valor);
					break; */
					case "fk_grupo":
						$this->setFkGrupo($valor);
					break;
					case "fk_usuario":
						$this->setFkUsuario($valor);
					break;
					/* case "fk_multimedia":
						$this->setFkMultimedia($valor);
					break; */
				}
			}
		}
	}
	
	public static function all($id){
		$salida = [];
		$query = "SELECT * FROM " . static::$tabla . " WHERE BORRADO='No' AND FKUSUARIO='$id' " ;
		$stmt = DBcnx::getStatement($query);
		if($stmt->execute()) {
			while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$chat = new Chat;
				$chat->codigo_chat = $fila['ID'];
				//$chat->titulo = $fila['TITULO'];
				//$chat->estado = $fila['ESTADO'];
				$chat->borrado = $fila['BORRADO'];
				//$chat->fecha_creacion = $fila['FECHA_CREACION'];
				$chat->fk_grupo = $fila['FKGRUPO'];
				$chat->fk_usuario = $fila['FKUSUARIO'];
				//$chat->fk_multimedia = $fila['FKMULTIMEDIA'];
				$chat->cargarDatos($fila);
				$salida[] = $chat;
			}
		}
		return $salida;
	}
	
	public function crear_chat($array){
		$query = "INSERT INTO " . static::$tabla . " (FKGRUPO, FKUSUARIO)
				VALUES (?,?)";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["id_grupo"],$array["id_usuario"]]);
	}
	
	/* public function editar_chat($array){
		$query = "UPDATE " . static::$tabla . " SET TITULO=?, ESTADO=? WHERE ID=? ";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["TITULO"],$array["ESTADO"],$array["ID"]]);
	} */
	
	public function ultimo_chat_creado(){
		$salida = [];
		$query = "SELECT * FROM ".static::$tabla." ORDER BY ID DESC LIMIT 1";
		$stmt = DBcnx::getStatement($query);
		if($stmt->execute()) {
			while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$chat = new Chat;
				$chat->codigo_chat = $fila['ID'];
				$chat->borrado = $fila['BORRADO'];
				$chat->fk_grupo = $fila['FKGRUPO'];
				$chat->fk_usuario = $fila['FKUSUARIO'];
				$chat->cargarDatos($fila);
				$salida[] = $chat;
			}
		}
		return $salida;
	}
	
	public function eliminar_chat($array){
		$query = "UPDATE " . static::$tabla . " SET BORRADO='Si' WHERE ID=? ";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["ID"]]);
	}
}

?>