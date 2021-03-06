<?php

class Usuario_Grupo{
	private $codigo_usuario_grupo;
	private $codigo_grupo;
	private $codigo_usuario;
	public static $tabla = "usuario_grupo";
	private static $fila = ['FKUSUARIO', 'FKGRUPO'];

	public function setCodigoUsuarioGrupo($a){
		$this->codigo_usuario_grupo = $a;
	}
	public function getCodigoUsuarioGrupo(){
		return $this->codigo_usuario_grupo;
	}
	public function setCodigoGrupo($a){
		$this->codigo_grupo = $a;
	}
	public function getCodigoGrupo(){
		return $this->codigo_grupo;
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
					case "codigo_usuario_grupo":
						$this->setCodigoUsuarioGrupo($valor);
					break;
					case "codigo_grupo":
						$this->setCodigoGrupo($valor);
					break;
					case "codigo_usuario":
						$this->setCodigoUsuario($valor);
					break;
				}
			}
		}
	}
	
	public function crear_usuario_grupo($array){
		$query = "INSERT INTO " . static::$tabla . " (FKGRUPO, FKUSUARIO)
				VALUES (?, ?)";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["id_grupo"],$array["id_usuario"]]);
	}
	
	public function abandonar_usuario_grupo($array){
		$query = "DELETE FROM " . static::$tabla . " WHERE FKGRUPO=? AND FKUSUARIO=?";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["id_grupo"],$array["id_usuario"]]);
	}
	
	public static function traer_grupos_usuario($id){
		$salida = [];
		$query = "SELECT * FROM " . static::$tabla . " WHERE FKUSUARIO='$id' ";
		$stmt = DBcnx::getStatement($query);
		if($stmt->execute()) {
			while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$usuario_grupo = new Usuario_Grupo;
				$usuario_grupo->codigo_grupo = $fila['FKGRUPO'];
				$usuario_grupo->cargarDatos($fila);
				$salida[] = $usuario_grupo;
			}
		}
		return $salida;
	}
	
	public static function traer_usuarios_grupo($id){
		$salida = [];
		$query = "SELECT FKUSUARIO FROM " . static::$tabla . " WHERE FKGRUPO='$id'";
		$stmt = DBcnx::getStatement($query);
		if($stmt->execute()) {
			while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$usuario_grupo = new Usuario_Grupo;
				$usuario_grupo->codigo_usuario = $fila['FKUSUARIO'];
				$usuario_grupo->cargarDatos($fila);
				$salida[] = $usuario_grupo;
			}
		}
		return $salida;
	}
}

?>