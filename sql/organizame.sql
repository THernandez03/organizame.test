/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50621
Source Host           : localhost:3306
Source Database       : organizame

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2017-02-27 18:48:31
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for licencias
-- ----------------------------
DROP TABLE IF EXISTS `licencias`;
CREATE TABLE `licencias` (
  `id` varchar(255) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `descripcion` varchar(150) DEFAULT NULL,
  `tipo` int(11) DEFAULT NULL,
  `precio` float DEFAULT NULL,
  `numeroUsuarios` int(11) DEFAULT NULL,
  `numeroRegistros` int(11) DEFAULT NULL,
  `duracion` float DEFAULT NULL,
  `publicado` int(11) DEFAULT NULL,
  `imagen` varchar(50) DEFAULT NULL,
  `precioMes` float DEFAULT NULL,
  `numeroRegistroMes` int(11) DEFAULT NULL,
  `llamadaAccion` varchar(500) DEFAULT NULL,
  `descripcionAdicional` varchar(500) DEFAULT NULL,
  `activo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of licencias
-- ----------------------------

-- ----------------------------
-- Table structure for login
-- ----------------------------
DROP TABLE IF EXISTS `login`;
CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of login
-- ----------------------------
INSERT INTO `login` VALUES ('1', 'testLogin1', 'noHashed');

-- ----------------------------
-- Table structure for tipolicencia
-- ----------------------------
DROP TABLE IF EXISTS `tipolicencia`;
CREATE TABLE `tipolicencia` (
  `id` int(11) NOT NULL,
  `tipo` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tipolicencia
-- ----------------------------
INSERT INTO `tipolicencia` VALUES ('1', 'testTipoLicencia1');
INSERT INTO `tipolicencia` VALUES ('2', 'testTipoLicencia2');
INSERT INTO `tipolicencia` VALUES ('3', 'testTipoLicencia3');
INSERT INTO `tipolicencia` VALUES ('4', 'testTipoLicencia4');
INSERT INTO `tipolicencia` VALUES ('5', 'testTipoLicencia5');
SET FOREIGN_KEY_CHECKS=1;
