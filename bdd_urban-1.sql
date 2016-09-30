-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-09-2016 a las 20:50:48
-- Versión del servidor: 10.1.13-MariaDB
-- Versión de PHP: 7.0.5
DROP DATABASE IF EXISTS urban;
CREATE DATABASE urban;
USE urban;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `urban`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alerta`
--

CREATE TABLE `alerta` (
  `ID` int(2) UNSIGNED NOT NULL,
  `NOMBRE` varchar(45) NOT NULL,
  `ICONO` varchar(45) DEFAULT NULL,
  `COLOR` int(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alerta_grupo`
--

CREATE TABLE `alerta_grupo` (
  `FKGRUPO` int(9) UNSIGNED NOT NULL,
  `FKALERTA` int(9) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `anuncio`
--

CREATE TABLE `anuncio` (
  `ID` int(9) UNSIGNED NOT NULL,
  `TARGET` int(5) DEFAULT NULL,
  `BORRADO` enum('Si','No') NOT NULL DEFAULT 'No',
  `FK_NEGOCIO_SERVICIO` int(9) UNSIGNED NOT NULL,
  `FKPUBLICACION` int(9) UNSIGNED NOT NULL,
  `FKGRUPO` int(9) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencia`
--

CREATE TABLE `asistencia` (
  `BORRADO` enum('Si','No') NOT NULL,
  `FKUSUARIO` int(9) UNSIGNED NOT NULL,
  `FKEVENTO` int(9) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chat`
--

CREATE TABLE `chat` (
  `ID` int(9) UNSIGNED NOT NULL,
  `TITULO` varchar(45) NOT NULL,
  `PRIVADO` tinyint(1) NOT NULL,
  `ESTADO` enum('Publico','Privado') NOT NULL DEFAULT 'Publico',
  `BORRADO` enum('Si','No') NOT NULL,
  `FKGRUPO` int(9) UNSIGNED NOT NULL,
  `FKUSUARIO` int(9) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chat_list_item`
--

CREATE TABLE `chat_list_item` (
  `FKCHAT` int(9) UNSIGNED NOT NULL,
  `FK_LIST_ITEM` int(9) UNSIGNED NOT NULL,
  `FKUSUARIO` int(9) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentario_chat`
--

CREATE TABLE `comentario_chat` (
  `ID` int(9) UNSIGNED NOT NULL,
  `COMENTARIO` text NOT NULL,
  `FECHA_CREACION` datetime NOT NULL,
  `FKUSUARIO` int(9) UNSIGNED NOT NULL,
  `FKCHAT` int(9) UNSIGNED NOT NULL,
  `FKMULTIMEDIA` int(9) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentario_destacado`
--

CREATE TABLE `comentario_destacado` (
  `FK_COMENTARIO_CHAT` int(9) UNSIGNED NOT NULL,
  `FKUSUARIO` int(9) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentario_publicacion`
--

CREATE TABLE `comentario_publicacion` (
  `COMENTARIO` text NOT NULL,
  `BORRADO` enum('Si','No') NOT NULL DEFAULT 'No',
  `FKUSUARIO` int(9) UNSIGNED NOT NULL,
  `FKPUBLICACION` int(9) UNSIGNED NOT NULL,
  `FECHA_CREACION` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `comentario_publicacion`
--

INSERT INTO `comentario_publicacion` (`COMENTARIO`, `BORRADO`, `FKUSUARIO`, `FKPUBLICACION`, `FECHA_CREACION`) VALUES
('lalalalal', 'No', 1, 13, '2016-09-22 16:21:45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `denuncia_evento`
--

CREATE TABLE `denuncia_evento` (
  `ID` int(9) UNSIGNED NOT NULL,
  `FKUSUARIO` int(9) UNSIGNED NOT NULL,
  `FKEVENTO` int(9) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `denuncia_publicacion`
--

CREATE TABLE `denuncia_publicacion` (
  `ID` int(9) UNSIGNED NOT NULL,
  `FKUSUARIO` int(9) UNSIGNED NOT NULL,
  `FKPUBLICACION` int(9) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuesta`
--

CREATE TABLE `encuesta` (
  `ID` int(9) UNSIGNED NOT NULL,
  `PREGUNTA` varchar(45) NOT NULL,
  `BORRADO` enum('Si','No') NOT NULL,
  `FKGRUPO` int(9) UNSIGNED NOT NULL,
  `FKUSUARIO` int(9) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evento`
--

CREATE TABLE `evento` (
  `ID` int(9) UNSIGNED NOT NULL,
  `TITULO` varchar(45) NOT NULL,
  `FECHA_INICIO` date NOT NULL,
  `FECHA_FIN` date DEFAULT NULL,
  `HORA_INICIO` time NOT NULL,
  `HORA_FIN` time DEFAULT NULL,
  `LONGITUD` double(13,10) DEFAULT NULL,
  `LATITUD` double(13,10) DEFAULT NULL,
  `BORRADO` enum('Si','No') NOT NULL,
  `FKGRUPO` int(9) UNSIGNED NOT NULL,
  `FKUSUARIO` int(9) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evento_multimedia`
--

CREATE TABLE `evento_multimedia` (
  `FKEVENTO` int(9) UNSIGNED NOT NULL,
  `FKMULTIMEDIA` int(9) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupo`
--

CREATE TABLE `grupo` (
  `ID` int(9) UNSIGNED NOT NULL,
  `NOMBRE` varchar(45) NOT NULL,
  `LONGITUD` double(13,10) NOT NULL,
  `LATITUD` double(13,10) NOT NULL,
  `ESTADO` enum('Publico','Privado') NOT NULL DEFAULT 'Publico',
  `BORRADO` enum('Si','No') NOT NULL DEFAULT 'No',
  `FKMULTIMEDIA` int(9) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `grupo`
--

INSERT INTO `grupo` (`ID`, `NOMBRE`, `LONGITUD`, `LATITUD`, `ESTADO`, `BORRADO`, `FKMULTIMEDIA`) VALUES
(1, 'Vecinos de washington', -58.4704620000, -34.5684254000, 'Publico', 'No', 1),
(2, 'echeverria y donado torre', -58.4741507349, -34.5725230614, 'Privado', 'No', 2),
(7, 'home', -58.4635077296, -34.5708622123, 'Privado', 'No', NULL),
(8, 'aaaaa', -58.4692583857, -34.5748552617, 'Publico', 'No', 8),
(9, 'aaaaaaaa', -58.4692583857, -34.5748552617, 'Publico', 'No', 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `list_item`
--

CREATE TABLE `list_item` (
  `ID` int(9) UNSIGNED NOT NULL,
  `NOMBRE` varchar(45) NOT NULL,
  `FECHA_DESDE` date DEFAULT NULL,
  `FECHA_HASTA` date DEFAULT NULL,
  `LONGITUD` double(13,10) DEFAULT NULL,
  `LATITUD` double(13,10) DEFAULT NULL,
  `BORRADO` enum('Si','No') NOT NULL,
  `DESCRIPCION` text,
  `FECHA_CREACION` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `list_item_multimedia`
--

CREATE TABLE `list_item_multimedia` (
  `IMG_PRINCIPAL` tinyint(1) DEFAULT NULL,
  `FKMULTIMEDIA` int(9) UNSIGNED NOT NULL,
  `FK_LIST_ITEM` int(9) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `multimedia`
--

CREATE TABLE `multimedia` (
  `ID` int(9) UNSIGNED NOT NULL,
  `DIR` varchar(100) NOT NULL,
  `BORRADO` enum('Si','No') NOT NULL DEFAULT 'No'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `multimedia`
--

INSERT INTO `multimedia` (`ID`, `DIR`, `BORRADO`) VALUES
(1, 'C:/xampp/htdocs/Urban-App/img/grupos/Vecinos de washington__1/delete_hover.png', 'No'),
(2, 'C:/xampp/htdocs/Urban-App/img/grupos/echeverria y donado torre__2/splash.jpg', 'No'),
(3, 'C:/xampp/htdocs/Urban-App/img/grupos/echeverria y donado torre__3/splash.jpg', 'No'),
(4, 'C:/xampp/htdocs/Urban-App/img/grupos/mas__4/logo.png', 'No'),
(5, 'C:/xampp/htdocs/Urban-App/img/grupos/LLLL__5/minilogo.png', 'No'),
(6, 'C:/xampp/htdocs/Urban-App/img/grupos/Kala__6/QR.png', 'No'),
(7, 'C:/xampp/htdocs/Urban-App/img/grupos/home__7/icon.png', 'No'),
(8, 'C:/xampp/htdocs/Urban-App/img/grupos/aaaaa__8/8ea65cc14a5d075926220d69f0bc9f8c.jpg', 'No'),
(9, 'C:/xampp/htdocs/Urban-App/img/grupos/aaaaaaaa__9/8ea65cc14a5d075926220d69f0bc9f8c.jpg', 'No'),
(10, 'C:/xampp/htdocs/Urban-App/img/publicaciones/7/QR.png', 'No'),
(11, 'C:/xampp/htdocs/Urban-App/img/publicaciones/8/QR.png', 'No'),
(12, 'C:/xampp/htdocs/Urban-App/img/publicaciones/9/QR.png', 'No'),
(13, 'C:/xampp/htdocs/Urban-App/img/publicaciones/10/icon.png', 'No'),
(14, 'C:/xampp/htdocs/Urban-App/img/publicaciones/11/QR.png', 'No'),
(15, 'C:/xampp/htdocs/Urban-App/img/publicaciones/12/QR.png', 'No'),
(16, 'C:/xampp/htdocs/Urban-App/img/publicaciones/13/QR.png', 'No'),
(17, 'C:/xampp/htdocs/Urban-App/img/publicaciones/14/icon.png', 'No'),
(18, 'C:/xampp/htdocs/Urban-App/img/publicaciones/15/icon.png', 'No');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `negocio_servicio`
--

CREATE TABLE `negocio_servicio` (
  `ID` int(9) UNSIGNED NOT NULL,
  `NOMBRE` varchar(45) NOT NULL,
  `LONGITUD` double(13,10) NOT NULL,
  `LATITUD` double(13,10) NOT NULL,
  `DIRECCION` varchar(45) NOT NULL,
  `DIRECCION_VISIBLE` tinyint(1) NOT NULL,
  `FECHA_ALTA` datetime NOT NULL,
  `BORRADO` enum('Si','No') NOT NULL,
  `FKMULTIMEDIA` int(9) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `opciones`
--

CREATE TABLE `opciones` (
  `ID` int(9) UNSIGNED NOT NULL,
  `RESPUESTA` varchar(45) NOT NULL,
  `FKENCUESTA` int(9) UNSIGNED NOT NULL,
  `FKMULTIMEDIA` int(9) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicacion`
--

CREATE TABLE `publicacion` (
  `ID` int(9) UNSIGNED NOT NULL,
  `TITULO` varchar(45) NOT NULL,
  `DESCRIPCION` varchar(45) NOT NULL,
  `AVALADO` int(2) DEFAULT NULL,
  `FECHA_CREACION` datetime NOT NULL,
  `BORRADO` enum('Si','No') NOT NULL DEFAULT 'No',
  `FKGRUPO` int(9) UNSIGNED NOT NULL,
  `FKUSUARIO` int(9) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `publicacion`
--

INSERT INTO `publicacion` (`ID`, `TITULO`, `DESCRIPCION`, `AVALADO`, `FECHA_CREACION`, `BORRADO`, `FKGRUPO`, `FKUSUARIO`) VALUES
(6, 'jnfiefnew fnewn f', 'few hifw eufi wef ewfyew fwe fwe', NULL, '2016-09-14 18:20:41', 'No', 1, 1),
(7, 'aaaaaa', 'grgreg g55 4y54 y4y 56h 5h56h65', NULL, '2016-09-15 16:51:55', 'No', 1, 1),
(8, 'aaaaaa', 'grgreg g55 4y54 y4y 56h 5h56h65', NULL, '2016-09-15 16:51:55', 'No', 1, 1),
(9, 'lllll llll ll l', 'fewfwe wt43t 43t34t43 t43 tewfsfwe', NULL, '2016-09-15 16:53:27', 'No', 1, 1),
(10, 'aaaa vvv', 'csacas few ewrewrwer twtw', NULL, '2016-09-15 16:54:52', 'No', 1, 1),
(11, 'BLABLAAA A A A', 'LLLLLLLL LLLLLL LLL\r\nLLLL', NULL, '2016-09-15 19:48:50', 'No', 2, 1),
(12, 'sarasa', 'blaafjewn ejwg g rigbrheg erhj g', NULL, '2016-09-15 19:54:26', 'No', 1, 1),
(13, 'sasasasa', 'feng whg regh e guier', NULL, '2016-09-15 19:55:00', 'No', 1, 1),
(14, 'ssssssss', 'aaadfew fef e f  f ee f e f ef fe f', NULL, '2016-09-15 19:56:00', 'Si', 1, 1),
(15, 'ngirek rguir iugre', 'vtb  f tft t yt', NULL, '2016-09-15 20:01:51', 'Si', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicacion_multimedia`
--

CREATE TABLE `publicacion_multimedia` (
  `FKPUBLICACION` int(9) UNSIGNED NOT NULL,
  `FKMULTIMEDIA` int(9) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `publicacion_multimedia`
--

INSERT INTO `publicacion_multimedia` (`FKPUBLICACION`, `FKMULTIMEDIA`) VALUES
(9, 12),
(10, 13),
(11, 14),
(12, 15),
(13, 16),
(14, 17),
(15, 18);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuesta`
--

CREATE TABLE `respuesta` (
  `FKUSUARIO` int(9) UNSIGNED NOT NULL,
  `FKOPCIONES` int(9) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `ID` int(9) UNSIGNED NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `NOMBRE` varchar(45) NOT NULL,
  `APELLIDO` varchar(45) NOT NULL,
  `CLAVE` varchar(40) NOT NULL,
  `EDAD` date NOT NULL,
  `LONGITUD` double(13,10) NOT NULL,
  `LATITUD` double(13,10) NOT NULL,
  `DIRECCION` varchar(255) NOT NULL,
  `DIRECCION_ESTADO` enum('Visible','Oculta') NOT NULL DEFAULT 'Oculta',
  `FECHA_ALTA` datetime NOT NULL,
  `BANNEADO` enum('Si','No') NOT NULL DEFAULT 'No',
  `NIVEL` enum('Usuario','Admin') NOT NULL DEFAULT 'Usuario',
  `BORRADO` enum('Si','No') NOT NULL DEFAULT 'No',
  `FK_NEGOCIO_SERVICIO` int(9) UNSIGNED DEFAULT NULL,
  `FKMULTIMEDIA` int(9) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`ID`, `EMAIL`, `NOMBRE`, `APELLIDO`, `CLAVE`, `EDAD`, `LONGITUD`, `LATITUD`, `DIRECCION`, `DIRECCION_ESTADO`, `FECHA_ALTA`, `BANNEADO`, `NIVEL`, `BORRADO`, `FK_NEGOCIO_SERVICIO`, `FKMULTIMEDIA`) VALUES
(1, 'iara@hotmail.com', 'iara', 'nizza', '81dc9bdb52d04dc20036dbd8313ed055', '1992-09-12', -58.4703785000, -34.5681010000, 'washington 1111', 'Oculta', '2016-09-06 00:00:00', 'No', 'Admin', 'No', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_activo_alerta`
--

CREATE TABLE `usuario_activo_alerta` (
  `CUANDO` datetime NOT NULL,
  `LONGITUD` double(13,10) NOT NULL,
  `LATITUD` double(13,10) NOT NULL,
  `FKUSUARIO` int(9) UNSIGNED NOT NULL,
  `FKALERTA` int(9) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_grupo`
--

CREATE TABLE `usuario_grupo` (
  `FKUSUARIO` int(9) UNSIGNED NOT NULL,
  `FKGRUPO` int(9) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario_grupo`
--

INSERT INTO `usuario_grupo` (`FKUSUARIO`, `FKGRUPO`) VALUES
(1, 1),
(1, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alerta`
--
ALTER TABLE `alerta`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `alerta_grupo`
--
ALTER TABLE `alerta_grupo`
  ADD KEY `FKGRUPO` (`FKGRUPO`),
  ADD KEY `FKALERTA` (`FKALERTA`);

--
-- Indices de la tabla `anuncio`
--
ALTER TABLE `anuncio`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_NEGOCIO_SERVICIO` (`FK_NEGOCIO_SERVICIO`),
  ADD KEY `FKPUBLICACION` (`FKPUBLICACION`),
  ADD KEY `FKGRUPO` (`FKGRUPO`);

--
-- Indices de la tabla `asistencia`
--
ALTER TABLE `asistencia`
  ADD KEY `FKUSUARIO` (`FKUSUARIO`),
  ADD KEY `FKEVENTO` (`FKEVENTO`);

--
-- Indices de la tabla `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FKGRUPO` (`FKGRUPO`),
  ADD KEY `FKUSUARIO` (`FKUSUARIO`),
  ADD KEY `index_titulo_chat` (`TITULO`);

--
-- Indices de la tabla `chat_list_item`
--
ALTER TABLE `chat_list_item`
  ADD KEY `FKCHAT` (`FKCHAT`),
  ADD KEY `FK_LIST_ITEM` (`FK_LIST_ITEM`),
  ADD KEY `FKUSUARIO` (`FKUSUARIO`);

--
-- Indices de la tabla `comentario_chat`
--
ALTER TABLE `comentario_chat`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FKUSUARIO` (`FKUSUARIO`),
  ADD KEY `FKCHAT` (`FKCHAT`),
  ADD KEY `FKMULTIMEDIA` (`FKMULTIMEDIA`);

--
-- Indices de la tabla `comentario_destacado`
--
ALTER TABLE `comentario_destacado`
  ADD KEY `FK_COMENTARIO_CHAT` (`FK_COMENTARIO_CHAT`),
  ADD KEY `FKUSUARIO` (`FKUSUARIO`);

--
-- Indices de la tabla `comentario_publicacion`
--
ALTER TABLE `comentario_publicacion`
  ADD KEY `FKUSUARIO` (`FKUSUARIO`),
  ADD KEY `FKPUBLICACION` (`FKPUBLICACION`);

--
-- Indices de la tabla `denuncia_evento`
--
ALTER TABLE `denuncia_evento`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FKUSUARIO` (`FKUSUARIO`),
  ADD KEY `FKEVENTO` (`FKEVENTO`);

--
-- Indices de la tabla `denuncia_publicacion`
--
ALTER TABLE `denuncia_publicacion`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FKUSUARIO` (`FKUSUARIO`),
  ADD KEY `FKPUBLICACION` (`FKPUBLICACION`);

--
-- Indices de la tabla `encuesta`
--
ALTER TABLE `encuesta`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FKGRUPO` (`FKGRUPO`),
  ADD KEY `FKUSUARIO` (`FKUSUARIO`),
  ADD KEY `index_pregunta_encuesta` (`PREGUNTA`);

--
-- Indices de la tabla `evento`
--
ALTER TABLE `evento`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FKGRUPO` (`FKGRUPO`),
  ADD KEY `FKUSUARIO` (`FKUSUARIO`),
  ADD KEY `index_titulo_evento` (`TITULO`);

--
-- Indices de la tabla `evento_multimedia`
--
ALTER TABLE `evento_multimedia`
  ADD KEY `FKEVENTO` (`FKEVENTO`),
  ADD KEY `FKMULTIMEDIA` (`FKMULTIMEDIA`);

--
-- Indices de la tabla `grupo`
--
ALTER TABLE `grupo`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FKMULTIMEDIA` (`FKMULTIMEDIA`),
  ADD KEY `index_titulo_grupo` (`NOMBRE`);

--
-- Indices de la tabla `list_item`
--
ALTER TABLE `list_item`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `index_nombre_list_item` (`NOMBRE`),
  ADD KEY `index_fecha_desde_list_item` (`FECHA_DESDE`);

--
-- Indices de la tabla `list_item_multimedia`
--
ALTER TABLE `list_item_multimedia`
  ADD KEY `FKMULTIMEDIA` (`FKMULTIMEDIA`),
  ADD KEY `FK_LIST_ITEM` (`FK_LIST_ITEM`);

--
-- Indices de la tabla `multimedia`
--
ALTER TABLE `multimedia`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `negocio_servicio`
--
ALTER TABLE `negocio_servicio`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FKMULTIMEDIA` (`FKMULTIMEDIA`),
  ADD KEY `index_nombre_negocio_servicio` (`NOMBRE`),
  ADD KEY `index_direccion_negocio_servicio` (`DIRECCION`);

--
-- Indices de la tabla `opciones`
--
ALTER TABLE `opciones`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FKENCUESTA` (`FKENCUESTA`),
  ADD KEY `FKMULTIMEDIA` (`FKMULTIMEDIA`);

--
-- Indices de la tabla `publicacion`
--
ALTER TABLE `publicacion`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FKGRUPO` (`FKGRUPO`),
  ADD KEY `FKUSUARIO` (`FKUSUARIO`),
  ADD KEY `index_titulo_publicacion` (`TITULO`),
  ADD KEY `index_descripcion_publicacion` (`DESCRIPCION`);

--
-- Indices de la tabla `publicacion_multimedia`
--
ALTER TABLE `publicacion_multimedia`
  ADD KEY `FKPUBLICACION` (`FKPUBLICACION`),
  ADD KEY `FKMULTIMEDIA` (`FKMULTIMEDIA`);

--
-- Indices de la tabla `respuesta`
--
ALTER TABLE `respuesta`
  ADD KEY `FKUSUARIO` (`FKUSUARIO`),
  ADD KEY `FKOPCIONES` (`FKOPCIONES`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `EMAIL` (`EMAIL`),
  ADD KEY `FK_NEGOCIO_SERVICIO` (`FK_NEGOCIO_SERVICIO`),
  ADD KEY `FKMULTIMEDIA` (`FKMULTIMEDIA`),
  ADD KEY `index_nombre_usuario` (`NOMBRE`,`APELLIDO`);

--
-- Indices de la tabla `usuario_activo_alerta`
--
ALTER TABLE `usuario_activo_alerta`
  ADD KEY `FKUSUARIO` (`FKUSUARIO`),
  ADD KEY `FKALERTA` (`FKALERTA`);

--
-- Indices de la tabla `usuario_grupo`
--
ALTER TABLE `usuario_grupo`
  ADD KEY `FKUSUARIO` (`FKUSUARIO`),
  ADD KEY `FKGRUPO` (`FKGRUPO`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alerta`
--
ALTER TABLE `alerta`
  MODIFY `ID` int(2) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `anuncio`
--
ALTER TABLE `anuncio`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `chat`
--
ALTER TABLE `chat`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `comentario_chat`
--
ALTER TABLE `comentario_chat`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `denuncia_evento`
--
ALTER TABLE `denuncia_evento`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `denuncia_publicacion`
--
ALTER TABLE `denuncia_publicacion`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `encuesta`
--
ALTER TABLE `encuesta`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `evento`
--
ALTER TABLE `evento`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `grupo`
--
ALTER TABLE `grupo`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `list_item`
--
ALTER TABLE `list_item`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `multimedia`
--
ALTER TABLE `multimedia`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT de la tabla `negocio_servicio`
--
ALTER TABLE `negocio_servicio`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `opciones`
--
ALTER TABLE `opciones`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `publicacion`
--
ALTER TABLE `publicacion`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alerta_grupo`
--
ALTER TABLE `alerta_grupo`
  ADD CONSTRAINT `alerta_grupo_ibfk_1` FOREIGN KEY (`FKGRUPO`) REFERENCES `grupo` (`ID`),
  ADD CONSTRAINT `alerta_grupo_ibfk_2` FOREIGN KEY (`FKALERTA`) REFERENCES `alerta` (`ID`);

--
-- Filtros para la tabla `anuncio`
--
ALTER TABLE `anuncio`
  ADD CONSTRAINT `anuncio_ibfk_1` FOREIGN KEY (`FK_NEGOCIO_SERVICIO`) REFERENCES `negocio_servicio` (`ID`),
  ADD CONSTRAINT `anuncio_ibfk_2` FOREIGN KEY (`FKPUBLICACION`) REFERENCES `publicacion` (`ID`),
  ADD CONSTRAINT `anuncio_ibfk_3` FOREIGN KEY (`FKGRUPO`) REFERENCES `grupo` (`ID`);

--
-- Filtros para la tabla `asistencia`
--
ALTER TABLE `asistencia`
  ADD CONSTRAINT `asistencia_ibfk_1` FOREIGN KEY (`FKUSUARIO`) REFERENCES `usuario` (`ID`),
  ADD CONSTRAINT `asistencia_ibfk_2` FOREIGN KEY (`FKEVENTO`) REFERENCES `evento` (`ID`);

--
-- Filtros para la tabla `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`FKGRUPO`) REFERENCES `grupo` (`ID`),
  ADD CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`FKUSUARIO`) REFERENCES `usuario` (`ID`);

--
-- Filtros para la tabla `chat_list_item`
--
ALTER TABLE `chat_list_item`
  ADD CONSTRAINT `chat_list_item_ibfk_1` FOREIGN KEY (`FKCHAT`) REFERENCES `chat` (`ID`),
  ADD CONSTRAINT `chat_list_item_ibfk_2` FOREIGN KEY (`FK_LIST_ITEM`) REFERENCES `list_item` (`ID`),
  ADD CONSTRAINT `chat_list_item_ibfk_3` FOREIGN KEY (`FKUSUARIO`) REFERENCES `usuario` (`ID`);

--
-- Filtros para la tabla `comentario_chat`
--
ALTER TABLE `comentario_chat`
  ADD CONSTRAINT `comentario_chat_ibfk_1` FOREIGN KEY (`FKUSUARIO`) REFERENCES `usuario` (`ID`),
  ADD CONSTRAINT `comentario_chat_ibfk_2` FOREIGN KEY (`FKCHAT`) REFERENCES `chat` (`ID`),
  ADD CONSTRAINT `comentario_chat_ibfk_3` FOREIGN KEY (`FKMULTIMEDIA`) REFERENCES `multimedia` (`ID`);

--
-- Filtros para la tabla `comentario_destacado`
--
ALTER TABLE `comentario_destacado`
  ADD CONSTRAINT `comentario_destacado_ibfk_1` FOREIGN KEY (`FK_COMENTARIO_CHAT`) REFERENCES `comentario_chat` (`ID`),
  ADD CONSTRAINT `comentario_destacado_ibfk_2` FOREIGN KEY (`FKUSUARIO`) REFERENCES `usuario` (`ID`);

--
-- Filtros para la tabla `comentario_publicacion`
--
ALTER TABLE `comentario_publicacion`
  ADD CONSTRAINT `comentario_publicacion_ibfk_1` FOREIGN KEY (`FKUSUARIO`) REFERENCES `usuario` (`ID`),
  ADD CONSTRAINT `comentario_publicacion_ibfk_2` FOREIGN KEY (`FKPUBLICACION`) REFERENCES `publicacion` (`ID`);

--
-- Filtros para la tabla `denuncia_evento`
--
ALTER TABLE `denuncia_evento`
  ADD CONSTRAINT `denuncia_evento_ibfk_1` FOREIGN KEY (`FKUSUARIO`) REFERENCES `usuario` (`ID`),
  ADD CONSTRAINT `denuncia_evento_ibfk_2` FOREIGN KEY (`FKEVENTO`) REFERENCES `evento` (`ID`);

--
-- Filtros para la tabla `denuncia_publicacion`
--
ALTER TABLE `denuncia_publicacion`
  ADD CONSTRAINT `denuncia_publicacion_ibfk_1` FOREIGN KEY (`FKUSUARIO`) REFERENCES `usuario` (`ID`),
  ADD CONSTRAINT `denuncia_publicacion_ibfk_2` FOREIGN KEY (`FKPUBLICACION`) REFERENCES `publicacion` (`ID`);

--
-- Filtros para la tabla `encuesta`
--
ALTER TABLE `encuesta`
  ADD CONSTRAINT `encuesta_ibfk_1` FOREIGN KEY (`FKGRUPO`) REFERENCES `grupo` (`ID`),
  ADD CONSTRAINT `encuesta_ibfk_2` FOREIGN KEY (`FKUSUARIO`) REFERENCES `usuario` (`ID`);

--
-- Filtros para la tabla `evento`
--
ALTER TABLE `evento`
  ADD CONSTRAINT `evento_ibfk_1` FOREIGN KEY (`FKGRUPO`) REFERENCES `grupo` (`ID`),
  ADD CONSTRAINT `evento_ibfk_2` FOREIGN KEY (`FKUSUARIO`) REFERENCES `usuario` (`ID`);

--
-- Filtros para la tabla `evento_multimedia`
--
ALTER TABLE `evento_multimedia`
  ADD CONSTRAINT `evento_multimedia_ibfk_1` FOREIGN KEY (`FKEVENTO`) REFERENCES `evento` (`ID`),
  ADD CONSTRAINT `evento_multimedia_ibfk_2` FOREIGN KEY (`FKMULTIMEDIA`) REFERENCES `multimedia` (`ID`);

--
-- Filtros para la tabla `grupo`
--
ALTER TABLE `grupo`
  ADD CONSTRAINT `grupo_ibfk_1` FOREIGN KEY (`FKMULTIMEDIA`) REFERENCES `multimedia` (`ID`);

--
-- Filtros para la tabla `list_item_multimedia`
--
ALTER TABLE `list_item_multimedia`
  ADD CONSTRAINT `list_item_multimedia_ibfk_1` FOREIGN KEY (`FKMULTIMEDIA`) REFERENCES `multimedia` (`ID`),
  ADD CONSTRAINT `list_item_multimedia_ibfk_2` FOREIGN KEY (`FK_LIST_ITEM`) REFERENCES `list_item` (`ID`);

--
-- Filtros para la tabla `negocio_servicio`
--
ALTER TABLE `negocio_servicio`
  ADD CONSTRAINT `negocio_servicio_ibfk_1` FOREIGN KEY (`FKMULTIMEDIA`) REFERENCES `multimedia` (`ID`);

--
-- Filtros para la tabla `opciones`
--
ALTER TABLE `opciones`
  ADD CONSTRAINT `opciones_ibfk_1` FOREIGN KEY (`FKENCUESTA`) REFERENCES `encuesta` (`ID`),
  ADD CONSTRAINT `opciones_ibfk_2` FOREIGN KEY (`FKMULTIMEDIA`) REFERENCES `multimedia` (`ID`);

--
-- Filtros para la tabla `publicacion`
--
ALTER TABLE `publicacion`
  ADD CONSTRAINT `publicacion_ibfk_1` FOREIGN KEY (`FKGRUPO`) REFERENCES `grupo` (`ID`),
  ADD CONSTRAINT `publicacion_ibfk_2` FOREIGN KEY (`FKUSUARIO`) REFERENCES `usuario` (`ID`);

--
-- Filtros para la tabla `publicacion_multimedia`
--
ALTER TABLE `publicacion_multimedia`
  ADD CONSTRAINT `publicacion_multimedia_ibfk_1` FOREIGN KEY (`FKPUBLICACION`) REFERENCES `publicacion` (`ID`),
  ADD CONSTRAINT `publicacion_multimedia_ibfk_2` FOREIGN KEY (`FKMULTIMEDIA`) REFERENCES `multimedia` (`ID`);

--
-- Filtros para la tabla `respuesta`
--
ALTER TABLE `respuesta`
  ADD CONSTRAINT `respuesta_ibfk_1` FOREIGN KEY (`FKUSUARIO`) REFERENCES `usuario` (`ID`),
  ADD CONSTRAINT `respuesta_ibfk_2` FOREIGN KEY (`FKOPCIONES`) REFERENCES `opciones` (`ID`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`FK_NEGOCIO_SERVICIO`) REFERENCES `negocio_servicio` (`ID`),
  ADD CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`FKMULTIMEDIA`) REFERENCES `multimedia` (`ID`);

--
-- Filtros para la tabla `usuario_activo_alerta`
--
ALTER TABLE `usuario_activo_alerta`
  ADD CONSTRAINT `usuario_activo_alerta_ibfk_1` FOREIGN KEY (`FKUSUARIO`) REFERENCES `usuario` (`ID`),
  ADD CONSTRAINT `usuario_activo_alerta_ibfk_2` FOREIGN KEY (`FKALERTA`) REFERENCES `alerta` (`ID`);

--
-- Filtros para la tabla `usuario_grupo`
--
ALTER TABLE `usuario_grupo`
  ADD CONSTRAINT `usuario_grupo_ibfk_1` FOREIGN KEY (`FKUSUARIO`) REFERENCES `usuario` (`ID`),
  ADD CONSTRAINT `usuario_grupo_ibfk_2` FOREIGN KEY (`FKGRUPO`) REFERENCES `grupo` (`ID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
