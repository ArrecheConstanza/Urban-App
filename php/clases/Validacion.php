<?php
class Validacion{
	protected $validacion;
	protected $dts;
	protected $errores=[];

	public function __construct($dts, $validacion) {
		$this->dts = $dts;
		$this->setReglas($validacion);
		$this->validar();
	}
	public function validar(){
		foreach ($this->validacion as $campo => $arrayValidaciones) {
			foreach ($arrayValidaciones as $unaValidacion) {
				if($unaValidacion=="required"){
					$forma = '_' . $unaValidacion;
					if(method_exists($this, $forma)) {
						$this->{$forma}($campo);
					}
				}
				else if($unaValidacion=="set"){
					$forma = '_' . $unaValidacion;
					if(method_exists($this, $forma)) {
						$this->{$forma}($campo);
					}
				}
				else if($unaValidacion=="email"){
					$forma = '_' . $unaValidacion;
					if(method_exists($this, $forma)) {
						$this->{$forma}($campo);
					}
				}
				else if($unaValidacion=="clave"){
					$forma = '_' . $unaValidacion;
					if(method_exists($this, $forma)) {
						$this->{$forma}($campo);
					}
				}
				else if($unaValidacion=="date"){
					$forma = '_' . $unaValidacion;
					if(method_exists($this, $forma)) {
						$this->{$forma}($campo);
					}
				}
				else if(substr($unaValidacion,0,1)=="m"){
					$reglas = explode(':', $unaValidacion);
					$forma = '_' . $reglas[0];
					$cantidad=$reglas[1];
					if(method_exists($this, $forma)) {
						$this->{$forma}($campo,$cantidad);
					}
				}
			}
		}
	}
	protected function setReglas($validacion){
		foreach ($validacion as $campo => $validacion){
			if(is_string($validacion)){
				$reglas[$campo] = explode('|', $validacion);
			}
		}
		$this->validacion = $reglas;
	}
	public function addError($campo, $mensaje){
		if(isset($this->errores[$campo])) {
			$this->errores[$campo] = [];
		}
		$this->errores[$campo][] = $mensaje;
	}
	public function getErrores(){
		return $this->errores;
	}
	protected function _required($campo){
		if(empty($this->dts[$campo])) {
			$this->addError($campo, "El campo " . $campo . " es obligatorio. ");
		}
	}
	protected function _min($campo,$cantidad){
		if(strlen($this->dts[$campo])<$cantidad) {
			$this->addError($campo, "El campo " . $campo . " debe tener como minimo ".$cantidad." caracteres. ");
		}
	}
	protected function _max($campo,$cantidad){
		if(strlen($this->dts[$campo])>$cantidad) {
			$this->addError($campo, "El campo " . $campo . " debe tener como maximo ".$cantidad." caracteres. ");
		}
	}
	protected function _set($campo){
		if(!($this->dts[$campo]=="Otro"||$this->dts[$campo]=="Mujer"||$this->dts[$campo]=="Hombre")) {
			$this->addError($campo, "El campo " . $campo . " debe ser correcto.");
		}
	}
	protected function _email($campo){
		if (filter_var($this->dts[$campo], FILTER_VALIDATE_EMAIL) === false) {
			$this->addError($campo, "El campo " . $campo . " debe ser correcto. ");
		}
	}
	protected function _date($campo){
		$exp="/^(19[0-9][0-9])(\/|\-)(0?[1-9]|1[0-2])(\/|\-)(0?[1-9]|1[0-9]|2[0-9]|3[0-1])$/";
		if (!preg_match($exp,$this->dts[$campo])) {
			$this->addError($campo, "El campo Fecha Nacimiento debe ser correcto. (+18) ");
		}
	}
	protected function _clave($campo){
		$exp="/^([a-zA-Z\d_#,;~@%&\\\!\$\^\*\(\)\-\+\=\{\}\[\]\:\'\\<\>\.\?\|]{3,15})?$/";
		if (!preg_match($exp,$this->dts[$campo])) {
			$this->addError($campo, "Minimo 3 caracteres, maximo 15. Sin espacios.");
		}
	}
}