<?php

class Pedidos{
	private $codigo_pedidos;
	private $email;
	private $token;
	private $nueva_clave;
	private $borrado;
	
	public static $tabla = "pedidos";
	private static $fila = ['EMAIL', 'TOKEN','NUEVA_CLAVE','BORRADO'];

	public function setCodigoPedido($a){
		$this->codigo_pedidos = $a;
	}
	public function getCodigoPedido(){
		return $this->codigo_pedidos;
	}
	public function setEmail($a){
		$this->email = $a;
	}
	public function getEmail(){
		return $this->email;
	}
	public function setToken($a){
		$this->token = $a;
	}
	public function getToken(){
		return $this->token;
	}
	public function setNuevaClave($a){
		$this->nueva_clave = $a;
	}
	public function getNuevaClave(){
		return $this->nueva_clave;
	}
	public function setBorrado($a){
		$this->borrado = $a;
	}
	public function getBorrado(){
		return $this->borrado;
	}
	
	public function getByPk($id){
		$query = "SELECT * FROM " . static::$tabla . "
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
					case "nueva_clave":
						$this->setNuevaClave($valor);
					break;
					case "token":
						$this->setToken($valor);
					break;
				}
			}
		}
	}
	
	public function crear_pedido($array){
		$query = "INSERT INTO " . static::$tabla . " SET NUEVA_CLAVE=sha2(?, 224) , EMAIL=?, TOKEN=? , BORRADO='No' ON DUPLICATE KEY UPDATE NUEVA_CLAVE=sha2(?, 224), TOKEN=?, BORRADO='No'";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["NUEVA_CLAVE"],$array["EMAIL"],$array["TOKEN"],$array["NUEVA_CLAVE"],$array["TOKEN"]]);
	}
	
	public function eliminar_pedido($array){
		$query = "UPDATE " . static::$tabla . "  SET BORRADO=? WHERE ID=? ";
		$stmt = DBcnx::getStatement($query);
		return $stmt->execute([$array["BORRADO"],$array["ID"]]);
	}

	public static function all(){
		$salida = [];
		$query = "SELECT * FROM " . static::$tabla;
		$stmt = DBcnx::getStatement($query);
		if($stmt->execute()) {
			while($fila = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$usuario = new Usuario;
				$usuario->codigo_pedidos = $fila['ID'];
				$usuario->email = $fila['EMAIL'];
				$usuario->nueva_clave = $fila['NUEVA_CLAVE'];
				$usuario->token = $fila['TOKEN'];
				$usuario->borrado = $fila['BORRADO'];
				$usuario->cargarDatos($fila);
				$salida[] = $usuario;
			}
		}
		return $salida;
	}
}