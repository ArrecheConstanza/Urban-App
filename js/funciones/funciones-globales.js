/****************************************FUNCIONES GLOBALES****************************************/

function ce(e){
	return document.createElement(e);
}
function ac(p,e){
	return p.appendChild(e);
}
function rc(p,e){
	return p.removeChild(e);
}
function tn(p,e,n){
	if(!isNaN(n)){
		return p.getElementsByTagName(e)[n];
	}
	return p.getElementsByTagName(e);
}
function id(e){
	return document.getElementById(e);
}
function txt(s){
	return document.createTextNode(s);
}

/****************************************VARIABLES GLOBALES****************************************/

var header, footer, grupos;

//////////VENTANA MODAL MENSAJES

function modal(v){
	var div=document.createElement("div");
	div.className="modal";
	var di=document.createElement("div");
	di.className="modal-backdrop in";
	div.appendChild(di);
	var di=document.createElement("div");
	di.className="modal-dialog";
	div.appendChild(di);
	var d=document.createElement("div");
	d.className="modal-content";
	di.appendChild(d);
	var x=document.createElement("a");
	x.href="javascript:void(0);";
	var txt=document.createTextNode("x");
	x.appendChild(txt);
	x.className="close";
	x.style.color="red";
	//x.href='#empresa';
	var div2=document.createElement("div");
	div2.className="form-group botones";
	x.onclick=function(){
		alert("entre");
		document.getElementsByTagName("body")[0].removeChild(div);
	}
	var h4=document.createElement("h4");
	h4.className="modal-header";
	h4.style.textAlign='center';
	var caja_modal=document.createElement("div");
	caja_modal.className="modal-body";
	caja_modal.appendChild(x);
	switch(v){
		case 'nuevo_grupo':
			var txt=document.createTextNode("Crear grupo");
				h4.appendChild(txt);
				caja_modal.appendChild(h4);
				caja_modal.innerHTML+="<div id='container_form'><form role='form' name='crear_grupo' ng-submit='crear_grupo(grupo)'><select class='select' name='estado' ng-model='grupo.ESTADO'><option  value='Publico'>Publico</option><option  value='Privado'>Privado</option></select><input type='text' placeholder='Nombre' class='form-control' required ng-model='grupo.NOMBRE'><div class='col-lg-offset-10 col-md-offset-10 col-sm-offset-8 col-xs-offset-6 col-lg-2 col-md-2 col-sm-4 col-xs-6'> <img ng-show='grupo.FILE.$valid' ngf-src='FILE' class='thumb'><input class='upload-file'  type='file' ngf-select ng-model='grupo.FILE' name='file' accept='image/*' ngf-max-size='2MB' id='foto'></div><input id='button_submit' type='submit' class='form-control btn btn-default' value='Crear'></form></div>";
		break;
		case 'error':
			var txt=document.createTextNode("Ups!! Se ha producido un error!");
				h4.appendChild(txt);
				caja_modal.appendChild(h4);

		break;
		case 'sin_red':
			var txt=document.createTextNode("No dispone de red en este momento. Datos almacenados en telefono");
				h4.appendChild(txt);
				caja_modal.appendChild(h4);

		break;
		case 'ok':
			var txt=document.createTextNode("Operación realizada con éxito");
				h4.appendChild(txt);
				caja_modal.appendChild(h4);
				//x.href='#empresas';
		break;
		default:
			//
		break;
	}
	d.appendChild(caja_modal);
	document.getElementsByTagName("body")[0].appendChild(div);
}

/////////VALIDACION DEL FORM REGISTRO UNO
function validar_form(e,estado){
	switch(e.name){
		case 'nombre': case 'apellido':
			if(!validar_nombre_apellido(e.value)){
				if(!e.value==''){
					var tx=txt('Solo puede poseer letras y espacios');		
				}
			}
			break;
			case 'email':
				if(!validar_email(e.value)){
					var tx=txt('El email es invalido.');
				}
			break;
			case 'clave':
				if(!validar_clave(e.value)){
					var tx=txt('Minimo 3 caracteres, máximo 15. Sin espacios.');
				}
			break;
			case 'edad':
				var edad = new Date(e.value);
				edad=edad.getDate()+"-"+(edad.getMonth()+1)+"-"+edad.getFullYear();
				if(!validar_fecha(edad)){
					var tx=txt('Debes ser mayor de 16 años.');
				}
			break;
		}
		if(tx){
			e.style.borderBottom='solid red 1px';
			var p=tn(e.parentNode,'p',0);
			if(p==undefined){
				p=ce('p');
				p.className='mensaje-validacion';
				ac(p,tx);
				e.parentNode.insertBefore(p,e);
			}
		}
		else{
			if(!estado){
				e.style.borderBottom='1px solid #aaa';
				var p=tn(e.parentNode,'p',0);
				if(p!=undefined){
					rc(p.parentNode,p);
				}
			}
		}
}


/////////VALIDACION DE PUBLICACION
function validar_publicacion(e,estado){
		switch(e.name){
			case 'file':
				if (e.value) {
					if(!validar_foto(e.value)){
						var tx=txt('Solo puede subir imagenes jpg, jpeg y png');
					}
				}
			break;
			case 'titulo':case 'descripcion':
				if (e.value) {
					if(!validar_titulo(e.value)){
						var tx=txt('Minimo 3 caracteres');
					}
				}
			break;
		}
		if(tx){
			e.style.borderBottom='solid red 1px';
			var p=tn(e.parentNode,'p',0);
			if(p==undefined){
				p=ce('p');
				p.className='mensaje-validacion';
				ac(p,tx);
				e.parentNode.insertBefore(p,e);
			}
		}
		else{
			if(!estado){
				e.style.borderBottom='1px solid #aaa';
				var p=tn(e.parentNode,'p',0);
				if(p!=undefined){
					rc(p.parentNode,p);
				}
			}
		}
}

/////////////detallePublicacion

function detallePublicacion(publi){
	var num_publi=tn(publi,"input",0).value;
	localStorage.setItem("id_publi",num_publi);
	window.location.href="/urban-app/index.html#/detallePublicacion";
}














