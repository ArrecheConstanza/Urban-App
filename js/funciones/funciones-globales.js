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

function modal(v,nombre){
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
	x.href='#empresa';
	var div2=document.createElement("div");
	div2.className="form-group botones";
	x.onclick=function(){
		document.getElementsByTagName("body")[0].removeChild(div);
	}
	var h4=document.createElement("h4");
	h4.className="modal-header";
	h4.style.textAlign='center';
	var body=document.createElement("div");
	body.className="modal-body";
	body.appendChild(x);
	switch(v){
		case 'e':
			var txt=document.createTextNode("Ups!! Se ha producido un error!");
				h4.appendChild(txt);
				body.appendChild(h4);

		break;
		case 'r':
			var txt=document.createTextNode("No dispone de red en este momento. Datos almacenados en LocalStorage");
				h4.appendChild(txt);
				body.appendChild(h4);

		break;
		case 'o':
			var txt=document.createTextNode("Operación realizada con éxito");
				h4.appendChild(txt);
				body.appendChild(h4);
				x.href='#empresas';

		break;
		case 'a':
			var txt=document.createTextNode("Datos de asistencia  almacenados con éxito");
			h4.appendChild(txt);
			body.appendChild(h4);
		break;
		default:
			var txt=document.createTextNode(v);
			var btn1=document.createElement("input");
			var btn1a=document.createElement("a");
			h4.appendChild(txt);
			body.appendChild(h4);
			btn1.type="button";
			btn1.value="SI";
			btn1.className="form-control pull-right";
			btn1a.href="#empresas";
			btn1.onclick=function(){
				document.getElementsByTagName("body")[0].removeChild(div);
				nid=nombre;
			}
			btn1a.appendChild(btn1);
			body.appendChild(btn1a);
			var btn2=document.createElement("input");
			btn2.type="button";
			btn2.value="NO";
			btn2.className="form-control pull-left";
			btn2.onclick=function(){
				document.getElementsByTagName("body")[0].removeChild(div);
			}
			body.appendChild(btn2);
		break;
	}
	d.appendChild(body);
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














