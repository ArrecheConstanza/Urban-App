<?php

class Denuncia_Publicacion{
	private $codigo_denuncia_usuario;
	private $fk_usuario;
	private $fk_usuario_denunciado;
	private $descripcion;
	
	public static $tabla = "denuncia_usuario";
	private static $fila = ['FKUSUARIO', 'FKUSUARIO_DENUNCIADO', 'DESCRIPCION'];

	public function setCodigoDenunciaUsuario($a){
		$this->codigo_denuncia_usuario = $a;
	}
	public function getCodigoDenunciaUsuario(){
		return $this->codigo_denuncia_usuario;
	}
	public function setFkUsuario($a){
		$this->fk_usuario = $a;
	}
	public function getFkUsuario(){
		return $this->fk_usuario;
	}
	public function setFkUsuarioDenunciado($a){
		$this->fk_usuario_denunciado = $a;
	}
	public function getFkUsuarioDenunciado(){
		return $this->fk_usuario_denunciado;
	}
	
	public function setDescripcion($a){
		$this->descripcion = $a;
	}
	public function getDescripcion(){
		return $this->descripcion;
	}
	
	public function getByPk($id){
		$this->codigo_denuncia_usuario = $id;
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
					case "fk_usuario_denunciado":
						$this->setFkUsuarioDenunciado($valor);
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
		$query = "SELECT * FROM " . static::$tabla . " WHERE FKUSUARIO_DENUNCIADO = '$id'" ;
		$stmt = DBcnx::getStatement($query);
		if($stmt->execute()) {
			while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$denuncia_publicacion = new Denuncia_Usuario;
				$denuncia_publicacion->codigo_denuncia_usuario = $fila['ID'];
				$denuncia_publicacion->fk_usuario = $fila['FKUSUARIO'];
				$denuncia_publicacion->fk_usuario_denunciado = $fila['FKUSUARIO_DENUNCIADO'];
				$denuncia_publicacion->descripcion = $fila['DESCRIPCION'];
				$denuncia_publicacion->cargarDatos($fila);
				$salida[] = $denuncia_publicacion;
			}
		}
		return $salida;
	}
	
	public static function contar_denuncias($id){
		$denuncia_publicacion = new Denuncia_Usuario;
		$rta=$denuncia_publicacion->all($id);
		if(count($rta)>=4){
			return 1; //se bannea el usuario
		}
		else{
			return 0; //no pasa nada
		}
	}
	
	public function crear_denuncia_usuario($array){
		//fijarse si el usuario ya denuncio el usuario
		$salida=[];
		$query = "SELECT * FROM " . static::$tabla . "
					WHERE FKUSUARIO_DENUNCIADO = '$array[FKUSUARIO_DENUNCIADO]' AND FKUSUARIO = '$array[FKUSUARIO]'";
		$stmt = DBcnx::getStatement($query);
		if($stmt->execute()) {
			while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$denuncia_publicacion = new Denuncia_Usuario;
				$denuncia_publicacion->codigo_denuncia_usuario = $fila['ID'];
				$denuncia_publicacion->fk_usuario = $fila['FKUSUARIO'];
				$denuncia_publicacion->fk_usuario_denunciado = $fila['FKUSUARIO_DENUNCIADO'];
				$denuncia_publicacion->descripcion = $fila['DESCRIPCION'];
				$denuncia_publicacion->cargarDatos($fila);
				$salida[] = $denuncia_publicacion;
			}
		}
		if(count($salida)){
			return 3; //denuncia ya realizada
		}
		else{ 
			//denunciar al usuario
			$query = "INSERT INTO " . static::$tabla . " (FKUSUARIO, FKUSUARIO_DENUNCIADO, DESCRIPCION)
				 VALUES (?,?,?)";
			$stmt = DBcnx::getStatement($query);
			return $stmt->execute([$array["FKUSUARIO"],$array["FKUSUARIO_DENUNCIADO"],$array["DESCRIPCION"]]);
		}
	}
}
	

?>