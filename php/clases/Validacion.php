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
				else if($unaValidacion=="email"){
					$forma = '_' . $unaValidacion;
					if(method_exists($this, $forma)) {
						$this->{$forma}($campo);
					}
				}
				else if($unaValidacion=="pregunta"){
					$forma = '_' . $unaValidacion;
					if(method_exists($this, $forma)) {
						$this->{$forma}($campo);
					}
				}
				else if($unaValidacion=="nombre"||$unaValidacion=="apellido"){
					$forma = '_nombre';
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
				else if($unaValidacion=="titulo"){
					$forma = '_' . $unaValidacion;
					if(method_exists($this, $forma)) {
						$this->{$forma}($campo);
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
	protected function _email($campo){
		if (filter_var($this->dts[$campo], FILTER_VALIDATE_EMAIL) === false) {
			$this->addError($campo, "El campo " . $campo . " debe ser correcto. ");
		}
	}
	protected function _pregunta($campo){
		$exp="/^([a-zA-Z\d\s_#,;@%&\\\!\$\*\(\)\-\+\=\{\}\[\]\:\'\\<\>\.\?\|]{10,500})?$/";
		if (!preg_match($exp,$this->dts[$campo])) {
			$this->addError($campo, "Mínimo debe poseer 10 caracteres.");
		}
	}
	protected function _nombre($campo){
		$exp="/^[a-záéíóúñ\s]{3,60}$/i";
		if (!preg_match($exp,$this->dts[$campo])) {
			$this->addError($campo, "El campo " . $campo . " solo puede poseer letras y espacios. minimo 3 caracteres ");
		}
	}
	protected function _date($campo){
		$campo=join("-",array_reverse(explode('-',substr($this->dts[$campo],0,10)),true));
		$exp='/^(0?[1-9]|1[0-9]|2[0-9]|3[0-1])(\/|\-)(0?[1-9]|1[0-2])(\/|\-)(19[2-9][0-9]|2000)$/';
		if (!preg_match($exp,$campo)) {
			$this->addError($campo, "Debes ser mayor de 16 años.");
		}
	}
	protected function _opciones($campo){
		$exp="/^([a-zA-Z\d\s_#,;@%&\\\!\$\*\(\)\-\+\=\{\}\[\]\:\'\\<\>\.\?\|]{1,100})?$/";
		if (!preg_match($exp,$this->dts[$campo])) {
			$this->addError($campo, "Mínimo debe poseer 1 caracter.");
		}
	}
	protected function _clave($campo){
		$exp="/^([a-zA-Z\d_#,;~@%&\\\!\$\^\*\(\)\-\+\=\{\}\[\]\:\'\\<\>\.\?\|]{3,15})?$/";
		if (!preg_match($exp,$this->dts[$campo])) {
			$this->addError($campo, "Minimo 3 caracteres, maximo 15. Sin espacios.");
		}
	}
	protected function _titulo($campo){
		$exp="/^([a-zA-Z\d\s_#,;@%&\\\!\$\*\(\)\-\+\=\{\}\[\]\:\'\\<\>\.\?\|]{3,200})?$/";
		if (!preg_match($exp,$this->dts[$campo])) {
			$this->addError($campo, "Minimo 3 caracteres.");
		}
	}

}