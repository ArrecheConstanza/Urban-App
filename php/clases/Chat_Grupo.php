<?php

class Chat_Grupo{
	private $codigo_chat;
	private $codigo_grupo;
	public static $tabla = "chat_grupo";
	private static $fila = ['FKCHAT','FKGRUPO'];

	public function setCodigoChat($a){
		$this->codigo_chat = $a;
	}
	public function getCodigoChat(){
		return $this->codigo_chat;
	}
	public function setCodigoGrupo($a){
		$this->codigo_grupo = $a;
	}
	public function getCodigoGrupo(){
		return $this->codigo_grupo;
	}
	
	public function cargarDatos($fila){
		foreach($fila as $prop => $valor) {
			if(in_array($prop, static::$fila)) {
				switch($prop){
					case "codigo_chat":
						$this->setCodigoChat($valor);
					break;
					case "codigo_grupo":
						$this->setCodigoGrupo($valor);
					break;
				}
			}
		}
	}
	
	public function crear_chat_grupo($array){
		$query = "INSERT INTO " . static::$tabla . " (FKCHAT, FKGRUPO)
				VALUES (?, ?)";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["id_chat"],$array["id_grupo"]]);
	}
	
	/* public function abandonar_chat_usuario($array){
		$query = "DELETE FROM " . static::$tabla . " WHERE FKCHAT=? AND FKUSUARIO=?";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["id_chat"],$array["id_usuario"]]);
	} */
	
	/* public static function traer_chat_grupo($id){
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
	} */
}

?>