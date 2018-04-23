-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-04-2018 a las 02:08:00
-- Versión del servidor: 10.1.13-MariaDB
-- Versión de PHP: 7.0.5

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
DROP DATABASE IF EXISTS urban;
CREATE DATABASE urban;
USE urban;
--
-- Estructura de tabla para la tabla `alarma`
--

CREATE TABLE `alarma` (
  `ID` int(2) UNSIGNED NOT NULL,
  `NOMBRE` varchar(120) NOT NULL,
  `ICONO` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `alarma`
--

INSERT INTO `alarma` (`ID`, `NOMBRE`, `ICONO`) VALUES
(1, 'General', 'C:\\xampp\\htdocs\\Urban-App\\img\\icons\\png\\alarm'),
(2, 'Policia', 'C:\\xampp\\htdocs\\Urban-App\\img\\icons\\png\\alarm'),
(3, 'Ambulancia', 'C:\\xampp\\htdocs\\Urban-App\\img\\icons\\png\\alarm'),
(4, 'Bomberos', 'C:\\xampp\\htdocs\\Urban-App\\img\\icons\\png\\alarm');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alarma_grupo`
--

CREATE TABLE `alarma_grupo` (
  `ID` int(9) UNSIGNED NOT NULL,
  `FKGRUPO` int(9) UNSIGNED NOT NULL,
  `FKUSUARIO` int(9) UNSIGNED NOT NULL,
  `FKALARMA` int(9) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `ID` int(9) UNSIGNED NOT NULL,
  `TITULO` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`ID`, `TITULO`) VALUES
(1, 'Venta'),
(2, 'Oferta'),
(3, 'Descuento'),
(4, 'Noticias'),
(5, 'Servicio'),
(6, 'Permutación'),
(7, 'Encontrado'),
(8, 'Extraviado'),
(9, 'Otro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chat`
--

CREATE TABLE `chat` (
  `ID` int(9) UNSIGNED NOT NULL,
  `BORRADO` enum('Si','No') NOT NULL DEFAULT 'No',
  `FKGRUPO` int(9) UNSIGNED NOT NULL,
  `FKUSUARIO` int(9) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `chat`
--

INSERT INTO `chat` (`ID`, `BORRADO`, `FKGRUPO`, `FKUSUARIO`) VALUES
(1, 'No', 1, 2),
(2, 'No', 2, 2),
(3, 'No', 3, 10),
(4, 'No', 4, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chat_grupo`
--

CREATE TABLE `chat_grupo` (
  `ID` int(9) UNSIGNED NOT NULL,
  `FKCHAT` int(9) UNSIGNED NOT NULL,
  `FKGRUPO` int(9) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `chat_grupo`
--

INSERT INTO `chat_grupo` (`ID`, `FKCHAT`, `FKGRUPO`) VALUES
(1, 2, 2),
(2, 3, 3),
(3, 4, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentario_chat`
--

CREATE TABLE `comentario_chat` (
  `ID` int(9) UNSIGNED NOT NULL,
  `COMENTARIO` text NOT NULL,
  `FECHA_CREACION` datetime NOT NULL,
  `BORRADO` enum('Si','No') NOT NULL DEFAULT 'No',
  `COMENTARIO_ID` varchar(120) NOT NULL,
  `FKUSUARIO` int(9) UNSIGNED NOT NULL,
  `FKCHAT` int(9) UNSIGNED NOT NULL,
  `FKMULTIMEDIA` int(9) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `comentario_chat`
--

INSERT INTO `comentario_chat` (`ID`, `COMENTARIO`, `FECHA_CREACION`, `BORRADO`, `COMENTARIO_ID`, `FKUSUARIO`, `FKCHAT`, `FKMULTIMEDIA`) VALUES
(1, 'escribo en el chat porque soy cool', '2018-04-11 22:25:08', 'No', '1b92eafe-99e4-47b9-b4ac-83a9207fb544', 10, 2, NULL),
(2, '', '2018-04-11 22:25:08', 'No', '1b92eafe-99e4-47b9-b4ac-83a9207fb544', 10, 2, NULL),
(3, 'aca mando otro msje :3', '2018-04-11 22:25:18', 'No', '639ee45d-6be1-4bbf-b131-7cb5388d4cc8', 10, 2, NULL),
(4, 'los amo a todos chiquis', '2018-04-11 22:25:23', 'No', '839ab5e6-97ca-4700-8586-47a8d59d4650', 10, 2, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentario_publicacion`
--

CREATE TABLE `comentario_publicacion` (
  `ID` int(9) UNSIGNED NOT NULL,
  `COMENTARIO` text NOT NULL,
  `BORRADO` enum('Si','No') NOT NULL DEFAULT 'No',
  `FECHA_CREACION` datetime NOT NULL,
  `FKUSUARIO` int(9) UNSIGNED NOT NULL,
  `FKPUBLICACION` int(9) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `comentario_publicacion`
--

INSERT INTO `comentario_publicacion` (`ID`, `COMENTARIO`, `BORRADO`, `FECHA_CREACION`, `FKUSUARIO`, `FKPUBLICACION`) VALUES
(1, 're kiuteeeee', 'No', '2018-04-11 18:11:43', 2, 4),
(2, 'seswde', 'No', '2018-04-12 00:20:20', 10, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `denuncia_publicacion`
--

CREATE TABLE `denuncia_publicacion` (
  `ID` int(9) UNSIGNED NOT NULL,
  `FKUSUARIO` int(9) UNSIGNED NOT NULL,
  `FKPUBLICACION` int(9) UNSIGNED NOT NULL,
  `DESCRIPCION` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `denuncia_publicacion`
--

INSERT INTO `denuncia_publicacion` (`ID`, `FKUSUARIO`, `FKPUBLICACION`, `DESCRIPCION`) VALUES
(1, 10, 4, 'gati');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `denuncia_usuario`
--

CREATE TABLE `denuncia_usuario` (
  `ID` int(9) UNSIGNED NOT NULL,
  `FKUSUARIO` int(9) UNSIGNED NOT NULL,
  `FKUSUARIO_DENUNCIADO` int(9) UNSIGNED NOT NULL,
  `DESCRIPCION` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `denuncia_usuario`
--

INSERT INTO `denuncia_usuario` (`ID`, `FKUSUARIO`, `FKUSUARIO_DENUNCIADO`, `DESCRIPCION`) VALUES
(2, 3, 2, 'fefefewf'),
(3, 4, 2, 'gatooo'),
(4, 12, 2, 'lo odiamos'),
(6, 5, 2, 'chauuuuuu'),
(7, 10, 2, 'acaaaaaaa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuesta`
--

CREATE TABLE `encuesta` (
  `ID` int(9) UNSIGNED NOT NULL,
  `PREGUNTA` varchar(45) NOT NULL,
  `FECHA_CREACION` datetime NOT NULL,
  `BORRADO` enum('Si','No') NOT NULL DEFAULT 'No',
  `FKGRUPO` int(9) UNSIGNED NOT NULL,
  `FKUSUARIO` int(9) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `encuesta`
--

INSERT INTO `encuesta` (`ID`, `PREGUNTA`, `FECHA_CREACION`, `BORRADO`, `FKGRUPO`, `FKUSUARIO`) VALUES
(1, 'solo en uno publico va la encuesta', '2018-04-11 18:22:17', 'No', 2, 2),
(2, 'solo en uno publico va la encuesta', '2018-04-11 18:22:17', 'Si', 2, 2),
(3, 'solo en uno publico va la encuesta', '2018-04-11 18:22:22', 'Si', 2, 2);

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
  `FKMULTIMEDIA` int(9) UNSIGNED DEFAULT NULL,
  `FKUSUARIO` int(9) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `grupo`
--

INSERT INTO `grupo` (`ID`, `NOMBRE`, `LONGITUD`, `LATITUD`, `ESTADO`, `BORRADO`, `FKMULTIMEDIA`, `FKUSUARIO`) VALUES
(1, 'CASITA', -58.4671432000, -34.5723521000, 'Privado', 'No', 2, 2),
(2, 'uno publico', -58.5625615000, -34.5228011000, 'Publico', 'No', 40, 2),
(3, 'uno pa rellenar', -58.4827643853, -34.5784298308, 'Publico', 'No', 39, 10),
(4, 'masita', -58.4561262719, -34.5826520471, 'Privado', 'No', 42, 10);

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
(1, 'C:/xampp/htdocs/Urban-App/img/grupos/1/animal.png', 'No'),
(2, 'C:/xampp/htdocs/Urban-App/img/grupos/1/backgound-user.jpg', 'Si'),
(3, 'C:/xampp/htdocs/Urban-App/img/grupos/2/brebrbe1466809603.jpg', 'Si'),
(4, 'C:/xampp/htdocs/Urban-App/img/publicaciones/1/marihuana1466807837.JPG', 'No'),
(5, 'C:/xampp/htdocs/Urban-App/img/publicaciones/3/brebrbe1466809603.jpg', 'No'),
(6, 'C:/xampp/htdocs/Urban-App/img/usuarios/2/vewvewwe1466806740.JPG', 'No'),
(7, 'C:/xampp/htdocs/Urban-App/img/usuarios/2/vewvewwe1466806740.JPG', 'No'),
(8, 'C:/xampp/htdocs/Urban-App/img/usuarios/2/gmail.png', 'No'),
(9, 'C:/xampp/htdocs/Urban-App/img/usuarios/2/gmail.png', 'No'),
(10, 'C:/xampp/htdocs/Urban-App/img/usuarios/10/5.jpeg', 'No'),
(11, 'C:/xampp/htdocs/Urban-App/img/usuarios/10/5.jpeg', 'No'),
(12, 'C:/xampp/htdocs/Urban-App/img/usuarios/10/5.jpeg', 'Si'),
(13, 'C:/xampp/htdocs/Urban-App/img/usuarios/10/gmail.png', 'Si'),
(14, 'C:/xampp/htdocs/Urban-App/img/usuarios/10/500_F_135764644_eey84eCBP1acOsBOfytuvOss8kSWT8Bx.jpg', 'No'),
(15, 'C:/xampp/htdocs/Urban-App/img/usuarios/10/500_F_135764644_eey84eCBP1acOsBOfytuvOss8kSWT8Bx.jpg', 'Si'),
(16, 'C:/xampp/htdocs/Urban-App/img/grupos/2/500_F_135764644_eey84eCBP1acOsBOfytuvOss8kSWT8Bx.jpg', 'No'),
(17, 'C:/xampp/htdocs/Urban-App/img/grupos/2/500_F_135764644_eey84eCBP1acOsBOfytuvOss8kSWT8Bx.jpg', 'Si'),
(18, 'C:/xampp/htdocs/Urban-App/img/grupos/2/500_F_135764644_eey84eCBP1acOsBOfytuvOss8kSWT8Bx.jpg', 'No'),
(19, 'C:/xampp/htdocs/Urban-App/img/grupos/2/500_F_135764644_eey84eCBP1acOsBOfytuvOss8kSWT8Bx.jpg', 'Si'),
(20, 'C:/xampp/htdocs/Urban-App/img/grupos/2/500_F_135764644_eey84eCBP1acOsBOfytuvOss8kSWT8Bx.jpg', 'Si'),
(21, 'C:/xampp/htdocs/Urban-App/img/grupos/2/5.jpeg', 'Si'),
(22, 'C:/xampp/htdocs/Urban-App/img/usuarios/10/sol-luna.jpg', 'Si'),
(23, 'C:/xampp/htdocs/Urban-App/img/usuarios/10/500_F_135764644_eey84eCBP1acOsBOfytuvOss8kSWT8Bx.jpg', 'Si'),
(24, 'C:/xampp/htdocs/Urban-App/img/usuarios/10/500_F_135764644_eey84eCBP1acOsBOfytuvOss8kSWT8Bx.jpg', 'Si'),
(25, 'C:/xampp/htdocs/Urban-App/img/usuarios/10/500_F_135764644_eey84eCBP1acOsBOfytuvOss8kSWT8Bx.jpg', 'Si'),
(26, 'C:/xampp/htdocs/Urban-App/img/usuarios/10/sol-luna.jpg', 'Si'),
(27, 'C:/xampp/htdocs/Urban-App/img/usuarios/10/sol-luna.jpg', 'Si'),
(28, 'C:/xampp/htdocs/Urban-App/img/usuarios/10/sol-luna.jpg', 'Si'),
(29, 'C:/xampp/htdocs/Urban-App/img/usuarios/10/Lyle-Anderson-IMG_6719_1512142834.jpg', 'Si'),
(30, 'C:/xampp/htdocs/Urban-App/img/usuarios/10/5.jpeg', 'Si'),
(31, 'C:/xampp/htdocs/Urban-App/img/usuarios/10/sol-luna.jpg', 'Si'),
(32, 'C:/xampp/htdocs/Urban-App/img/usuarios/10/5.jpeg', 'Si'),
(33, 'C:/xampp/htdocs/Urban-App/img/usuarios/10/sol-luna.jpg', 'Si'),
(34, 'C:/xampp/htdocs/Urban-App/img/usuarios/10/sol-luna.jpg', 'Si'),
(35, 'C:/xampp/htdocs/Urban-App/img/usuarios/10/sol-luna.jpg', 'No'),
(36, 'C:/xampp/htdocs/Urban-App/img/grupos/2/500_F_135764644_eey84eCBP1acOsBOfytuvOss8kSWT8Bx.jpg', 'No'),
(37, 'C:/xampp/htdocs/Urban-App/img/grupos/2/500_F_135764644_eey84eCBP1acOsBOfytuvOss8kSWT8Bx.jpg', 'Si'),
(38, 'C:/xampp/htdocs/Urban-App/img/grupos/2/500_F_135764644_eey84eCBP1acOsBOfytuvOss8kSWT8Bx.jpg', 'Si'),
(39, 'C:/xampp/htdocs/Urban-App/img/grupos/3/Lyle-Anderson-IMG_6719_1512142834.jpg', 'No'),
(40, 'C:/xampp/htdocs/Urban-App/img/grupos/2/5.jpeg', 'No'),
(41, 'C:/xampp/htdocs/Urban-App/img/grupos/4/500_F_135764644_eey84eCBP1acOsBOfytuvOss8kSWT8Bx.jpg', 'No'),
(42, 'C:/xampp/htdocs/Urban-App/img/grupos/4/500_F_135764644_eey84eCBP1acOsBOfytuvOss8kSWT8Bx.jpg', 'Si');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `opciones`
--

CREATE TABLE `opciones` (
  `ID` int(9) UNSIGNED NOT NULL,
  `RESPUESTA` varchar(45) NOT NULL,
  `FKENCUESTA` int(9) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `opciones`
--

INSERT INTO `opciones` (`ID`, `RESPUESTA`, `FKENCUESTA`) VALUES
(1, 'primera ocpion', 1),
(2, 'segun', 1),
(3, 'ultima', 1),
(4, 'primera ocpion', 2),
(5, 'segun', 2),
(6, 'ultima', 2),
(7, 'primera ocpion', 3),
(8, 'segun', 3),
(9, 'ultima', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `ID` int(9) UNSIGNED NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `NUEVA_CLAVE` varchar(255) NOT NULL,
  `BORRADO` enum('Si','No') NOT NULL DEFAULT 'No',
  `TOKEN` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicacion`
--

CREATE TABLE `publicacion` (
  `ID` int(9) UNSIGNED NOT NULL,
  `TITULO` varchar(45) NOT NULL,
  `DESCRIPCION` varchar(250) NOT NULL,
  `FECHA_CREACION` datetime NOT NULL,
  `BORRADO` enum('Si','No') NOT NULL DEFAULT 'No',
  `FKGRUPO` int(9) UNSIGNED NOT NULL,
  `FKUSUARIO` int(9) UNSIGNED NOT NULL,
  `FKCATEGORIA` int(9) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `publicacion`
--

INSERT INTO `publicacion` (`ID`, `TITULO`, `DESCRIPCION`, `FECHA_CREACION`, `BORRADO`, `FKGRUPO`, `FKUSUARIO`, `FKCATEGORIA`) VALUES
(1, 'aca una para todos', 'aca una re descripcion turra', '2018-04-11 18:10:03', 'Si', 1, 2, 1),
(2, 'aca una para todos', 'aca una re descripcion turra', '2018-04-11 18:10:03', 'Si', 2, 2, 1),
(3, 'aca para todos', 're turraaa hwejg weg ewig weiuf ewiuf wef ewfj wefuew fewuif ewhuif ewiuf ewuf ewiuf ewfhvewive', '2018-04-11 18:11:33', 'No', 1, 2, 7),
(4, 'aca para todos', 're turraaa hwejg weg ewig weiuf ewiuf wef ewfj wefuew fewuif ewhuif ewiuf ewuf ewiuf ewfhvewive', '2018-04-11 18:11:33', 'No', 2, 2, 7);

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
(1, 4),
(2, 4),
(3, 5),
(4, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuesta`
--

CREATE TABLE `respuesta` (
  `FKUSUARIO` int(9) UNSIGNED NOT NULL,
  `FKOPCIONES` int(9) UNSIGNED NOT NULL,
  `FKENCUESTA` int(9) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `respuesta`
--

INSERT INTO `respuesta` (`FKUSUARIO`, `FKOPCIONES`, `FKENCUESTA`) VALUES
(2, 7, 3),
(10, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `ID` int(9) UNSIGNED NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `NOMBRE` varchar(45) NOT NULL,
  `APELLIDO` varchar(45) NOT NULL,
  `CLAVE` varchar(255) NOT NULL,
  `EDAD` date NOT NULL,
  `LONGITUD` double(13,10) NOT NULL,
  `LATITUD` double(13,10) NOT NULL,
  `DIRECCION` varchar(255) NOT NULL,
  `DIRECCION_ESTADO` enum('Visible','Oculta') NOT NULL DEFAULT 'Oculta',
  `FECHA_ALTA` datetime NOT NULL,
  `BANNEADO` enum('Si','No') NOT NULL DEFAULT 'No',
  `NIVEL` enum('Usuario','Admin') NOT NULL DEFAULT 'Usuario',
  `BORRADO` enum('Si','No') NOT NULL DEFAULT 'No',
  `FKMULTIMEDIA` int(9) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`ID`, `EMAIL`, `NOMBRE`, `APELLIDO`, `CLAVE`, `EDAD`, `LONGITUD`, `LATITUD`, `DIRECCION`, `DIRECCION_ESTADO`, `FECHA_ALTA`, `BANNEADO`, `NIVEL`, `BORRADO`, `FKMULTIMEDIA`) VALUES
(2, 'pepe@gmail.com', 'pepe', 'pepon', '99fb2f48c6af4761f904fc85f95eb56190e5d40b1f44ec3a9c1fa319', '1992-12-12', -58.4671432000, -34.5723521000, 'Washington 1122', 'Visible', '2018-04-11 16:43:30', 'Si', 'Usuario', 'No', 9),
(3, 'marta@gmail.com', 'martita', 'agopian', '99fb2f48c6af4761f904fc85f95eb56190e5d40b1f44ec3a9c1fa319', '1992-12-12', -58.4671432000, -34.5723521000, 'Washington 1112', 'Oculta', '2018-04-11 20:48:13', 'No', 'Usuario', 'No', NULL),
(4, 'haku@gmail.com', 'haku', 'nizza', '99fb2f48c6af4761f904fc85f95eb56190e5d40b1f44ec3a9c1fa319', '1992-11-11', -58.4671432000, -34.5723521000, 'Washington 1212', 'Oculta', '2018-08-16 17:26:44', 'No', 'Usuario', 'No', NULL),
(5, 'papo@hotmail.com', 'papi', 'chulo', '99fb2f48c6af4761f904fc85f95eb56190e5d40b1f44ec3a9c1fa319', '1994-12-12', -58.4671126000, -34.5723343000, 'Washington 1111', 'Oculta', '2018-04-04 21:12:46', 'No', 'Usuario', 'No', NULL),
(10, 'iara@hotmail.com', 'IARA', 'nizzza', '99fb2f48c6af4761f904fc85f95eb56190e5d40b1f44ec3a9c1fa319', '1995-04-18', -58.4671126000, -34.5723343000, 'Washington 1123', 'Visible', '2018-08-06 11:30:47', 'No', 'Admin', 'No', 35),
(12, 'marti@gmail.com', 'martita', 'agopian', '99fb2f48c6af4761f904fc85f95eb56190e5d40b1f44ec3a9c1fa319', '1992-12-12', -58.4706906000, -34.5684585000, 'Washington 2234', 'Oculta', '2018-07-16 01:09:47', 'No', 'Usuario', 'No', NULL);

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

--
-- Volcado de datos para la tabla `usuario_activo_alerta`
--

INSERT INTO `usuario_activo_alerta` (`CUANDO`, `LONGITUD`, `LATITUD`, `FKUSUARIO`, `FKALERTA`) VALUES
('2018-04-11 18:00:11', -58.4705248000, -34.5681486000, 2, 1),
('2018-04-11 18:01:26', -58.4705248000, -34.5681486000, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_grupo`
--

CREATE TABLE `usuario_grupo` (
  `ID` int(9) UNSIGNED NOT NULL,
  `FKUSUARIO` int(9) UNSIGNED NOT NULL,
  `FKGRUPO` int(9) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario_grupo`
--

INSERT INTO `usuario_grupo` (`ID`, `FKUSUARIO`, `FKGRUPO`) VALUES
(1, 2, 1),
(2, 2, 2),
(3, 3, 2),
(4, 4, 1),
(5, 4, 2),
(6, 12, 2),
(7, 5, 2),
(8, 10, 2),
(9, 10, 3),
(10, 10, 4);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alarma`
--
ALTER TABLE `alarma`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `alarma_grupo`
--
ALTER TABLE `alarma_grupo`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FKGRUPO` (`FKGRUPO`),
  ADD KEY `FKALARMA` (`FKALARMA`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FKGRUPO` (`FKGRUPO`),
  ADD KEY `FKUSUARIO` (`FKUSUARIO`);

--
-- Indices de la tabla `chat_grupo`
--
ALTER TABLE `chat_grupo`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FKCHAT` (`FKCHAT`),
  ADD KEY `FKGRUPO` (`FKGRUPO`);

--
-- Indices de la tabla `comentario_chat`
--
ALTER TABLE `comentario_chat`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FKUSUARIO` (`FKUSUARIO`),
  ADD KEY `FKCHAT` (`FKCHAT`),
  ADD KEY `FKMULTIMEDIA` (`FKMULTIMEDIA`);

--
-- Indices de la tabla `comentario_publicacion`
--
ALTER TABLE `comentario_publicacion`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FKUSUARIO` (`FKUSUARIO`),
  ADD KEY `FKPUBLICACION` (`FKPUBLICACION`);

--
-- Indices de la tabla `denuncia_publicacion`
--
ALTER TABLE `denuncia_publicacion`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FKUSUARIO` (`FKUSUARIO`),
  ADD KEY `FKPUBLICACION` (`FKPUBLICACION`);

--
-- Indices de la tabla `denuncia_usuario`
--
ALTER TABLE `denuncia_usuario`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FKUSUARIO` (`FKUSUARIO`),
  ADD KEY `FKUSUARIO_DENUNCIADO` (`FKUSUARIO_DENUNCIADO`);

--
-- Indices de la tabla `encuesta`
--
ALTER TABLE `encuesta`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FKGRUPO` (`FKGRUPO`),
  ADD KEY `FKUSUARIO` (`FKUSUARIO`),
  ADD KEY `index_pregunta_encuesta` (`PREGUNTA`);

--
-- Indices de la tabla `grupo`
--
ALTER TABLE `grupo`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FKMULTIMEDIA` (`FKMULTIMEDIA`),
  ADD KEY `FKUSUARIO` (`FKUSUARIO`),
  ADD KEY `index_titulo_grupo` (`NOMBRE`);

--
-- Indices de la tabla `multimedia`
--
ALTER TABLE `multimedia`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `opciones`
--
ALTER TABLE `opciones`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FKENCUESTA` (`FKENCUESTA`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `EMAIL` (`EMAIL`);

--
-- Indices de la tabla `publicacion`
--
ALTER TABLE `publicacion`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FKGRUPO` (`FKGRUPO`),
  ADD KEY `FKUSUARIO` (`FKUSUARIO`),
  ADD KEY `FKCATEGORIA` (`FKCATEGORIA`),
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
  ADD KEY `FKOPCIONES` (`FKOPCIONES`),
  ADD KEY `FKENCUESTA` (`FKENCUESTA`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `EMAIL` (`EMAIL`),
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
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FKUSUARIO` (`FKUSUARIO`),
  ADD KEY `FKGRUPO` (`FKGRUPO`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alarma`
--
ALTER TABLE `alarma`
  MODIFY `ID` int(2) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `alarma_grupo`
--
ALTER TABLE `alarma_grupo`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `chat`
--
ALTER TABLE `chat`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `chat_grupo`
--
ALTER TABLE `chat_grupo`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `comentario_chat`
--
ALTER TABLE `comentario_chat`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `comentario_publicacion`
--
ALTER TABLE `comentario_publicacion`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `denuncia_publicacion`
--
ALTER TABLE `denuncia_publicacion`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `denuncia_usuario`
--
ALTER TABLE `denuncia_usuario`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `encuesta`
--
ALTER TABLE `encuesta`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `grupo`
--
ALTER TABLE `grupo`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `multimedia`
--
ALTER TABLE `multimedia`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
--
-- AUTO_INCREMENT de la tabla `opciones`
--
ALTER TABLE `opciones`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `publicacion`
--
ALTER TABLE `publicacion`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT de la tabla `usuario_grupo`
--
ALTER TABLE `usuario_grupo`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alarma_grupo`
--
ALTER TABLE `alarma_grupo`
  ADD CONSTRAINT `alarma_grupo_ibfk_1` FOREIGN KEY (`FKGRUPO`) REFERENCES `grupo` (`ID`),
  ADD CONSTRAINT `alarma_grupo_ibfk_2` FOREIGN KEY (`FKGRUPO`) REFERENCES `chat` (`ID`),
  ADD CONSTRAINT `alarma_grupo_ibfk_3` FOREIGN KEY (`FKALARMA`) REFERENCES `alarma` (`ID`);

--
-- Filtros para la tabla `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`FKGRUPO`) REFERENCES `grupo` (`ID`),
  ADD CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`FKUSUARIO`) REFERENCES `usuario` (`ID`);

--
-- Filtros para la tabla `chat_grupo`
--
ALTER TABLE `chat_grupo`
  ADD CONSTRAINT `chat_grupo_ibfk_1` FOREIGN KEY (`FKCHAT`) REFERENCES `chat` (`ID`),
  ADD CONSTRAINT `chat_grupo_ibfk_2` FOREIGN KEY (`FKGRUPO`) REFERENCES `grupo` (`ID`);

--
-- Filtros para la tabla `comentario_chat`
--
ALTER TABLE `comentario_chat`
  ADD CONSTRAINT `comentario_chat_ibfk_1` FOREIGN KEY (`FKUSUARIO`) REFERENCES `usuario` (`ID`),
  ADD CONSTRAINT `comentario_chat_ibfk_2` FOREIGN KEY (`FKCHAT`) REFERENCES `chat` (`ID`),
  ADD CONSTRAINT `comentario_chat_ibfk_3` FOREIGN KEY (`FKMULTIMEDIA`) REFERENCES `multimedia` (`ID`);

--
-- Filtros para la tabla `comentario_publicacion`
--
ALTER TABLE `comentario_publicacion`
  ADD CONSTRAINT `comentario_publicacion_ibfk_1` FOREIGN KEY (`FKUSUARIO`) REFERENCES `usuario` (`ID`),
  ADD CONSTRAINT `comentario_publicacion_ibfk_2` FOREIGN KEY (`FKPUBLICACION`) REFERENCES `publicacion` (`ID`);

--
-- Filtros para la tabla `denuncia_publicacion`
--
ALTER TABLE `denuncia_publicacion`
  ADD CONSTRAINT `denuncia_publicacion_ibfk_1` FOREIGN KEY (`FKUSUARIO`) REFERENCES `usuario` (`ID`),
  ADD CONSTRAINT `denuncia_publicacion_ibfk_2` FOREIGN KEY (`FKPUBLICACION`) REFERENCES `publicacion` (`ID`);

--
-- Filtros para la tabla `denuncia_usuario`
--
ALTER TABLE `denuncia_usuario`
  ADD CONSTRAINT `denuncia_usuario_ibfk_1` FOREIGN KEY (`FKUSUARIO`) REFERENCES `usuario` (`ID`),
  ADD CONSTRAINT `denuncia_usuario_ibfk_2` FOREIGN KEY (`FKUSUARIO_DENUNCIADO`) REFERENCES `usuario` (`ID`);

--
-- Filtros para la tabla `encuesta`
--
ALTER TABLE `encuesta`
  ADD CONSTRAINT `encuesta_ibfk_1` FOREIGN KEY (`FKGRUPO`) REFERENCES `grupo` (`ID`),
  ADD CONSTRAINT `encuesta_ibfk_2` FOREIGN KEY (`FKUSUARIO`) REFERENCES `usuario` (`ID`);

--
-- Filtros para la tabla `grupo`
--
ALTER TABLE `grupo`
  ADD CONSTRAINT `grupo_ibfk_1` FOREIGN KEY (`FKMULTIMEDIA`) REFERENCES `multimedia` (`ID`),
  ADD CONSTRAINT `grupo_ibfk_2` FOREIGN KEY (`FKUSUARIO`) REFERENCES `usuario` (`ID`);

--
-- Filtros para la tabla `opciones`
--
ALTER TABLE `opciones`
  ADD CONSTRAINT `opciones_ibfk_1` FOREIGN KEY (`FKENCUESTA`) REFERENCES `encuesta` (`ID`);

--
-- Filtros para la tabla `publicacion`
--
ALTER TABLE `publicacion`
  ADD CONSTRAINT `publicacion_ibfk_1` FOREIGN KEY (`FKGRUPO`) REFERENCES `grupo` (`ID`),
  ADD CONSTRAINT `publicacion_ibfk_2` FOREIGN KEY (`FKUSUARIO`) REFERENCES `usuario` (`ID`),
  ADD CONSTRAINT `publicacion_ibfk_3` FOREIGN KEY (`FKCATEGORIA`) REFERENCES `categoria` (`ID`);

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
  ADD CONSTRAINT `respuesta_ibfk_2` FOREIGN KEY (`FKOPCIONES`) REFERENCES `opciones` (`ID`),
  ADD CONSTRAINT `respuesta_ibfk_3` FOREIGN KEY (`FKENCUESTA`) REFERENCES `encuesta` (`ID`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`FKMULTIMEDIA`) REFERENCES `multimedia` (`ID`);

--
-- Filtros para la tabla `usuario_activo_alerta`
--
ALTER TABLE `usuario_activo_alerta`
  ADD CONSTRAINT `usuario_activo_alerta_ibfk_1` FOREIGN KEY (`FKUSUARIO`) REFERENCES `usuario` (`ID`),
  ADD CONSTRAINT `usuario_activo_alerta_ibfk_2` FOREIGN KEY (`FKALERTA`) REFERENCES `alarma` (`ID`);

--
-- Filtros para la tabla `usuario_grupo`
--
ALTER TABLE `usuario_grupo`
  ADD CONSTRAINT `usuario_grupo_ibfk_1` FOREIGN KEY (`FKUSUARIO`) REFERENCES `usuario` (`ID`),
  ADD CONSTRAINT `usuario_grupo_ibfk_2` FOREIGN KEY (`FKGRUPO`) REFERENCES `grupo` (`ID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
