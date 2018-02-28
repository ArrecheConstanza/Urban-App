<?php

class Alarma_Grupo{
	private $codigo_alarma_grupo;
	private $fk_grupo;
	private $fk_usuario;
	private $fk_alarma;
	
	public static $tabla = "alarma";
	private static $fila = ['FKGRUPO', 'FKUSUARIO', 'FKALARMA'];

	public function setCodigoAlarmaGrupo($a){
		$this->codigo_alarma_grupo = $a;
	}
	public function getCodigoAlarmaGrupo(){
		return $this->codigo_alarma_grupo;
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
	public function setFkAlarma($a){
		$this->fk_alarma = $a;
	}
	public function getFkAlarma(){
		return $this->fk_alarma;
	}
	
	public function getByPk($id){
		$this->codigo_alarma_grupo = $id;
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
					case "fk_grupo":
						$this->setFkGrupo($valor);
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
				$alarma_grupo = new Alarma_Grupo;
				$alarma_grupo->codigo_alarma_grupo = $fila['ID'];
				$alarma_grupo->fk_grupo = $fila['FKGRUPO'];
				$alarma_grupo->fk_usuario = $fila['FKUSUARIO'];
				$alarma_grupo->fk_alarma = $fila['FKALARMA'];
				$alarma_grupo->cargarDatos($fila);
				$salida[] = $alarma_grupo;
			}
		}
		return $salida;
	}

?>