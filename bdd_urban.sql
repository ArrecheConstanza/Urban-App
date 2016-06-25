DROP DATABASE IF EXISTS urban;
CREATE DATABASE urban;
USE urban;

CREATE TABLE multimedia(
	ID INT(9) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	DIR VARCHAR(45) NOT NULL
);

CREATE TABLE grupo(
	ID INT(9) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	NOMBRE VARCHAR(45) NOT NULL,
	LONGITUD DOUBLE(13,10) NOT NULL,
	LATITUD DOUBLE(13,10) NOT NULL,
	ESTADO ENUM ('Publico','Privado') NOT NULL,
	BORRADO ENUM('Si','No') NOT NULL,
	FKMULTIMEDIA INT(9) UNSIGNED,
	
	FOREIGN KEY (FKMULTIMEDIA) REFERENCES multimedia(ID)
);

CREATE TABLE negocio_servicio(
	ID INT(9) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	NOMBRE VARCHAR(45) NOT NULL,
	LONGITUD DOUBLE(13,10) NOT NULL,
	LATITUD DOUBLE(13,10) NOT NULL,
	DIRECCION VARCHAR(45) NOT NULL,
	DIRECCION_VISIBLE TINYINT(1) NOT NULL,
	FECHA_ALTA DATETIME NOT NULL,
	BORRADO ENUM('Si','No') NOT NULL,
	FKMULTIMEDIA INT(9) UNSIGNED,
	
	FOREIGN KEY (FKMULTIMEDIA) REFERENCES multimedia(ID)
);

CREATE TABLE usuario(
	ID INT(9) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	EMAIL VARCHAR(50) NOT NULL UNIQUE,
	NOMBRE VARCHAR(45) NOT NULL,
	APELLIDO VARCHAR(45) NOT NULL,
	CLAVE VARCHAR(40) NOT NULL,
	EDAD DATE NOT NULL,
	LONGITUD DOUBLE(13,10) NOT NULL,
	LATITUD DOUBLE(13,10) NOT NULL,
	DIRECCION VARCHAR(255) NOT NULL,
	DIRECCION_ESTADO ENUM('Visible','Oculta') NOT NULL,
	FECHA_ALTA DATETIME NOT NULL,
	BANNEADO ENUM('Si','No') NOT NULL,
	NIVEL ENUM('Usuario','Admin') NOT NULL,
	BORRADO ENUM('Si','No') NOT NULL,
	FK_NEGOCIO_SERVICIO INT(9) UNSIGNED,
	FKMULTIMEDIA INT(9) UNSIGNED,
	
	FOREIGN KEY (FK_NEGOCIO_SERVICIO) REFERENCES negocio_servicio(ID),
	FOREIGN KEY (FKMULTIMEDIA) REFERENCES multimedia(ID)
);

CREATE TABLE publicacion(
	ID INT(9) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	TITULO VARCHAR(45) NOT NULL,
	DESCRIPCION VARCHAR(45) NOT NULL,
	AVALADO INT(2),
	FECHA_CREACION DATETIME NOT NULL,
	BORRADO ENUM('Si','No') NOT NULL,
	FKGRUPO INT(9) UNSIGNED NOT NULL,
	FKUSUARIO INT(9) UNSIGNED NOT NULL,
	
	FOREIGN KEY (FKGRUPO) REFERENCES grupo(ID),
	FOREIGN KEY (FKUSUARIO) REFERENCES usuario(ID)
);

CREATE TABLE chat(
	ID INT(9) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	TITULO VARCHAR(45) NOT NULL,
	PRIVADO TINYINT(1) NOT NULL,
	ESTADO ENUM('Publico','Privado') NOT NULL,
	BORRADO ENUM('Si','No') NOT NULL,
	FKGRUPO INT(9) UNSIGNED NOT NULL,
	FKUSUARIO INT(9) UNSIGNED NOT NULL,

	FOREIGN KEY (FKGRUPO) REFERENCES grupo(ID),
	FOREIGN KEY (FKUSUARIO) REFERENCES usuario(ID)
);

CREATE TABLE encuesta(
	ID INT(9) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	PREGUNTA VARCHAR(45) NOT NULL,
	BORRADO ENUM('Si','No') NOT NULL,
	FKGRUPO INT(9) UNSIGNED NOT NULL,
	FKUSUARIO INT(9) UNSIGNED NOT NULL,

	FOREIGN KEY (FKGRUPO) REFERENCES grupo(ID),
	FOREIGN KEY (FKUSUARIO) REFERENCES usuario(ID)
);

CREATE TABLE evento(
	ID INT(9) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	TITULO VARCHAR(45) NOT NULL,
	FECHA_INICIO DATE NOT NULL,
	FECHA_FIN DATE,
	HORA_INICIO TIME NOT NULL,
	HORA_FIN TIME,
	LONGITUD DOUBLE(13,10),
	LATITUD DOUBLE(13,10),
	BORRADO ENUM('Si','No') NOT NULL,
	FKGRUPO INT(9) UNSIGNED NOT NULL,
	FKUSUARIO INT(9) UNSIGNED NOT NULL,
	
	FOREIGN KEY (FKGRUPO) REFERENCES grupo(ID),
	FOREIGN KEY (FKUSUARIO) REFERENCES usuario(ID)
);

CREATE TABLE alerta(
	ID INT(2) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	NOMBRE VARCHAR(45) NOT NULL,
	ICONO VARCHAR(45),
	COLOR INT(6)
);

CREATE TABLE alerta_grupo(
	FKGRUPO INT(9) UNSIGNED NOT NULL,
	FKALERTA INT(9) UNSIGNED NOT NULL,

	FOREIGN KEY (FKGRUPO) REFERENCES grupo(ID),
	FOREIGN KEY (FKALERTA) REFERENCES alerta(ID)
);

CREATE TABLE list_item(
	ID INT(9) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	NOMBRE VARCHAR(45) NOT NULL,
	FECHA_DESDE DATE,
	FECHA_HASTA DATE,
	LONGITUD DOUBLE(13,10),
	LATITUD DOUBLE(13,10),
	BORRADO ENUM('Si','No') NOT NULL,
	DESCRIPCION TEXT,
	FECHA_CREACION DATETIME
);

CREATE TABLE chat_list_item(
	FKCHAT INT(9) UNSIGNED NOT NULL,
	FK_LIST_ITEM INT(9) UNSIGNED NOT NULL,
	FKUSUARIO INT(9) UNSIGNED NOT NULL,
	
	FOREIGN KEY (FKCHAT) REFERENCES chat(ID),
	FOREIGN KEY (FK_LIST_ITEM) REFERENCES list_item(ID),
	FOREIGN KEY (FKUSUARIO) REFERENCES usuario(ID)
);

CREATE TABLE comentario_publicacion(
	COMENTARIO TEXT NOT NULL,
	BORRADO ENUM('Si','No') NOT NULL,
	FKUSUARIO INT(9) UNSIGNED NOT NULL,
	FKPUBLICACION INT(9) UNSIGNED NOT NULL,

	FOREIGN KEY (FKUSUARIO) REFERENCES usuario(ID),
	FOREIGN KEY (FKPUBLICACION) REFERENCES publicacion(ID)
);

CREATE TABLE comentario_chat(
	ID INT(9) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	COMENTARIO TEXT NOT NULL,
	FECHA_CREACION DATETIME NOT NULL,
	FKUSUARIO INT(9) UNSIGNED NOT NULL,
	FKCHAT INT(9) UNSIGNED NOT NULL,
	FKMULTIMEDIA INT(9) UNSIGNED,

	FOREIGN KEY (FKUSUARIO) REFERENCES usuario(ID),
	FOREIGN KEY (FKCHAT) REFERENCES chat(ID),
	FOREIGN KEY (FKMULTIMEDIA) REFERENCES multimedia(ID)
);

CREATE TABLE comentario_destacado(
	FK_COMENTARIO_CHAT INT(9) UNSIGNED NOT NULL,
	FKUSUARIO INT(9) UNSIGNED NOT NULL,

	FOREIGN KEY (FK_COMENTARIO_CHAT) REFERENCES comentario_chat(ID),
	FOREIGN KEY (FKUSUARIO) REFERENCES usuario(ID)
);

CREATE TABLE usuario_grupo(
	FKUSUARIO INT(9) UNSIGNED NOT NULL,
	FKGRUPO INT(9) UNSIGNED NOT NULL,

	FOREIGN KEY (FKUSUARIO) REFERENCES usuario(ID),
	FOREIGN KEY (FKGRUPO) REFERENCES grupo(ID)
);

CREATE TABLE anuncio(
	ID INT(9) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	TARGET INT(5),
	BORRADO ENUM('Si','No') NOT NULL,
	FK_NEGOCIO_SERVICIO INT(9) UNSIGNED NOT NULL,
	FKPUBLICACION INT(9) UNSIGNED NOT NULL,
	FKGRUPO INT(9) UNSIGNED NOT NULL,

	FOREIGN KEY (FK_NEGOCIO_SERVICIO) REFERENCES negocio_servicio(ID),
	FOREIGN KEY (FKPUBLICACION) REFERENCES publicacion(ID),
	FOREIGN KEY (FKGRUPO) REFERENCES grupo(ID)
);

CREATE TABLE opciones(
	ID INT(9) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	RESPUESTA VARCHAR(45) NOT NULL,
	FKENCUESTA INT(9) UNSIGNED NOT NULL,
	FKMULTIMEDIA INT(9) UNSIGNED,

	FOREIGN KEY (FKENCUESTA) REFERENCES encuesta(ID),
	FOREIGN KEY (FKMULTIMEDIA) REFERENCES multimedia(ID)
);

CREATE TABLE respuesta(
	FKUSUARIO INT(9) UNSIGNED NOT NULL,
	FKOPCIONES INT(9) UNSIGNED NOT NULL,
  
	FOREIGN KEY (FKUSUARIO) REFERENCES usuario(ID),
	FOREIGN KEY (FKOPCIONES) REFERENCES opciones(ID)
);

CREATE TABLE usuario_activo_alerta(
	CUANDO DATETIME NOT NULL,
	LONGITUD DOUBLE(13,10) NOT NULL,
	LATITUD DOUBLE(13,10) NOT NULL,
	FKUSUARIO INT(9) UNSIGNED NOT NULL,
	FKALERTA INT(9) UNSIGNED NOT NULL,

	FOREIGN KEY (FKUSUARIO) REFERENCES usuario(ID),
	FOREIGN KEY (FKALERTA) REFERENCES alerta(ID)
);

CREATE TABLE asistencia(
	BORRADO ENUM('Si','No') NOT NULL,
	FKUSUARIO INT(9) UNSIGNED NOT NULL,
	FKEVENTO INT(9) UNSIGNED NOT NULL,

	FOREIGN KEY (FKUSUARIO) REFERENCES usuario(ID),
	FOREIGN KEY (FKEVENTO) REFERENCES evento(ID)
);

CREATE TABLE publicacion_multimedia(
	FKPUBLICACION INT(9) UNSIGNED NOT NULL,
	FKMULTIMEDIA INT(9) UNSIGNED NOT NULL,

	FOREIGN KEY (FKPUBLICACION) REFERENCES publicacion(ID),
	FOREIGN KEY (FKMULTIMEDIA) REFERENCES multimedia(ID)
);

CREATE TABLE list_item_multimedia(
	IMG_PRINCIPAL TINYINT(1),
	FKMULTIMEDIA INT(9) UNSIGNED NOT NULL,
	FK_LIST_ITEM INT(9) UNSIGNED NOT NULL,
	
	FOREIGN KEY (FKMULTIMEDIA) REFERENCES multimedia(ID),
	FOREIGN KEY (FK_LIST_ITEM) REFERENCES list_item(ID)
);

CREATE TABLE evento_multimedia(
	FKEVENTO INT(9) UNSIGNED NOT NULL,
	FKMULTIMEDIA INT(9) UNSIGNED NOT NULL,
	
	FOREIGN KEY (FKEVENTO) REFERENCES evento(ID),
	FOREIGN KEY (FKMULTIMEDIA) REFERENCES multimedia(ID)
);

CREATE TABLE denuncia_publicacion(
	ID INT(9) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	FKUSUARIO INT(9) UNSIGNED NOT NULL,
	FKPUBLICACION INT(9) UNSIGNED NOT NULL,
	
	FOREIGN KEY (FKUSUARIO) REFERENCES usuario(ID),
	FOREIGN KEY (FKPUBLICACION) REFERENCES publicacion(ID)
);

CREATE TABLE denuncia_evento(
	ID INT(9) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	FKUSUARIO INT(9) UNSIGNED NOT NULL,
	FKEVENTO INT(9) UNSIGNED NOT NULL,
	
	FOREIGN KEY (FKUSUARIO) REFERENCES usuario(ID),
	FOREIGN KEY (FKEVENTO) REFERENCES evento(ID)
);

CREATE INDEX index_titulo_grupo
ON grupo (NOMBRE);

CREATE INDEX index_nombre_negocio_servicio
ON negocio_servicio (NOMBRE);

CREATE INDEX index_direccion_negocio_servicio
ON negocio_servicio (DIRECCION);

CREATE INDEX index_nombre_usuario
ON usuario (NOMBRE,APELLIDO);

CREATE INDEX index_titulo_publicacion
ON publicacion (TITULO);

CREATE INDEX index_descripcion_publicacion
ON publicacion (DESCRIPCION);

CREATE INDEX index_titulo_chat
ON chat (TITULO);

CREATE INDEX index_pregunta_encuesta
ON encuesta (PREGUNTA);

CREATE INDEX index_titulo_evento
ON evento (TITULO);

CREATE INDEX index_nombre_list_item
ON list_item (NOMBRE);

CREATE INDEX index_fecha_desde_list_item
ON list_item (FECHA_DESDE);

CREATE INDEX index_comentario_chat
ON comentario_chat (COMENTARIO);



