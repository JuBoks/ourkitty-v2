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
-- Table structure for table `management_comment_table`
--

DROP TABLE IF EXISTS `management_comment_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `management_comment_table` (
  `management_comment_id` bigint NOT NULL AUTO_INCREMENT,
  `management_id` bigint NOT NULL,
  `client_id` bigint NOT NULL,
  `management_comment_content` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  `created_date` timestamp NOT NULL,
  `updated_date` timestamp NOT NULL,
  PRIMARY KEY (`management_comment_id`),
  KEY `client_id` (`client_id`),
  KEY `management_id` (`management_id`),
  CONSTRAINT `management_comment_table_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `client_table` (`client_id`),
  CONSTRAINT `management_comment_table_ibfk_2` FOREIGN KEY (`management_id`) REFERENCES `management_table` (`management_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `management_comment_table`
--

LOCK TABLES `management_comment_table` WRITE;
/*!40000 ALTER TABLE `management_comment_table` DISABLE KEYS */;
INSERT INTO `management_comment_table` VALUES (1,1,8,'111',1,'2023-05-15 03:17:45','2023-05-16 02:31:19'),(2,2,8,'adggh',1,'2023-05-15 03:18:11','2023-05-16 02:31:31'),(3,1,8,'ffff',1,'2023-05-15 05:29:30','2023-05-16 02:31:19'),(4,1,8,'njhh',1,'2023-05-15 05:29:36','2023-05-16 02:31:19'),(5,1,8,'cgff',1,'2023-05-15 05:59:22','2023-05-16 00:15:01'),(6,1,8,'dgg',1,'2023-05-15 13:09:04','2023-05-16 00:15:08'),(7,3,8,'rfgh',1,'2023-05-16 03:11:01','2023-05-16 03:11:04'),(8,3,8,'ghh',1,'2023-05-16 12:37:34','2023-05-16 12:37:38'),(9,12,8,'123ㄷㄱㄱ',1,'2023-05-17 06:33:10','2023-05-17 06:33:14'),(10,17,10,'혹시 위치 좀 자세히 말씀해주실 수 있나요?',0,'2023-05-18 01:22:34','2023-05-18 01:22:34'),(11,18,10,'방금 다녀와서 약 발라줬습니다?',0,'2023-05-18 01:23:41','2023-05-18 01:23:41'),(12,17,11,'위치정보 올려놨습니다!!!!!',0,'2023-05-18 02:01:51','2023-05-18 02:01:51'),(13,16,9,'귀여워용',1,'2023-05-18 06:06:18','2023-05-18 06:09:24');
/*!40000 ALTER TABLE `management_comment_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-18 15:59:46
