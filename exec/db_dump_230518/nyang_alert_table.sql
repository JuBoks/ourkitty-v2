-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: k8e2031.p.ssafy.io    Database: nyang
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alert_table`
--

DROP TABLE IF EXISTS `alert_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alert_table` (
  `alert_id` bigint NOT NULL AUTO_INCREMENT,
  `alert_code` char(10) COLLATE utf8mb4_bin NOT NULL,
  `alert_content` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `management_id` bigint DEFAULT NULL,
  `dish_id` bigint DEFAULT NULL,
  `report_id` bigint DEFAULT NULL,
  `alert_state` char(10) COLLATE utf8mb4_bin NOT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  `created_date` timestamp NOT NULL,
  `updated_date` timestamp NOT NULL,
  PRIMARY KEY (`alert_id`),
  KEY `management_id` (`management_id`),
  KEY `dish_id` (`dish_id`),
  KEY `report_id` (`report_id`),
  CONSTRAINT `alert_table_ibfk_1` FOREIGN KEY (`management_id`) REFERENCES `management_table` (`management_id`),
  CONSTRAINT `alert_table_ibfk_2` FOREIGN KEY (`dish_id`) REFERENCES `dish_table` (`dish_id`),
  CONSTRAINT `alert_table_ibfk_3` FOREIGN KEY (`report_id`) REFERENCES `report_table` (`report_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alert_table`
--

LOCK TABLES `alert_table` WRITE;
/*!40000 ALTER TABLE `alert_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `alert_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-18 15:59:53
