<?php

class Publicacion_Like{
	private $codigo_publicacion_like;
	private $fk_usuario;
	private $fk_publicacion;
	private $borrado;
	
	public static $tabla = "publicacion_like";
	private static $fila = ['FKUSUARIO', 'FKPUBLICACION', 'BORRADO'];

	public function setCodigoPublicacionLike($a){
		$this->codigo_publicacion_like = $a;
	}
	public function getCodigoPublicacionLike(){
		return $this->codigo_publicacion_like;
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
	
	public function setBorrado($a){
		$this->borrado = $a;
	}
	public function getBorrado(){
		return $this->borrado;
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
					case "borrado":
						$this->setBorrado($valor);
					break;
				}
			}
		}
	}
	
	public static function all_likes($id){
		$salida = [];
		$query = "SELECT * FROM " . static::$tabla . " WHERE FKPUBLICACION = '$id'" ;
		$stmt = DBcnx::getStatement($query);
		if($stmt->execute()) {
			while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$publicacion_like = new Publicacion_Like;
				$publicacion_like->codigo_publicacion_like = $fila['ID'];
				$publicacion_like->fk_usuario = $fila['FKUSUARIO'];
				$publicacion_like->fk_publicacion = $fila['FKPUBLICACION'];
				$publicacion_like->borrado = $fila['BORRADO'];
				$publicacion_like->cargarDatos($fila);
				$salida[] = $publicacion_like;
			}
		}
		return $salida;
	}
	
	public function click_like($array){
		$salida=[];
		$borrado="";
		$id;
		$query = "SELECT * FROM " . static::$tabla . "
					WHERE FKPUBLICACION = '$array[FKPUBLICACION]' AND FKUSUARIO = '$array[FKUSUARIO]'";
		$stmt = DBcnx::getStatement($query);
		if($stmt->execute()) {
			while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$publicacion_like = new Publicacion_Like;
				$publicacion_like->codigo_publicacion_like = $fila['ID'];
				$id = $fila['ID'];
				$publicacion_like->fk_usuario = $fila['FKUSUARIO'];
				$publicacion_like->fk_publicacion = $fila['FKPUBLICACION'];
				$publicacion_like->borrado = $fila['BORRADO'];
				$borrado=$fila['BORRADO'];
				$publicacion_like->cargarDatos($fila);
				$salida[] = $publicacion_like;
			}
		}
		//ya likeo almenos una vez
		if(count($salida)){ 
			//pregunto si esta borrado
			if($borrado=='No'){
				$query = "UPDATE " . static::$tabla . "  SET BORRADO='Si' WHERE ID=? ";
				$stmt = DBcnx::getStatement($query);
				return $stmt->execute([$id]);
			}
			//si no esta borrado lo borro
			else{
				$query = "UPDATE " . static::$tabla . "  SET BORRADO='No' WHERE ID=? ";
				$stmt = DBcnx::getStatement($query);
				return $stmt->execute([$id]);
			}
		}
		//crear like
		else{ 
			$query = "INSERT INTO " . static::$tabla . " (FKUSUARIO, FKPUBLICACION)
				 VALUES (?,?)";
			$stmt = DBcnx::getStatement($query);
			return $stmt->execute([$array["FKUSUARIO"],$array["FKPUBLICACION"]]);
		}
	}
}
	

?>