<?php

class Denuncia_Publicacion{
	private $codigo_denuncia_publicacion;
	private $fk_usuario;
	private $fk_publicacion;
	private $descripcion;
	
	public static $tabla = "denuncia_publicacion";
	private static $fila = ['FKUSUARIO', 'FKPUBLICACION', 'DESCRIPCION'];

	public function setCodigoDenunciaPublicacion($a){
		$this->codigo_denuncia_publicacion = $a;
	}
	public function getCodigoDenunciaPublicacion(){
		return $this->codigo_denuncia_publicacion;
	}
	public function setFkPublicacion($a){
		$this->fk_publicacion = $a;
	}
	public function getFkPublicacion(){
		return $this->fk_publicacion;
	}
	public function setFkUsuario($a){
		$this->fk_usuario = $a;
	}
	public function getFkUsuario(){
		return $this->fk_usuario;
	}
	
	public function setDescripcion($a){
		$this->descripcion = $a;
	}
	public function getDescripcion(){
		return $this->descripcion;
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
					case "fk_publicacion":
						$this->setFkPublicacion($valor);
					break;
					case "descripcion":
						$this->setDescripcion($valor);
					break;
				}
			}
		}
	}
	
	public static function all($id){
		$salida = [];
		$query = "SELECT * FROM " . static::$tabla . " WHERE FKPUBLICACION = '$id'" ;
		$stmt = DBcnx::getStatement($query);
		if($stmt->execute()) {
			while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$denuncia_publicacion = new Denuncia_Publicacion;
				$denuncia_publicacion->codigo_denuncia_publicacion = $fila['ID'];
				$denuncia_publicacion->fk_usuario = $fila['FKUSUARIO'];
				$denuncia_publicacion->fk_publicacion = $fila['FKPUBLICACION'];
				$denuncia_publicacion->descripcion = $fila['DESCRIPCION'];
				$denuncia_publicacion->cargarDatos($fila);
				$salida[] = $denuncia_publicacion;
			}
		}
		return $salida;
	}
	
	public static function contar_denuncias($id){
		$denuncia_publicacion = new Denuncia_Publicacion;
		$rta=$denuncia_publicacion->all($id);
		if(count($rta)>=4){
			return 1; //se borra la publi
		}
		else{
			return 0; //no pasa nada
		}
	}
	
	public function crear_denuncia_publicacion($array){
		//fijarse si el usuario ya denuncio la publicacion
		$salida=[];
		$query = "SELECT * FROM " . static::$tabla . "
					WHERE FKPUBLICACION = '$array[FKPUBLICACION]' AND FKUSUARIO = '$array[FKUSUARIO]'";
		$stmt = DBcnx::getStatement($query);
		if($stmt->execute()) {
			while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$denuncia_publicacion = new Denuncia_Publicacion;
				$denuncia_publicacion->codigo_denuncia_publicacion = $fila['ID'];
				$denuncia_publicacion->fk_usuario = $fila['FKUSUARIO'];
				$denuncia_publicacion->fk_publicacion = $fila['FKPUBLICACION'];
				$denuncia_publicacion->descripcion = $fila['DESCRIPCION'];
				$denuncia_publicacion->cargarDatos($fila);
				$salida[] = $denuncia_publicacion;
			}
		}
		if(count($salida)){
			return 3; //denuncia ya realizada
		}
		else{ 
			//denunciar la publicacion
			$query = "INSERT INTO " . static::$tabla . " (FKUSUARIO, FKPUBLICACION, DESCRIPCION)
				 VALUES (?,?,?)";
			$stmt = DBcnx::getStatement($query);
			return $stmt->execute([$array["FKUSUARIO"],$array["FKPUBLICACION"],$array["DESCRIPCION"]]);
		}
	}
}
	

?>