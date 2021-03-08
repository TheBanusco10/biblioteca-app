-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 06-03-2021 a las 19:13:28
-- Versión del servidor: 5.7.26
-- Versión de PHP: 7.2.18

SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE biblioteca;
USE biblioteca;


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `biblioteca`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

DROP TABLE IF EXISTS `comentarios`;
CREATE TABLE IF NOT EXISTS `comentarios` (
  `idUsuario` int(11) NOT NULL,
  `idLibro` int(11) NOT NULL,
  `comentario` varchar(250) DEFAULT NULL,
  KEY `fk_Usuarios_has_Libros_Libros2_idx` (`idLibro`),
  KEY `fk_Usuarios_has_Libros_Usuarios1_idx` (`idUsuario`)
) ;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`idUsuario`, `idLibro`, `comentario`) VALUES
(1, 1, 'Este libro es mi favorito, una historia increíble que te hará viajar por el mundo de fantasía. Aunque Palabras Ordenadas tampoco se queda atrás.'),
(2, 2, 'Esta es mi segundo comentario de un libro, me ha gustado mucho.'),
(2, 1, 'Uno de los mejores libros que se pueden leer, ha sido todo un acierto comprarlo.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros`
--

DROP TABLE IF EXISTS `libros`;
CREATE TABLE IF NOT EXISTS `libros` (
  `idLibro` int(11) NOT NULL AUTO_INCREMENT,
  `tituloLibro` varchar(70) DEFAULT NULL,
  `autorLibro` varchar(150) DEFAULT NULL,
  `descripcionLibro` mediumtext,
  `puntuacionLibro` int(11) DEFAULT NULL,
  `generoLibro` varchar(45) DEFAULT NULL,
  `imagenLibro` varchar(300) DEFAULT NULL,
  `stockLibro` int(11) DEFAULT '64',
  PRIMARY KEY (`idLibro`)
) ;

--
-- Volcado de datos para la tabla `libros`
--

INSERT INTO `libros` (`idLibro`, `tituloLibro`, `autorLibro`, `descripcionLibro`, `puntuacionLibro`, `generoLibro`, `imagenLibro`, `stockLibro`) VALUES
(1, 'Manslaughter', 'Dewain Long', 'Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis.', 1, 'Drama', 'https://picsum.photos/200/250', 64),
(2, 'Hound of the Baskervilles, The', 'Lorene Hrihorovich', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices.', 3, 'Comedy|Crime|Mystery', 'https://picsum.photos/200/250', 64),
(3, 'House of Wax', 'Rosemarie Yanez', 'Nunc purus.', 3, 'Crime|Horror|Mystery|Thriller', 'https://picsum.photos/200/250', 64),
(4, 'Benigni', 'Kelcey Hexum', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla.', 1, 'Animation|Comedy|Drama', 'https://picsum.photos/200/250', 64),
(5, 'One Night of Love', 'Ulrick Oolahan', 'Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus.', 10, 'Romance', 'https://picsum.photos/200/250', 64),
(6, 'Stendhal Syndrome, The (Sindrome di Stendhal, La)', 'Afton Klemt', 'Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.', 5, 'Crime|Horror|Thriller', 'https://picsum.photos/200/250', 64),
(7, 'Skipped Parts', 'Min Touson', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', 1, 'Drama|Romance', 'http://dummyimage.com/200x250.png/ff4444/ffffff', 64),
(8, 'Love Songs (Les chansons d\'amour)', 'Cassondra Arsey', 'Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante.', 7, 'Drama|Musical', 'https://picsum.photos/200/250', 64),
(9, 'Hollow Triumph (a.k.a. The Scar)', 'Opal Meagher', 'Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo.', 3, 'Crime|Drama|Film-Noir', 'https://picsum.photos/200/250', 64),
(10, 'Once Upon a Forest', 'Cate Hodcroft', 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.', 6, 'Adventure|Animation|Children|Fantasy', 'https://picsum.photos/200/250', 64),
(11, 'Palabras Ordenadas', 'David Jiménez Villarejo', 'En este libro están recopilados todos los relatos y poemas que he ido escribiendo. En ellos, plasmo lo que he sentido y siento; espero que disfrutéis leyéndolos y que os haga pensar en algo especial de vosotros.\r\n\r\n<p><a href=\"https://mybook.to/PalabrasOrdenadas\" target=\"_blank\">Ver más</a></p>', 10, 'Poesía|Amor|Relatos', 'https://i.imgur.com/X4hJkcZ.jpg', 65),
(12, 'El Hogar', 'David Jiménez Villarejo', '1985, en las afueras de Bridge Rock, una cabaña espera nuevos inquilinos. En un lugar maravilloso, rodeada de un bosque y con un gran lago de agua cristalina a su lado, pero sin personas que hayan vivido en ella en más de veinte años, ¿o igual sí?\r\n\r\nConoce la historia de Érica Wilson en este relato corto, una niña de diez años que llega con sus padres a un nuevo hogar. Sumérgete hasta el final para saber qué misterio le espera en su vida. ¿Será capaz de encontrar una respuesta para lo que ocurre?\r\n\r\n<p><a href=\"https://www.wattpad.com/story/198156165-el-hogar\" target=\"_blank\">Léelo aquí</a></p>', 10, 'Horror|Misterio|Terror', 'https://i.imgur.com/DInFju2.jpg', 64),
(13, 'El Hechicero', 'David Jiménez Villarejo', 'Un joven mago intenta descubrir quién es, por lo que el destino le lleva a la ciudad Reindam.', 8, 'Accion|Drama', 'https://picsum.photos/200/250', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros_prestados`
--

DROP TABLE IF EXISTS `libros_prestados`;
CREATE TABLE IF NOT EXISTS `libros_prestados` (
  `idUsuario` int(11) NOT NULL,
  `idLibro` int(11) NOT NULL,
  `fechaDevolver` date DEFAULT NULL,
  KEY `fk_Libros_prestados_Libros_idx` (`idLibro`),
  KEY `fk_Libros_prestados_Usuarios` (`idUsuario`)
) ;

--
-- Volcado de datos para la tabla `libros_prestados`
--

INSERT INTO `libros_prestados` (`idUsuario`, `idLibro`, `fechaDevolver`) VALUES
(1, 12, '2021-02-05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lista_deseados`
--

DROP TABLE IF EXISTS `lista_deseados`;
CREATE TABLE IF NOT EXISTS `lista_deseados` (
  `idUsuario` int(11) NOT NULL,
  `idLibro` int(11) NOT NULL,
  PRIMARY KEY (`idUsuario`,`idLibro`),
  KEY `fk_Usuarios_has_Libros_Libros1_idx` (`idLibro`),
  KEY `fk_Usuarios_has_Libros_Usuarios2_idx` (`idUsuario`)
) ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `emailUsuario` varchar(150) DEFAULT NULL,
  `passwordUsuario` varchar(20) DEFAULT NULL,
  `rolUsuario` varchar(45) DEFAULT NULL,
  `multaUsuario` int(11) DEFAULT NULL,
  `multaHasta` date DEFAULT NULL,
  PRIMARY KEY (`idUsuario`)
) ;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `emailUsuario`, `passwordUsuario`, `rolUsuario`, `multaUsuario`, `multaHasta`) VALUES
(1, 'test@test.com', '1234', 'usuario', 1, '2021-03-13'),
(2, 'admin@admin.es', '1234', 'bibliotecario', 0, NULL);

--
-- Estructura de tabla para la tabla `Puntuaciones`
--

CREATE TABLE `Puntuaciones` (
  `idPuntuacion` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idLibro` int(11) NOT NULL,
  `puntuacion` int(11) NOT NULL
) ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Puntuaciones`
--
ALTER TABLE `Puntuaciones`
  ADD PRIMARY KEY (`idPuntuacion`),
  ADD KEY `fk_idUsuario` (`idUsuario`),
  ADD KEY `fk_idLibro` (`idLibro`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Puntuaciones`
--
ALTER TABLE `Puntuaciones`
  MODIFY `idPuntuacion` int(11) NOT NULL AUTO_INCREMENT;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Puntuaciones`
--
ALTER TABLE `Puntuaciones`
  ADD CONSTRAINT `fk_idLibro` FOREIGN KEY (`idLibro`) REFERENCES `Libros` (`idLibro`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_idUsuario` FOREIGN KEY (`idUsuario`) REFERENCES `Usuarios` (`idUsuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `fk_Usuarios_has_Libros_Libros2` FOREIGN KEY (`idLibro`) REFERENCES `libros` (`idLibro`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Usuarios_has_Libros_Usuarios1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `libros_prestados`
--
ALTER TABLE `libros_prestados`
  ADD CONSTRAINT `fk_Libros_prestados_Libros` FOREIGN KEY (`idLibro`) REFERENCES `libros` (`idLibro`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Libros_prestados_Usuarios` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
