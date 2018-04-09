-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-01-2018 a las 02:44:41
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
DROP DATABASE IF EXISTS urban;
CREATE DATABASE urban;
USE urban;

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
  `ESTADO` enum('Publico','Privado') NOT NULL DEFAULT 'Publico',
  `BORRADO` enum('Si','No') NOT NULL DEFAULT 'No',
  `FECHA_CREACION` datetime NOT NULL,
  `FKGRUPO` int(9) UNSIGNED NOT NULL,
  `FKUSUARIO` int(9) UNSIGNED NOT NULL,
  `FKMULTIMEDIA` int(9) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `chat`
--

INSERT INTO `chat` (`ID`, `TITULO`, `ESTADO`, `BORRADO`, `FECHA_CREACION`, `FKGRUPO`, `FKUSUARIO`, `FKMULTIMEDIA`) VALUES
(1, 'vecinos wash', 'Publico', 'No', '2018-01-03 00:00:00', 1, 1, 1),
(2, 'solo los del ph', 'Privado', 'No', '2018-01-12 00:00:00', 1, 1, 40),
(4, 'vecinos wash', 'Publico', 'No', '2018-01-18 00:00:00', 3, 2, 41);

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
  `FKMULTIMEDIA` int(9) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `comentario_chat`
--

INSERT INTO `comentario_chat` (`ID`, `COMENTARIO`, `FECHA_CREACION`, `BORRADO`, `FKUSUARIO`, `FKCHAT`, `FKMULTIMEDIA`) VALUES
(1, 'aca texto', '2018-01-03 21:46:50', 'No', 1, 1, NULL),
(2, 'aca mas texto', '2018-01-03 21:46:57', 'No', 1, 1, NULL),
(3, 'fefewfwe', '2018-01-03 21:47:01', 'No', 1, 1, NULL),
(4, 'fwefefweww', '2018-01-03 21:47:04', 'No', 1, 1, NULL),
(5, 'qqqqqqqqqqqqqqqq', '2018-01-03 21:47:06', 'No', 1, 1, NULL),
(6, 'xxsxascs', '2018-01-03 21:47:09', 'No', 1, 1, NULL),
(7, 'vdsvsd', '2018-01-03 21:47:23', 'No', 1, 1, NULL),
(8, 'fjeiogwheg rjg yreiugrhgiu erhiguerh gerhgrh g', '2018-01-07 20:29:20', 'No', 1, 1, NULL),
(9, 'efwfew few', '2018-01-07 20:29:31', 'No', 1, 1, NULL),
(10, 'aca un texty', '2018-01-07 20:49:20', 'No', 1, 1, NULL),
(11, 'aca oytro', '2018-01-07 20:49:23', 'No', 1, 1, NULL),
(12, 'fjewufjwefwe', '2018-01-08 18:46:25', 'No', 1, 2, NULL),
(13, 'fwefewfewfwe', '2018-01-08 18:46:27', 'No', 1, 2, NULL),
(14, 'asddasss', '2018-01-08 18:46:29', 'No', 1, 2, NULL),
(15, '', '2018-01-08 18:46:31', 'No', 1, 2, NULL),
(16, 'aca un super coment re cheto', '2018-01-08 18:46:39', 'No', 1, 2, NULL),
(17, 'aca para sin cargar todavia', '2018-01-08 19:22:11', 'No', 1, 2, NULL),
(18, 'aca mas', '2018-01-08 19:30:45', 'No', 1, 2, NULL),
(19, 'y mas', '2018-01-08 19:30:46', 'No', 1, 2, NULL),
(20, 'y mas', '2018-01-08 19:30:47', 'No', 1, 2, NULL),
(21, 'mmmmmmmmmmmmm', '2018-01-08 19:57:27', 'No', 1, 1, NULL),
(22, 'aaaaaa', '2018-01-08 19:57:31', 'No', 1, 1, NULL),
(23, 'eeee', '2018-01-08 19:57:36', 'No', 1, 1, NULL),
(24, 'teeeeeeexto', '2018-01-08 20:16:31', 'No', 1, 2, NULL),
(25, 'ahfwuqifhe', '2018-01-08 20:21:46', 'No', 1, 2, NULL),
(26, 'fnewifewkjf', '2018-01-08 20:21:47', 'No', 1, 2, NULL),
(27, '''whefiwejf', '2018-01-08 20:21:49', 'No', 1, 2, NULL),
(28, 'SIN UUID', '2018-01-08 20:23:10', 'No', 1, 2, NULL),
(29, 'acaa tect', '2018-01-08 20:33:24', 'No', 1, 2, NULL),
(30, 'hgiughrwgnjkerger', '2018-01-08 20:48:38', 'No', 1, 2, NULL),
(31, 'webgnjwrgklr', '2018-01-08 20:52:38', 'No', 1, 2, NULL),
(32, 'igjerigkerj', '2018-01-08 20:52:40', 'No', 1, 2, NULL),
(33, 'iergkerger', '2018-01-08 20:52:41', 'No', 1, 2, NULL),
(34, 'njgew', '2018-01-08 20:53:20', 'No', 1, 2, NULL),
(35, 'hfuewfhewj', '2018-01-08 20:53:21', 'No', 1, 2, NULL),
(36, 'fjewifkjewfew', '2018-01-08 20:53:22', 'No', 1, 2, NULL),
(37, 'dddddddddddddd', '2018-01-08 20:54:58', 'No', 1, 2, NULL),
(38, 'aaaaaaaaaaaaaaaaaaa', '2018-01-08 20:55:00', 'No', 1, 2, NULL),
(39, '', '2018-01-08 20:55:01', 'No', 1, 2, NULL),
(40, 'sasasasa', '2018-01-08 20:55:04', 'No', 1, 2, NULL),
(41, 'dsfdfghjkl', '2018-01-08 21:02:16', 'No', 1, 2, NULL),
(42, '', '2018-01-08 21:02:16', 'No', 1, 2, NULL),
(43, 'SDFGHJK', '2018-01-08 21:02:21', 'No', 1, 2, NULL),
(44, 'FWEFEWFWEFWE', '2018-01-08 21:02:24', 'No', 1, 2, NULL),
(45, 'defewfgwjfk  fwue fhwf hhewufh wjfw', '2018-01-08 22:09:07', 'No', 1, 2, NULL),
(46, 'fefwefewff wfe ewf', '2018-01-08 22:09:11', 'No', 1, 2, NULL),
(47, '', '2018-01-08 22:09:11', 'No', 1, 2, NULL),
(48, 'dwdwq', '2018-01-08 22:22:53', 'No', 1, 2, NULL),
(49, 'dqwdwdqw', '2018-01-08 22:22:57', 'No', 1, 2, NULL),
(50, 'fkewjfekfewjfkew', '2018-01-08 22:24:55', 'No', 1, 2, NULL),
(51, 'aca el id va a ser re piola wachi', '2018-01-08 22:27:59', 'No', 1, 2, NULL),
(52, 'gerger', '2018-01-08 22:28:29', 'No', 1, 2, NULL),
(53, 'fheuf euif ewfh ewfg ewh', '2018-01-08 22:53:34', 'No', 1, 2, NULL),
(54, 'wehfnhewfhewjkfnewjkfewjkfewjh', '2018-01-08 22:55:08', 'No', 1, 2, NULL),
(55, 'fenjfkwe', '2018-01-08 23:00:36', 'No', 1, 2, NULL),
(56, 'fweikfewfwefewfew', '2018-01-08 23:00:38', 'No', 1, 2, NULL),
(57, 'safasfsa', '2018-01-08 23:22:32', 'No', 1, 2, NULL),
(58, 'fsafasfas', '2018-01-08 23:22:34', 'No', 1, 2, NULL),
(59, 'fasfasfasfasf', '2018-01-08 23:22:35', 'No', 1, 2, NULL),
(60, 'fasfasfas', '2018-01-08 23:22:36', 'No', 1, 2, NULL),
(61, '', '2018-01-08 23:22:36', 'No', 1, 2, NULL),
(62, '', '2018-01-08 23:22:36', 'No', 1, 2, NULL),
(63, 'fasfafasfafa', '2018-01-08 23:22:38', 'No', 1, 2, NULL),
(64, 'fbewnjfkew', '2018-01-10 18:21:56', 'No', 1, 2, NULL),
(65, 'cafwqfefew', '2018-01-10 18:22:05', 'No', 1, 2, NULL),
(66, 'rjgrgrw', '2018-01-10 18:22:52', 'No', 1, 2, NULL),
(67, 'aca texxxxxxt', '2018-01-10 18:35:06', 'No', 1, 2, NULL),
(68, 'fewfewfewfewfe', '2018-01-10 18:35:45', 'No', 1, 2, NULL),
(69, 'dvdsvdsvsd', '2018-01-11 01:01:25', 'No', 2, 2, NULL),
(70, 'aca mi coment re turro', '2018-01-11 18:20:30', 'No', 2, 2, NULL),
(71, 'asxsacsa', '2018-01-11 18:28:02', 'No', 2, 2, NULL),
(72, 'fefewfew', '2018-01-11 18:36:29', 'No', 2, 2, NULL),
(73, 'sssss', '2018-01-11 18:50:12', 'No', 2, 2, NULL),
(74, 'fafafsafasfasfasfas', '2018-01-11 18:51:09', 'No', 2, 2, NULL),
(75, 'dadasdas', '2018-01-11 18:51:37', 'No', 2, 2, NULL),
(76, 'ddwqdqw', '2018-01-11 18:51:55', 'No', 2, 2, NULL),
(77, 'fewfwefwefewfwe', '2018-01-11 18:52:33', 'No', 2, 2, NULL),
(78, 'ngkergleer', '2018-01-11 18:54:22', 'No', 2, 2, NULL),
(79, 'ccccccccccccccccccccc', '2018-01-11 18:54:51', 'No', 2, 2, NULL),
(80, 'csaasas', '2018-01-11 18:55:13', 'No', 2, 2, NULL),
(81, 'sssasasasa', '2018-01-11 18:57:26', 'No', 2, 2, NULL),
(82, 'mmmmmmmmmmmmm', '2018-01-11 18:59:01', 'No', 2, 2, NULL),
(83, 'fewfwefwefwefe', '2018-01-11 18:59:44', 'No', 2, 2, NULL),
(84, 'fsdfsdfsdfsdfsdfsd', '2018-01-11 19:02:30', 'No', 2, 2, NULL),
(85, '', '2018-01-11 19:02:30', 'No', 2, 2, NULL),
(86, 'aca yo', '2018-01-11 20:28:20', 'No', 1, 2, NULL),
(87, 'aca yo denuevo', '2018-01-11 20:30:52', 'No', 1, 2, NULL),
(88, 'miio', '2018-01-11 20:38:26', 'No', 2, 2, NULL),
(89, '', '2018-01-11 20:38:26', 'No', 2, 2, NULL),
(90, 'te voy a', '2018-01-11 20:40:47', 'No', 2, 2, NULL),
(91, 'desaaaa', '2018-01-11 20:59:46', 'No', 2, 2, NULL),
(92, '', '2018-01-11 20:59:46', 'No', 2, 2, NULL),
(93, 'del ph', '2018-01-11 21:22:54', 'No', 1, 2, NULL),
(94, 'vecinos wash', '2018-01-13 22:49:13', 'No', 1, 1, NULL),
(95, 'TODOS?', '2018-01-13 23:06:17', 'No', 2, 1, NULL),
(96, 'na. solo wash', '2018-01-13 23:07:19', 'No', 2, 1, NULL),
(97, 'no, solo washington', '2018-01-13 23:07:32', 'No', 2, 1, NULL),
(98, 'eaaa amigo', '2018-01-13 23:28:32', 'No', 2, 1, NULL),
(99, 'aca denuevo', '2018-01-13 23:35:11', 'No', 2, 1, NULL),
(100, 'aca el posta wacho', '2018-01-13 23:42:23', 'No', 2, 1, NULL),
(101, 'lo hacemos otro rato', '2018-01-13 23:44:29', 'No', 2, 1, NULL),
(102, 'escribo', '2018-01-14 00:35:25', 'No', 2, 2, NULL),
(103, 'asccssa', '2018-01-14 00:37:05', 'No', 2, 2, NULL),
(104, 'laalalalalalal', '2018-01-14 00:40:37', 'No', 2, 2, NULL),
(105, 'aaaaaaaaaaaaaaaa', '2018-01-14 00:41:13', 'No', 1, 2, NULL),
(106, 'saasasasa', '2018-01-14 00:44:22', 'No', 2, 2, NULL),
(107, 'aaaaaaaaaaaaaaaaaaaaaaaaasasasa', '2018-01-14 00:58:31', 'No', 2, 2, NULL),
(108, 'scsacas', '2018-01-14 01:00:24', 'No', 2, 2, NULL),
(109, 'sss', '2018-01-14 01:03:59', 'No', 2, 2, NULL),
(110, 'asasasasasa', '2018-01-14 01:04:36', 'No', 2, 2, NULL),
(111, 'ffffffffffff', '2018-01-14 18:18:57', 'No', 2, 2, NULL),
(112, 'sasa', '2018-01-14 18:31:11', 'No', 2, 2, NULL),
(113, 'saaaaaa', '2018-01-14 18:33:08', 'No', 2, 2, NULL),
(114, 'dadsdsadsa', '2018-01-14 18:35:14', 'No', 2, 2, NULL),
(115, '', '2018-01-14 18:35:29', 'No', 2, 2, NULL),
(116, 'fdfsdfdsfdsf', '2018-01-14 18:35:34', 'No', 2, 2, NULL),
(117, 'ACAAA', '2018-01-14 18:54:33', 'No', 2, 2, NULL),
(118, 'AAAAA', '2018-01-14 18:55:09', 'No', 2, 2, NULL),
(119, 'sasaSA', '2018-01-14 20:08:39', 'No', 2, 2, NULL),
(120, 'que', '2018-01-14 20:27:45', 'No', 2, 2, NULL),
(121, 'mmmmm', '2018-01-14 20:31:30', 'No', 2, 2, NULL),
(122, 'sdfghjkl;''jhgfc', '2018-01-14 20:36:52', 'No', 2, 2, NULL),
(123, 'ssssssssssssssssss', '2018-01-14 20:55:25', 'No', 2, 2, NULL),
(124, 'sssssssssssssasasa', '2018-01-14 20:59:17', 'No', 2, 2, NULL),
(125, '123456789', '2018-01-14 21:00:29', 'No', 2, 2, NULL),
(126, 'aaaaaaaaaaaaaa', '2018-01-14 21:03:46', 'No', 2, 2, NULL),
(127, 'dddddddddddddddddd', '2018-01-14 21:04:30', 'No', 2, 2, NULL),
(128, 'qqwwwww', '2018-01-14 21:04:58', 'No', 2, 2, NULL),
(129, '444444444444444', '2018-01-14 21:05:36', 'No', 2, 2, NULL),
(130, '111111111111', '2018-01-14 21:07:02', 'No', 2, 2, NULL),
(131, '33333', '2018-01-14 21:09:31', 'No', 2, 2, NULL),
(132, '111111111111112222', '2018-01-14 21:10:08', 'No', 2, 2, NULL),
(133, 'wwwwwwwwwwwwwwwwwwwwwwwwwwwi', '2018-01-14 21:11:12', 'No', 2, 2, NULL),
(134, 'esta es la posta wacho', '2018-01-14 22:12:48', 'No', 2, 2, NULL),
(135, 'qqqqqqqqqqqqqqqq', '2018-01-14 22:19:20', 'No', 2, 2, NULL),
(136, 'a donde fue', '2018-01-14 22:23:24', 'No', 2, 2, NULL),
(137, 'aaaa dondeeee', '2018-01-14 22:24:13', 'No', 2, 2, NULL),
(138, 'te lo juro por dios', '2018-01-14 22:27:09', 'No', 2, 2, NULL),
(139, '1234', '2018-01-14 22:29:58', 'No', 2, 2, NULL),
(140, 'qqqqq', '2018-01-14 22:41:19', 'No', 2, 2, NULL),
(141, 'rolling back to you', '2018-01-14 22:45:47', 'No', 2, 2, NULL),
(142, 'aca otro', '2018-01-14 22:46:18', 'No', 2, 2, NULL),
(143, 'dasdasdsa', '2018-01-14 22:51:46', 'No', 2, 2, NULL),
(144, 'dfdsfdsfdsfd', '2018-01-14 22:52:23', 'No', 2, 2, NULL),
(145, 'waw', '2018-01-14 22:54:25', 'No', 2, 2, NULL),
(146, 'xxxxxxxxxxxxxxxxx', '2018-01-14 23:02:26', 'No', 2, 2, NULL),
(147, 'cuando yo le meto', '2018-01-14 23:09:46', 'No', 2, 2, NULL),
(148, '2222245', '2018-01-14 23:12:40', 'No', 2, 2, NULL),
(149, '........', '2018-01-14 23:17:03', 'No', 2, 2, NULL),
(150, '12345', '2018-01-14 23:17:38', 'No', 2, 2, NULL),
(151, '--------', '2018-01-14 23:18:35', 'No', 2, 2, NULL),
(152, '123214124', '2018-01-14 23:21:29', 'No', 2, 2, NULL),
(153, 'dsdsadsad', '2018-01-14 23:23:13', 'No', 2, 2, NULL),
(154, '777', '2018-01-14 23:24:30', 'No', 2, 2, NULL),
(155, 'dasdadas', '2018-01-14 23:45:59', 'No', 2, 2, NULL),
(156, '12345678', '2018-01-14 23:47:13', 'No', 2, 2, NULL),
(157, '123456', '2018-01-14 23:48:24', 'No', 2, 2, NULL),
(158, '3333333333333', '2018-01-14 23:49:29', 'No', 2, 2, NULL),
(159, '''''''''''''''''''''''''''''''''''''', '2018-01-14 23:50:09', 'No', 2, 2, NULL),
(160, 'ddddddddddddddd', '2018-01-14 23:51:19', 'No', 2, 2, NULL),
(161, 'llllllllll', '2018-01-14 23:52:53', 'No', 2, 2, NULL),
(162, '1111111111111111', '2018-01-14 23:53:23', 'No', 2, 2, NULL),
(163, '', '2018-01-14 23:53:23', 'No', 2, 2, NULL),
(164, '333333333333', '2018-01-14 23:54:00', 'No', 2, 2, NULL),
(165, 'paso paso paso', '2018-01-14 23:54:37', 'No', 2, 2, NULL),
(166, 'paaaa papapappapapa pas', '2018-01-14 23:54:54', 'No', 2, 2, NULL),
(167, 'lllll', '2018-01-14 23:57:17', 'No', 2, 2, NULL),
(168, 'vamos a jugar', '2018-01-15 00:00:13', 'No', 2, 2, NULL),
(169, 'aca uno mas', '2018-01-15 00:09:10', 'No', 2, 2, NULL),
(170, 'sasasa', '2018-01-15 00:14:28', 'No', 2, 2, NULL),
(171, '00000', '2018-01-15 00:16:56', 'No', 2, 2, NULL),
(172, '1111111111', '2018-01-15 00:17:56', 'No', 2, 2, NULL),
(173, 'qqqqqq', '2018-01-15 00:19:43', 'No', 2, 2, NULL),
(174, 'llllllllll', '2018-01-15 00:29:26', 'No', 2, 2, NULL),
(175, 'cccccccccccc', '2018-01-15 00:32:36', 'No', 2, 2, NULL),
(176, '', '2018-01-15 00:32:36', 'No', 2, 2, NULL),
(177, '22222222222', '2018-01-15 00:33:31', 'No', 2, 2, NULL),
(178, 'pppppppp', '2018-01-15 00:35:27', 'No', 2, 2, NULL),
(179, '333', '2018-01-15 00:36:23', 'No', 2, 2, NULL),
(180, '000', '2018-01-15 00:36:58', 'No', 2, 2, NULL),
(181, 'dsd', '2018-01-15 00:37:38', 'No', 2, 2, NULL),
(182, 'dfd', '2018-01-15 00:38:16', 'No', 2, 2, NULL),
(183, 'aca pasa la magia', '2018-01-15 00:38:43', 'No', 2, 2, NULL),
(184, 'aca tambien', '2018-01-15 00:54:46', 'No', 2, 2, NULL),
(185, 'llll', '2018-01-15 00:58:48', 'No', 2, 2, NULL),
(186, '111', '2018-01-15 01:06:07', 'No', 2, 2, NULL),
(187, '222', '2018-01-15 01:06:51', 'No', 2, 2, NULL),
(188, 'zzzzzzzzz', '2018-01-15 01:12:22', 'No', 2, 2, NULL),
(189, 'qqqqqqq', '2018-01-15 01:13:16', 'No', 2, 2, NULL),
(190, '2222', '2018-01-15 01:13:52', 'No', 2, 2, NULL),
(191, 'lll', '2018-01-15 01:15:39', 'No', 2, 2, NULL),
(192, 'sasa', '2018-01-15 01:18:09', 'No', 2, 2, NULL),
(193, 'sasa', '2018-01-15 01:18:57', 'No', 2, 2, NULL),
(194, 'q', '2018-01-15 01:43:08', 'No', 2, 2, NULL),
(195, 'one', '2018-01-15 02:01:20', 'No', 2, 2, NULL),
(196, '22', '2018-01-15 02:03:14', 'No', 2, 2, NULL),
(197, '11', '2018-01-15 02:03:32', 'No', 2, 2, NULL),
(198, '3', '2018-01-15 02:06:31', 'No', 2, 2, NULL),
(199, '111', '2018-01-15 02:07:28', 'No', 2, 2, NULL),
(200, 'll', '2018-01-15 02:09:45', 'No', 2, 2, NULL),
(201, 'kk', '2018-01-15 02:12:52', 'No', 2, 2, NULL),
(202, '1111', '2018-01-15 02:13:36', 'No', 2, 2, NULL),
(203, '33', '2018-01-15 02:13:41', 'No', 2, 2, NULL),
(204, 'no nos culpen de lo que pase', '2018-01-15 19:27:15', 'No', 2, 2, NULL),
(205, 'because i got high', '2018-01-15 19:47:38', 'No', 2, 2, NULL),
(206, 'q', '2018-01-15 19:51:11', 'No', 2, 2, NULL);

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
(12, 'aca coment', 'No', '2018-01-05 17:29:13', 1, 1);

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
(1, 'vecinos de washington', -58.4706906000, -34.5684585000, 'Publico', 'No', 1),
(2, 'otro grupo', -58.4671126000, -34.5723343000, 'Privado', 'No', NULL),
(3, 'puti', -58.4705184000, -34.5681798000, 'Publico', 'No', 41);

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
(41, 'C:/xampp/htdocs/Urban-App/img/grupos/3/9.jpeg', 'No');

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
(78, 'aca para todos sin foto', 'sin fotiti', NULL, '2018-01-07 19:31:05', 'No', 1, 1),
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
(1, 'iara@hotmail.com', 'iara', 'nizza', '99fb2f48c6af4761f904fc85f95eb56190e5d40b1f44ec3a9c1fa319', '1995-04-18', -58.4704681000, -34.5682756000, 'Washington 2239', 'Oculta', '2018-01-03 17:36:01', 'No', 'Usuario', 'No', NULL, NULL),
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
(1, 2),
(2, 3),
(2, 1),
(2, 1),
(2, 1),
(2, 1),
(2, 1),
(2, 1);

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
  ADD KEY `FKMULTIMEDIA` (`FKMULTIMEDIA`),
  ADD KEY `index_titulo_chat` (`TITULO`);

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
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `chat_usuario`
--
ALTER TABLE `chat_usuario`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `comentario_chat`
--
ALTER TABLE `comentario_chat`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=207;
--
-- AUTO_INCREMENT de la tabla `comentario_publicacion`
--
ALTER TABLE `comentario_publicacion`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
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
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `list_item`
--
ALTER TABLE `list_item`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `multimedia`
--
ALTER TABLE `multimedia`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
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
