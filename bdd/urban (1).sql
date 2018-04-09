-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-02-2018 a las 14:24:05
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
  `BORRADO` enum('Si','No') NOT NULL DEFAULT 'No',
  `FKGRUPO` int(9) UNSIGNED NOT NULL,
  `FKUSUARIO` int(9) UNSIGNED NOT NULL,
  `FKMULTIMEDIA` int(9) UNSIGNED NOT NULL
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
-- Estructura de tabla para la tabla `chat_usuario`
--

CREATE TABLE `chat_usuario` (
  `ID` int(11) NOT NULL,
  `FKUSUARIO` int(11) NOT NULL,
  `FKCHAT` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `chat_usuario`
--

INSERT INTO `chat_usuario` (`ID`, `FKUSUARIO`, `FKCHAT`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentario_chat`
--

CREATE TABLE `comentario_chat` (
  `ID` int(9) UNSIGNED NOT NULL,
  `COMENTARIO` text NOT NULL,
  `FECHA_CREACION` datetime NOT NULL,
  `BORRADO` enum('Si','No') NOT NULL DEFAULT 'No',
  `FKUSUARIO` int(9) UNSIGNED NOT NULL,
  `FKCHAT` int(9) UNSIGNED NOT NULL,
  `FKMULTIMEDIA` int(9) UNSIGNED DEFAULT NULL,
  `COMENTARIO_ID` varchar(120) NOT NULL
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
(1, 'cdcdcs', 'No', '2018-01-03 17:37:34', 1, 1),
(2, 'cdcdcs', 'No', '2018-01-03 17:37:34', 1, 1),
(3, 'vfvf', 'No', '2018-01-03 17:37:40', 1, 1),
(4, 'sssssssssssss', 'No', '2018-01-03 18:29:57', 1, 1),
(5, 'sssssssssssss', 'No', '2018-01-03 18:29:57', 1, 1),
(6, 'jaja lolo', 'No', '2018-01-03 18:32:33', 1, 1),
(7, 'zzzzzzzzzzz', 'No', '2018-01-03 18:38:00', 1, 1),
(8, 'zzzzzzzzzzz', 'No', '2018-01-03 18:38:00', 1, 1),
(9, 'dddd', 'No', '2018-01-03 18:43:22', 1, 1),
(10, 'mmmmmmmmmmmmmmmmmmmmmm\nm\nm\nm\nm\n\nmmm', 'No', '2018-01-03 18:49:46', 1, 1),
(11, 'lalalal', 'No', '2018-01-03 20:23:49', 1, 1),
(12, 'aca coment', 'No', '2018-01-05 17:29:13', 1, 1),
(13, 'aca un coment', 'No', '2018-01-29 19:29:45', 1, 78),
(14, 'fgewfefew', 'No', '2018-02-05 16:50:39', 1, 78);

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
  `FECHA_CREACION` datetime NOT NULL,
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
(1, 'vecinos de washington', -58.4706906000, -34.5684585000, 'Publico', 'No', 1),
(2, 'otro grupo', -58.4671126000, -34.5723343000, 'Privado', 'No', NULL),
(3, 'puti', -58.4705184000, -34.5681798000, 'Publico', 'No', 41),
(4, 'tu vieja', -58.5625541000, -34.5227730000, 'Publico', 'No', NULL),
(5, 'CASA', -58.4671432000, -34.5723521000, 'Publico', 'No', 85),
(6, 'SOLO YO', -58.4787952000, -34.5579591000, 'Privado', 'No', 86),
(7, 'el de olazabal', -58.4724300000, -34.5685938000, 'Privado', 'No', 87),
(8, 'otro', -58.4437814000, -34.5515463000, 'Privado', 'No', 88),
(9, 'arrastrado', -58.4699326974, -34.5764157483, 'Publico', 'No', 89),
(10, 'ghjhj', -58.4733381513, -34.5725375379, 'Publico', 'No', NULL);

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
(1, 'C:/xampp/htdocs/Urban-App/img/grupos/1/animal.png', 'No'),
(2, 'C:/xampp/htdocs/Urban-App/img/publicaciones/6/animal.png', 'No'),
(3, 'C:/xampp/htdocs/Urban-App/img/publicaciones/7/animal.png', 'No'),
(4, 'C:/xampp/htdocs/Urban-App/img/publicaciones/8/muestra.jpg', 'No'),
(5, 'C:/xampp/htdocs/Urban-App/img/publicaciones/9/animal.png', 'No'),
(6, 'C:/xampp/htdocs/Urban-App/img/publicaciones/11/poster 3.jpg', 'No'),
(7, 'C:/xampp/htdocs/Urban-App/img/publicaciones/12/poster 3.jpg', 'No'),
(8, 'C:/xampp/htdocs/Urban-App/img/publicaciones/13/referentes aldi.jpg', 'No'),
(9, 'C:/xampp/htdocs/Urban-App/img/publicaciones/16/poster 3.jpg', 'No'),
(10, 'C:/xampp/htdocs/Urban-App/img/publicaciones/17/poster 3.jpg', 'No'),
(11, 'C:/xampp/htdocs/Urban-App/img/publicaciones/20/9.jpeg', 'No'),
(12, 'C:/xampp/htdocs/Urban-App/img/publicaciones/22/8.jpeg', 'No'),
(13, 'C:/xampp/htdocs/Urban-App/img/publicaciones/23/7.jpeg', 'No'),
(14, 'C:/xampp/htdocs/Urban-App/img/publicaciones/24/3.jpeg', 'No'),
(15, 'C:/xampp/htdocs/Urban-App/img/publicaciones/26/3.jpeg', 'No'),
(16, 'C:/xampp/htdocs/Urban-App/img/publicaciones/30/1.jpeg', 'No'),
(17, 'C:/xampp/htdocs/Urban-App/img/publicaciones/32/7.jpeg', 'No'),
(18, 'C:/xampp/htdocs/Urban-App/img/publicaciones/34/5.jpeg', 'No'),
(19, 'C:/xampp/htdocs/Urban-App/img/publicaciones/36/5.jpeg', 'No'),
(20, 'C:/xampp/htdocs/Urban-App/img/publicaciones/38/9.jpeg', 'No'),
(21, 'C:/xampp/htdocs/Urban-App/img/publicaciones/40/8.jpeg', 'No'),
(22, 'C:/xampp/htdocs/Urban-App/img/publicaciones/42/8.jpeg', 'No'),
(23, 'C:/xampp/htdocs/Urban-App/img/publicaciones/44/2.jpeg', 'No'),
(24, 'C:/xampp/htdocs/Urban-App/img/publicaciones/46/8.jpeg', 'No'),
(25, 'C:/xampp/htdocs/Urban-App/img/publicaciones/48/5.jpeg', 'No'),
(26, 'C:/xampp/htdocs/Urban-App/img/publicaciones/50/9.jpeg', 'No'),
(27, 'C:/xampp/htdocs/Urban-App/img/publicaciones/52/9.jpeg', 'No'),
(28, 'C:/xampp/htdocs/Urban-App/img/publicaciones/54/1.jpeg', 'No'),
(29, 'C:/xampp/htdocs/Urban-App/img/publicaciones/56/3.jpeg', 'No'),
(30, 'C:/xampp/htdocs/Urban-App/img/publicaciones/58/4.jpeg', 'No'),
(31, 'C:/xampp/htdocs/Urban-App/img/publicaciones/60/8.jpeg', 'No'),
(32, 'C:/xampp/htdocs/Urban-App/img/publicaciones/62/33.jpeg', 'No'),
(33, 'C:/xampp/htdocs/Urban-App/img/publicaciones/64/33.jpeg', 'No'),
(34, 'C:/xampp/htdocs/Urban-App/img/publicaciones/66/11.jpeg', 'No'),
(35, 'C:/xampp/htdocs/Urban-App/img/publicaciones/68/22.jpeg', 'No'),
(36, 'C:/xampp/htdocs/Urban-App/img/publicaciones/70/44.jpeg', 'No'),
(37, 'C:/xampp/htdocs/Urban-App/img/publicaciones/72/66.jpeg', 'No'),
(38, 'C:/xampp/htdocs/Urban-App/img/publicaciones/74/44.jpeg', 'No'),
(39, 'C:/xampp/htdocs/Urban-App/img/publicaciones/77/66.jpeg', 'No'),
(40, 'C:/xampp/htdocs/Urban-App/img/publicaciones/81/3.jpeg', 'No'),
(41, 'C:/xampp/htdocs/Urban-App/img/grupos/3/9.jpeg', 'No'),
(42, 'C:/xampp/htdocs/Urban-App/img/grupos/1/chats/1/8.jpeg', 'No'),
(43, 'C:/xampp/htdocs/Urban-App/img/grupos/1/chats/1/8.jpeg', 'No'),
(44, 'C:/xampp/htdocs/Urban-App/img/grupos/1/chats/1/7.jpeg', 'No'),
(45, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/1.jpeg', 'No'),
(46, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/8.jpeg', 'No'),
(47, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/8.jpeg', 'No'),
(48, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/9.jpeg', 'No'),
(49, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/9.jpeg', 'No'),
(50, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/1.jpeg', 'No'),
(51, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/1.jpeg', 'No'),
(52, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/3.jpeg', 'No'),
(53, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/4.jpeg', 'No'),
(54, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/3.jpeg', 'No'),
(55, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/8.jpeg', 'No'),
(56, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/4.jpeg', 'No'),
(57, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/8.jpeg', 'No'),
(58, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/3.jpeg', 'No'),
(59, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/8.jpeg', 'No'),
(60, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/8.jpeg', 'No'),
(61, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/9.jpeg', 'No'),
(62, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/9.jpeg', 'No'),
(63, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/9.jpeg', 'No'),
(64, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/9.jpeg', 'No'),
(65, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/7.jpeg', 'No'),
(66, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/8.jpeg', 'No'),
(67, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/33.jpeg', 'No'),
(68, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/44.jpeg', 'No'),
(69, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/44.jpeg', 'No'),
(70, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/22.jpeg', 'No'),
(71, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/44.jpeg', 'No'),
(72, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/11.jpeg', 'No'),
(73, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/66.jpeg', 'No'),
(74, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/44.jpeg', 'No'),
(75, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/22.jpeg', 'No'),
(76, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/11.jpeg', 'No'),
(77, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/11.jpeg', 'No'),
(78, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/22.jpeg', 'No'),
(79, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/44.jpeg', 'No'),
(80, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/33.jpeg', 'No'),
(81, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/22.jpeg', 'No'),
(82, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/66.jpeg', 'No'),
(83, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/55.jpeg', 'No'),
(84, 'C:/xampp/htdocs/Urban-App/img/usuarios/1/tumblr_p2nh7x4aVD1x1a9kio1_540.jpg', 'No'),
(85, 'C:/xampp/htdocs/Urban-App/img/grupos/5/tumblr_mxpkrwhYIK1ses5cpo1_500.jpg', 'No'),
(86, 'C:/xampp/htdocs/Urban-App/img/grupos/6/cute_polygon_dog_portrait_illustration_wood_wall_art-r3b0a631', 'No'),
(87, 'C:/xampp/htdocs/Urban-App/img/grupos/7/tumblr_p03fcp0Zzt1ur4moho1_1280.jpg', 'No'),
(88, 'C:/xampp/htdocs/Urban-App/img/grupos/8/Logo1.jpg', 'No'),
(89, 'C:/xampp/htdocs/Urban-App/img/grupos/9/5.jpeg', 'No');

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
(1, 'ffffffffffffdd', 'ddddd', NULL, '2018-01-03 17:37:21', 'Si', 1, 1),
(3, 'gregerg', 'gergergre', NULL, '2018-01-06 18:11:07', 'Si', 1, 1),
(4, 'gregerg', 'gergergre', NULL, '2018-01-06 18:11:07', 'Si', 2, 1),
(5, 'rrrrrrrrrrrrrrrr', 'gregre', NULL, '2018-01-06 18:11:19', 'Si', 2, 1),
(6, 'gegerger', 'gergerg', NULL, '2018-01-06 18:11:33', 'Si', 1, 1),
(7, 'gegerger', 'gergerg', NULL, '2018-01-06 18:11:33', 'Si', 2, 1),
(8, 'e21e21e1', '1ee12e12', NULL, '2018-01-06 18:15:04', 'Si', 1, 1),
(9, 'dqwfdqefew', 'fwefwefew', NULL, '2018-01-06 18:15:20', 'Si', 2, 1),
(10, 'otro fgrupo', 'tecto ramdom bitch', NULL, '2018-01-06 18:17:35', 'Si', 2, 1),
(11, 'vdsvsdv', 'vdsvdsvds', NULL, '2018-01-06 18:18:40', 'Si', 1, 1),
(12, 'vdsvsdv', 'vdsvdsvds', NULL, '2018-01-06 18:18:40', 'Si', 1, 1),
(13, 'dsfdsf', 'fsdfdsfdsf', NULL, '2018-01-06 18:19:02', 'Si', 2, 1),
(14, 'ffffffffffffffff', 'fefewfwefewfewfew', NULL, '2018-01-06 18:19:48', 'Si', 1, 1),
(15, 'ffffffffffffffff', 'fefewfwefewfewfew', NULL, '2018-01-06 18:19:48', 'Si', 2, 1),
(16, 'vdvdf', 'vdfvdfvdf', NULL, '2018-01-06 18:20:05', 'Si', 1, 1),
(17, 'vdvdf', 'vdfvdfvdf', NULL, '2018-01-06 18:20:05', 'Si', 2, 1),
(18, 'gergerg', 'gregerger', NULL, '2018-01-06 18:47:21', 'Si', 1, 1),
(19, 'gergerg', 'gregerger', NULL, '2018-01-06 18:47:21', 'Si', 2, 1),
(20, 'gggggggggggggggggg', 'grrrrrrrrrrrrrrrrrrrrrrrr', NULL, '2018-01-06 18:47:41', 'Si', 1, 1),
(21, 'gggggggggggggggggg', 'grrrrrrrrrrrrrrrrrrrrrrrr', NULL, '2018-01-06 18:47:41', 'Si', 2, 1),
(22, 'gergre', 'gerger', NULL, '2018-01-06 18:48:17', 'Si', 2, 1),
(23, 'ggggg', 'rrrr', NULL, '2018-01-06 18:48:32', 'Si', 1, 1),
(24, 'aca publi generica', 'aca mi coment', NULL, '2018-01-06 18:49:14', 'Si', 1, 1),
(25, 'aca publi generica', 'aca mi coment', NULL, '2018-01-06 18:49:14', 'Si', 2, 1),
(26, 'aca publi generica', 'aca mi coment', NULL, '2018-01-06 18:49:14', 'Si', 1, 1),
(27, 'aca publi generica', 'aca mi coment', NULL, '2018-01-06 18:49:14', 'Si', 2, 1),
(28, 'v', 'vdvd', NULL, '2018-01-06 18:52:46', 'Si', 1, 1),
(29, 'v', 'vdvd', NULL, '2018-01-06 18:52:46', 'Si', 2, 1),
(30, 'gr', 'gr', NULL, '2018-01-06 18:53:01', 'Si', 1, 1),
(31, 'gr', 'gr', NULL, '2018-01-06 18:53:01', 'Si', 2, 1),
(32, 'ftodos', 'todo toditos', NULL, '2018-01-06 19:42:20', 'Si', 1, 1),
(33, 'ftodos', 'todo toditos', NULL, '2018-01-06 19:42:20', 'Si', 2, 1),
(34, 'hhhhh', 'ttttttttt', NULL, '2018-01-06 19:53:36', 'Si', 1, 1),
(35, 'hhhhh', 'ttttttttt', NULL, '2018-01-06 19:53:36', 'Si', 2, 1),
(36, 'hhhhh', 'ttttttttt', NULL, '2018-01-06 19:53:36', 'Si', 1, 1),
(37, 'hhhhh', 'ttttttttt', NULL, '2018-01-06 19:53:36', 'Si', 2, 1),
(38, 'tuti', 'fla fla fla', NULL, '2018-01-06 20:04:40', 'Si', 1, 1),
(39, 'tuti', 'fla fla fla', NULL, '2018-01-06 20:04:40', 'Si', 2, 1),
(40, 'fghjk', 'sdfghjkl', NULL, '2018-01-07 18:28:04', 'Si', 1, 1),
(41, 'fghjk', 'sdfghjkl', NULL, '2018-01-07 18:28:04', 'Si', 2, 1),
(42, 'grgre', 'greger', NULL, '2018-01-07 18:30:03', 'Si', 1, 1),
(43, 'grgre', 'greger', NULL, '2018-01-07 18:30:03', 'Si', 2, 1),
(44, 'gergerger', 'gergereee', NULL, '2018-01-07 18:30:39', 'Si', 1, 1),
(45, 'gergerger', 'gergereee', NULL, '2018-01-07 18:30:39', 'Si', 2, 1),
(46, 'hrth', 'hrhthhhh', NULL, '2018-01-07 18:32:22', 'Si', 1, 1),
(47, 'hrth', 'hrhthhhh', NULL, '2018-01-07 18:32:22', 'Si', 2, 1),
(48, 'gggggggggggggg', 'rrrrrrrrrrrrrrrr', NULL, '2018-01-07 18:33:03', 'Si', 1, 1),
(49, 'gggggggggggggg', 'rrrrrrrrrrrrrrrr', NULL, '2018-01-07 18:33:03', 'Si', 2, 1),
(50, 'una publi', 'aca todo el coment miau', NULL, '2018-01-07 18:45:19', 'Si', 1, 1),
(51, 'una publi', 'aca todo el coment miau', NULL, '2018-01-07 18:45:19', 'Si', 2, 1),
(52, 'una publi', 'aca todo el coment miau', NULL, '2018-01-07 18:45:19', 'Si', 1, 1),
(54, 'fffffffffffff', 'sssssssssssss', NULL, '2018-01-07 18:56:04', 'Si', 1, 1),
(55, 'fffffffffffff', 'sssssssssssss', NULL, '2018-01-07 18:56:04', 'Si', 2, 1),
(56, 'aaddasdas', 'dasasfasf', NULL, '2018-01-07 18:57:47', 'Si', 1, 1),
(57, 'aaddasdas', 'dasasfasf', NULL, '2018-01-07 18:57:47', 'Si', 2, 1),
(58, 'rrrrrwerewr', 'erhrthger', NULL, '2018-01-07 19:01:04', 'Si', 1, 1),
(59, 'rrrrrwerewr', 'erhrthger', NULL, '2018-01-07 19:01:04', 'Si', 2, 1),
(60, 'gggggee', 'rewrewrwerw', NULL, '2018-01-07 19:01:53', 'Si', 1, 1),
(61, 'gggggee', 'rewrewrwerw', NULL, '2018-01-07 19:01:53', 'Si', 2, 1),
(62, 'DDDDDDDDdddddd', 'weew', NULL, '2018-01-07 19:06:21', 'Si', 1, 1),
(63, 'DDDDDDDDdddddd', 'weew', NULL, '2018-01-07 19:06:21', 'Si', 2, 1),
(64, 'DDDDDDDDdddddd', 'weew', NULL, '2018-01-07 19:06:21', 'Si', 1, 1),
(65, 'DDDDDDDDdddddd', 'weew', NULL, '2018-01-07 19:06:21', 'Si', 2, 1),
(66, 'aqqqqq', 'ddsceshmtr jye jj ktue', NULL, '2018-01-07 19:15:33', 'Si', 1, 1),
(67, 'aqqqqq', 'ddsceshmtr jye jj ktue', NULL, '2018-01-07 19:15:33', 'Si', 2, 1),
(68, 'hrjyjhgevc', 'btrbtvch 6 h65 5h65h jn35y he65 h624 h6552', NULL, '2018-01-07 19:17:23', 'Si', 1, 1),
(69, 'hrjyjhgevc', 'btrbtvch 6 h65 5h65h jn35y he65 h624 h6552', NULL, '2018-01-07 19:17:23', 'Si', 2, 1),
(70, 'bbbbbbbbbbbbbb', 'dvdsv dbvdv fd gnbtrnb grgn  th', NULL, '2018-01-07 19:18:46', 'Si', 1, 1),
(71, 'bbbbbbbbbbbbbb', 'dvdsv dbvdv fd gnbtrnb grgn  th', NULL, '2018-01-07 19:18:46', 'Si', 2, 1),
(72, 'brbrebrb', 'cascsdv gbtrb gbw4t rw', NULL, '2018-01-07 19:19:24', 'Si', 1, 1),
(73, 'brbrebrb', 'cascsdv gbtrb gbw4t rw', NULL, '2018-01-07 19:19:24', 'Si', 2, 1),
(74, 'wefwefwefwe', 'fefwefewfwe', NULL, '2018-01-07 19:27:16', 'No', 1, 1),
(75, 'wefwefwefwe', 'fefwefewfwe', NULL, '2018-01-07 19:27:16', 'No', 2, 1),
(76, 'ac apubli solo para wahs', 'vwebhweui ewuwh viewjkvh ewijvew', NULL, '2018-01-07 19:30:27', 'No', 1, 1),
(77, 'aca con foto', 'solo para wash', NULL, '2018-01-07 19:30:49', 'No', 1, 1),
(78, 'aca para todos sin foto', 'sin fotiti', NULL, '2018-01-07 19:31:05', 'Si', 1, 1),
(79, 'aca para todos sin foto', 'sin fotiti', NULL, '2018-01-07 19:31:05', 'No', 2, 1),
(80, 'aca solo el otro gurpo', 'sin fot', NULL, '2018-01-07 19:31:26', 'No', 2, 1),
(81, 'aca con foto', 'el otro grupo', NULL, '2018-01-07 19:31:49', 'No', 2, 1);

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
(6, 2),
(7, 3),
(8, 4),
(9, 5),
(11, 6),
(12, 7),
(13, 8),
(16, 9),
(17, 10),
(20, 11),
(20, 11),
(22, 12),
(23, 13),
(24, 14),
(24, 14),
(26, 15),
(26, 15),
(30, 16),
(30, 16),
(32, 17),
(32, 17),
(34, 18),
(36, 19),
(38, 20),
(40, 21),
(42, 22),
(44, 23),
(46, 24),
(46, 24),
(48, 25),
(48, 25),
(50, 26),
(50, 26),
(52, 27),
(52, 27),
(54, 28),
(56, 29),
(58, 30),
(60, 31),
(62, 32),
(64, 33),
(66, 34),
(68, 35),
(70, 36),
(72, 37),
(74, 38),
(75, 38),
(77, 39),
(81, 40);

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
  `FK_NEGOCIO_SERVICIO` int(9) UNSIGNED DEFAULT NULL,
  `FKMULTIMEDIA` int(9) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`ID`, `EMAIL`, `NOMBRE`, `APELLIDO`, `CLAVE`, `EDAD`, `LONGITUD`, `LATITUD`, `DIRECCION`, `DIRECCION_ESTADO`, `FECHA_ALTA`, `BANNEADO`, `NIVEL`, `BORRADO`, `FK_NEGOCIO_SERVICIO`, `FKMULTIMEDIA`) VALUES
(1, 'iara@hotmail.com', 'iara', 'Nizza', '99fb2f48c6af4761f904fc85f95eb56190e5d40b1f44ec3a9c1fa319', '1995-04-18', -58.4704681000, -34.5682756000, 'Washington 2239', 'Oculta', '2018-01-03 17:36:01', 'No', 'Usuario', 'No', NULL, 84),
(2, 'martita@gmail.com', 'martita', 'agopian', '99fb2f48c6af4761f904fc85f95eb56190e5d40b1f44ec3a9c1fa319', '1995-12-18', -58.4706906000, -34.5684585000, 'Washington 2234', 'Oculta', '2018-01-10 20:26:32', 'No', 'Usuario', 'No', NULL, NULL);

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
(2, 3),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10);

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
  ADD KEY `FKMULTIMEDIA` (`FKMULTIMEDIA`);

--
-- Indices de la tabla `chat_list_item`
--
ALTER TABLE `chat_list_item`
  ADD KEY `FKCHAT` (`FKCHAT`),
  ADD KEY `FK_LIST_ITEM` (`FK_LIST_ITEM`),
  ADD KEY `FKUSUARIO` (`FKUSUARIO`);

--
-- Indices de la tabla `chat_usuario`
--
ALTER TABLE `chat_usuario`
  ADD PRIMARY KEY (`ID`);

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
  ADD PRIMARY KEY (`ID`),
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
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `chat_usuario`
--
ALTER TABLE `chat_usuario`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `comentario_chat`
--
ALTER TABLE `comentario_chat`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=277;
--
-- AUTO_INCREMENT de la tabla `comentario_publicacion`
--
ALTER TABLE `comentario_publicacion`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
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
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT de la tabla `list_item`
--
ALTER TABLE `list_item`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `multimedia`
--
ALTER TABLE `multimedia`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;
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
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
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
  ADD CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`FKUSUARIO`) REFERENCES `usuario` (`ID`),
  ADD CONSTRAINT `chat_ibfk_3` FOREIGN KEY (`FKMULTIMEDIA`) REFERENCES `multimedia` (`ID`);

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
