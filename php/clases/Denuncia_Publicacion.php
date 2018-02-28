<?php

class Denuncia_Publicacion{
	private $codigo_denuncia_publicacion;
	private $fk_usuario;
	private $fk_pulicacion;
	
	public static $tabla = "denuncia_publiacion";
	private static $fila = ['FKUSUARIO', 'FKPUBLICACION'];

	public function setCodigoDenunciaPublicacion($a){
		$this->codigo_denuncia_publicacion = $a;
	}
	public function getCodigoDenunciaPublicacion(){
		return $this->codigo_denuncia_publicacion;
	}
	public function setFkPublicacion($a){
		$this->fk_pulicacion = $a;
	}
	public function getFkPublicacion(){
		return $this->fk_pulicacion;
	}
	public function setFkUsuario($a){
		$this->fk_usuario = $a;
	}
	public function getFkUsuario(){
		return $this->fk_usuario;
	}
	
	public function getByPk($id){
		$this->codigo_denuncia_publicacion = $id;
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
					case "fk_usuario":
						$this->setFkUsuario($valor);
					break;
					case "fk_pulicacion":
						$this->setFkPublicacion($valor);
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
				$denuncia_publicacion = new Denuncia_Publicacion;
				$denuncia_publicacion->codigo_denuncia_publicacion = $fila['ID'];
				$denuncia_publicacion->fk_usuario = $fila['FKUSUARIO'];
				$denuncia_publicacion->fk_publicacion = $fila['FKPUBLICACION'];
				$denuncia_publicacion->cargarDatos($fila);
				$salida[] = $denuncia_publicacion;
			}
		}
		return $salida;
	}
	
	public static function contar_denuncias($id){
	/*	$salida = [];
		$query = "SELECT * FROM " . static::$tabla . " WHERE BORRADO='No' AND FKPUBLICACION='$id' " ;
		$stmt = DBcnx::getStatement($query);
		if($stmt->execute()) {
			while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$encuesta = new Encuesta;
				$encuesta->codigo_encuesta = $fila['ID'];
				$encuesta->pregunta = $fila['PREGUNTA'];
				$encuesta->fecha_creacion = $fila['FECHA_CREACION'];
				$encuesta->borrado = $fila['BORRADO'];
				$encuesta->fk_grupo = $fila['FKGRUPO'];
				$encuesta->fk_usuario = $fila['FKUSUARIO'];
				$encuesta->cargarDatos($fila);
				$salida[] = $encuesta;
			}
		}
		return $salida;*/
	}
	

?>