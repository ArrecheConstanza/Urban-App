<?php

class Usuario_Activo_Alarma{
	private $codigo_usuario_activo_alarma;
	private $cuando;
	private $longitud;
	private $latitud;
	private $fk_usuario;
	private $fk_alarma;
	
	public static $tabla = "usuario_activo_alerta";
	private static $fila = ['CUANDO', 'LONGITUD','LATITUD','FKUSUARIO','FKALERTA'];

	public function setCodigoUsuarioActivoAlarma($a){
		$this->codigo_usuario_activo_alarma = $a;
	}
	public function getCodigoUsuarioActivoAlarma(){
		return $this->codigo_usuario_activo_alarma;
	}
	public function setCuando($a){
		$this->cuando = $a;
	}
	public function getCuando(){
		return $this->cuando;
	}
	public function setLongitud($a){
		$this->longitud = $a;
	}
	public function getLongitud(){
		return $this->longitud;
	}
	public function setLatitud($a){
		$this->latitud = $a;
	}
	public function getLatitud(){
		return $this->latitud;
	}
	public function setFkUsuario($a){
		$this->fk_usuario = $a;
	}
	public function getFkUsuario(){
		return $this->fk_usuario;
	}
	public function setFkAlarma($a){
		$this->fk_alarma = $a;
	}
	public function getFkAlarma(){
		return $this->fk_alarma;
	}
	
	public function getByPk($id){
		$this->codigo_usuario_activo_alarma = $id;
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
					case "cuando":
						$this->setCuando($valor);
					break;
					case "longitud":
						$this->setLongitud($valor);
					break;
					case "latitud":
						$this->setLatitud($valor);
					break;
					case "fk_usuario":
						$this->setFkUsuario($valor);
					break;
					case "fk_alarma":
						$this->setFkAlarma($valor);
					break;
				}
			}
		}
	}
	
	public static function all(){
		$salida = [];
		$query = "SELECT * FROM " . static::$tabla ;
		$stmt = DBcnx::getStatement($query);
		if($stmt->execute()) {
			while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$usuario_activo_alarma = new Usuario_Activo_Alarma;
				//$usuario_activo_alarma->codigo_usuario_activo_alarma = $fila['ID'];
				$usuario_activo_alarma->fk_usuario = $fila['FKUSUARIO'];
				$usuario_activo_alarma->cuando = $fila['CUANDO'];
				$usuario_activo_alarma->longitud = $fila['LONGITUD'];
				$usuario_activo_alarma->latitud = $fila['LATITUD'];
				$usuario_activo_alarma->fk_alarma = $fila['FKALERTA'];
				$usuario_activo_alarma->cargarDatos($fila);
				$salida[] = $usuario_activo_alarma;
			}
		}
		return $salida;
	}
	
	public function crear_usuario_activo_alarma($array){
		$query = "INSERT INTO " . static::$tabla . " (CUANDO, LONGITUD, LATITUD, FKALERTA ,FKUSUARIO)
				VALUES (?, ?, ?, ?, ?)";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["CUANDO"],$array["LONGITUD"],$array["LATITUD"],$array["FKALERTA"],$array["FKUSUARIO"]]);
	}

}
?>