<?php

class Chat_Usuario{
	private $codigo_chat;
	private $codigo_usuario;
	public static $tabla = "chat_usuario";
	private static $fila = ['FKUSUARIO', 'FKCHAT'];

	public function setCodigoChat($a){
		$this->codigo_chat = $a;
	}
	public function getCodigoChat(){
		return $this->codigo_chat;
	}
	public function setCodigoUsuario($a){
		$this->codigo_usuario = $a;
	}
	public function getCodigoUsuario(){
		return $this->codigo_usuario;
	}
	
	public function cargarDatos($fila){
		foreach($fila as $prop => $valor) {
			if(in_array($prop, static::$fila)) {
				switch($prop){
					case "codigo_chat":
						$this->setCodigoGrupo($valor);
					break;
					case "codigo_usuario":
						$this->setCodigoUsuario($valor);
					break;
				}
			}
		}
	}
	
	public function crear_chat_usuario($array){
		$query = "INSERT INTO " . static::$tabla . " (FKCHAT, FKUSUARIO)
				VALUES (?, ?)";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["id_chat"],$array["id_usuario"]]);
	}
	
	public function abandonar_chat_usuario($array){
		$query = "DELETE FROM " . static::$tabla . " WHERE FKCHAT=? AND FKUSUARIO=?";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["id_chat"],$array["id_usuario"]]);
	}
	
	public static function traer_chat_usuario($id){
		$salida = [];
		$query = "SELECT * FROM " . static::$tabla . " WHERE FKUSUARIO='$id'";
		$stmt = DBcnx::getStatement($query);
		if($stmt->execute()) {
			while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$chat_usuario = new Chat_Usuario;
				$chat_usuario->codigo_grupo = $fila['FKCHAT'];
				$chat_usuario->cargarDatos($fila);
				$salida[] = $chat_usuario;
			}
		}
		return $salida;
	}
}

?>