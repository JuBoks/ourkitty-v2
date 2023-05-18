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
-- Table structure for table `client_dish_table`
--

DROP TABLE IF EXISTS `client_dish_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client_dish_table` (
  `client_dish_id` bigint NOT NULL AUTO_INCREMENT,
  `client_id` bigint NOT NULL,
  `dish_id` bigint NOT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  `created_date` timestamp NOT NULL,
  `updated_date` timestamp NOT NULL,
  PRIMARY KEY (`client_dish_id`),
  KEY `client_id` (`client_id`),
  KEY `dish_id` (`dish_id`),
  CONSTRAINT `client_dish_table_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `client_table` (`client_id`),
  CONSTRAINT `client_dish_table_ibfk_2` FOREIGN KEY (`dish_id`) REFERENCES `dish_table` (`dish_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_dish_table`
--

LOCK TABLES `client_dish_table` WRITE;
/*!40000 ALTER TABLE `client_dish_table` DISABLE KEYS */;
INSERT INTO `client_dish_table` VALUES (5,7,3,0,'2023-05-12 08:37:10','2023-05-12 08:37:10'),(6,8,1,0,'2023-05-15 00:24:44','2023-05-15 00:24:44'),(7,9,1,0,'2023-05-15 00:26:55','2023-05-15 00:26:55'),(8,9,2,0,'2023-05-15 00:26:55','2023-05-15 00:26:55'),(9,8,2,0,'2023-05-16 04:22:40','2023-05-16 04:22:40'),(10,8,3,0,'2023-05-17 06:00:22','2023-05-17 06:00:22'),(11,10,2,0,'2023-05-17 07:57:06','2023-05-17 07:57:06'),(12,11,2,0,'2023-05-17 07:58:43','2023-05-17 07:58:43'),(13,11,3,0,'2023-05-17 07:58:43','2023-05-17 07:58:43'),(14,12,1,0,'2023-05-17 07:59:24','2023-05-17 07:59:24'),(15,12,2,0,'2023-05-17 07:59:24','2023-05-17 07:59:24'),(16,9,3,0,'2023-05-17 08:14:54','2023-05-17 08:14:54'),(17,7,1,0,'2023-05-17 08:35:04','2023-05-17 08:35:04'),(18,7,2,0,'2023-05-17 08:35:04','2023-05-17 08:35:04'),(19,10,1,0,'2023-05-17 08:35:15','2023-05-17 08:35:15'),(20,10,3,0,'2023-05-17 08:35:15','2023-05-17 08:35:15'),(21,11,1,0,'2023-05-17 08:35:20','2023-05-17 08:35:20');
/*!40000 ALTER TABLE `client_dish_table` ENABLE KEYS */;
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
