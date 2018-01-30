<?php

class Usuario{
	private $codigo_usuario;
	private $email;
	private $nombre;
	private $apellido;
	private $clave;
	private $edad;
	private $longitud;
	private $latitud;
	private $direccion;
	private $direccion_estado;
	private $fecha_alta;
	private $banneado;
	private $nivel;
	private $fk_negocio_servicio;
	private $fk_multimedia;
	public static $tabla = "usuario";
	private static $fila = ['EMAIL', 'NOMBRE','APELLIDO','CLAVE','EDAD','LONGITUD','LATITUD','DIRECCION','DIRECCION_ESTADO','FECHA_ALTA','BANNEADO','NIVEL','BORRADO','FK_NEGOCIO_SERVICIO','FKMULTIMEDIA'];

	public function setCodigoUsuario($a){
		$this->codigo_usuario = $a;
	}
	public function getCodigoUsuario(){
		return $this->codigo_usuario;
	}
	public function setEmail($a){
		$this->email = $a;
	}
	public function getEmail(){
		return $this->email;
	}
	public function setNombre($a){
		$this->nombre = $a;
	}
	public function getNombre(){
		return $this->nombre;
	}
	public function setApellido($a){
		$this->apellido = $a;
	}
	public function getApellido(){
		return $this->apellido;
	}
	public function setClave($a){
		$this->clave = $a;
	}
	public function getClave(){
		return $this->clave;
	}
	public function setEdad($a){
		$this->edad = $a;
	}
	public function getEdad(){
		return $this->edad;
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
	public function setDireccion($a){
		$this->direccion = $a;
	}
	public function getDireccion(){
		return $this->direccion;
	}
	public function setDireccionEstado($a){
		$this->direccion_estado = $a;
	}
	public function getDireccionEstado(){
		return $this->direccion_estado;
	}
	public function setNivel($a){
		$this->nivel = $a;
	}
	public function getNivel(){
		return $this->nivel;
	}
	public function setFkNegocioServicio($a){
		$this->fk_negocio_servicio = $a;
	}
	public function getFkNegocioServicio(){
		return $this->fk_negocio_servicio;
	}
	public function setFkMultimedia($a){
		$this->fk_multimedia = $a;
	}
	public function getFkMultimedia(){
		return $this->fk_multimedia;
	}
	
	public function getByPk($id){
	//$this->codigo_usuario = $id;
		$query = "SELECT * FROM " . static::$tabla . "
					WHERE ID = $id";
		$stmt = DBcnx::getStatement($query);
		$stmt->execute([$id]);
		return /* $this->cargarDatos( */$stmt->fetch(PDO::FETCH_ASSOC)/* ) */;
	}
	
	public function getNombreUsuario($id){
	//$this->codigo_usuario = $id;
		$query = "SELECT NOMBRE FROM " . static::$tabla . "
					WHERE ID = $id";
		$stmt = DBcnx::getStatement($query);
		$stmt->execute([$id]);
		return /* $this->cargarDatos( */$stmt->fetch(PDO::FETCH_ASSOC)/* ) */;
	}
	
	public function cargarDatos($fila){
		foreach($fila as $prop => $valor) {
			if(in_array($prop, static::$fila)) {
				switch($prop){
					case "email":
						$this->setEmail($valor);
					break;
					case "clave":
						$this->setClave($valor);
					break;
					case "nombre":
						$this->setNombre($valor);
					break;
					case "apellido":
						$this->setApellido($valor);
					break;
					case "latitud":
						$this->setLatitud($valor);
					break;
					case "longitud":
						$this->setLongitud($valor);
					break;
					case "direccion":
						$this->setDireccion($valor);
					break;
				}
			}
		}
	}
	public function crear_usuario($array){
		$query = "INSERT INTO " . static::$tabla . " (EMAIL, CLAVE, NOMBRE, APELLIDO, EDAD, DIRECCION, LATITUD, LONGITUD, FECHA_ALTA)
				VALUES (?, sha2(?, 224), ?, ?, ?, ?, ?, ?, ?)";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["EMAIL"],$array["CLAVE"],$array["NOMBRE"],$array["APELLIDO"],$array["EDAD"],$array["DIRECCION"],$array["LATITUD"],$array["LONGITUD"],$array["FECHA_ALTA"]]);
	}
	
	public function eliminar_usuario($array){
		$query = "UPDATE " . static::$tabla . "  SET BORRADO=? WHERE ID=? ";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["BORRADO"],$array["ID"]]);
	}
	
	public function editar_usuario($array){
		$query = "UPDATE " . static::$tabla . " SET EMAIL=?, CLAVE=sha2(?, 224), NOMBRE=?,  APELLIDO=?, EDAD=?, DIRECCION=?, LATITUD=?, LONGITUD=? WHERE ID=?";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["EMAIL"],$array["CLAVE"],$array["NOMBRE"],$array["APELLIDO"],$array["EDAD"],$array["DIRECCION"],$array["LATITUD"],$array["LONGITUD"],$array["ID"]]);
	}
	
	public function foto_usuario($array){
		$query = "UPDATE " . static::$tabla . "  SET FKMULTIMEDIA=? WHERE ID=? ";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["FKMULTIMEDIA"],$array["ID"]]);
	}
	
	public function verificar_usuario($mail, $contrasenia){
		$query = "SELECT * FROM " . static::$tabla . " WHERE EMAIL=? AND CLAVE=sha2(?, 224)";
		$stmt = DBcnx::getStatement($query);
		$array=[];
		if($stmt->execute([$mail,$contrasenia])){
			while($f = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$array=$f;
			}
		}
		$json=json_encode($array);
		return $json;
	}
	public static function all(){
		$salida = [];
		$query = "SELECT * FROM " . static::$tabla;
		$stmt = DBcnx::getStatement($query);
		if($stmt->execute()) {
			while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$usuario = new Usuario;
				$usuario->codigo_usuario = $fila['ID'];
				$usuario->usuario = $fila['USUARIO'];
				$usuario->mail = $fila['MAIL'];
				$usuario->nivel = $fila['NIVEL'];
				$usuario->fecha_nacimiento = $fila['FECHA_NACIMIENTO'];
				$usuario->sexo = $fila['SEXO'];
				$usuario->cargarDatos($fila);
				$salida[] = $usuario;
			}
		}
		return $salida;
	}
}
