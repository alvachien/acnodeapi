-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.1.13-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for actest
DROP DATABASE IF EXISTS `actest`;
CREATE DATABASE IF NOT EXISTS `actest` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `actest`;


-- Dumping structure for table actest.client
DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `Name` varchar(50) NOT NULL,
  `ID` varchar(50) NOT NULL,
  `Secret` varchar(50) NOT NULL,
  `UserID` varchar(50) NOT NULL,
  PRIMARY KEY (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table actest.client: ~0 rows (approximately)
DELETE FROM `client`;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
/*!40000 ALTER TABLE `client` ENABLE KEYS */;


-- Dumping structure for table actest.todoitem
DROP TABLE IF EXISTS `todoitem`;
CREATE TABLE IF NOT EXISTS `todoitem` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Details` varchar(200) NOT NULL,
  `Assignee` varchar(50) DEFAULT NULL,
  `ParentID` int(11) DEFAULT NULL,
  `Depend` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='todo item';

-- Dumping data for table actest.todoitem: ~1 rows (approximately)
DELETE FROM `todoitem`;
/*!40000 ALTER TABLE `todoitem` DISABLE KEYS */;
INSERT INTO `todoitem` (`ID`, `Name`, `Details`, `Assignee`, `ParentID`, `Depend`) VALUES
	(1, 'Test1', 'Test1', NULL, NULL, NULL);
/*!40000 ALTER TABLE `todoitem` ENABLE KEYS */;


-- Dumping structure for table actest.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `Name` varchar(50) NOT NULL,
  `DisplayAs` varbinary(50) NOT NULL,
  `HashedPassword` varbinary(50) NOT NULL,
  `RegisterDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Name`),
  UNIQUE KEY `DisplayAs` (`DisplayAs`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='user info';

-- Dumping data for table actest.user: ~0 rows (approximately)
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
