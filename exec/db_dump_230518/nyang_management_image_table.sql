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
-- Table structure for table `management_image_table`
--

DROP TABLE IF EXISTS `management_image_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `management_image_table` (
  `management_image_id` bigint NOT NULL AUTO_INCREMENT,
  `management_id` bigint NOT NULL,
  `image_path` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  `created_date` timestamp NOT NULL,
  `updated_date` timestamp NOT NULL,
  PRIMARY KEY (`management_image_id`),
  KEY `management_id` (`management_id`),
  CONSTRAINT `management_image_table_ibfk_1` FOREIGN KEY (`management_id`) REFERENCES `management_table` (`management_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `management_image_table`
--

LOCK TABLES `management_image_table` WRITE;
/*!40000 ALTER TABLE `management_image_table` DISABLE KEYS */;
INSERT INTO `management_image_table` VALUES (1,1,'https://nyang-s3.s3.ap-northeast-2.amazonaws.com/nyang/67bb6b29-4c74-4967-8fbd-1527b752e937.jpg',1,'2023-05-15 02:14:54','2023-05-16 02:31:19'),(2,2,'https://nyang-s3.s3.ap-northeast-2.amazonaws.com/nyang/67bb6b29-4c74-4967-8fbd-1527b752e937.jpg',1,'2023-05-15 02:14:59','2023-05-16 02:31:31'),(3,3,'https://nyang-s3.s3.ap-northeast-2.amazonaws.com/nyang/d791bef1-fd2c-48fb-8231-b9538e2df8e8.jpg',1,'2023-05-15 06:55:54','2023-05-17 00:28:49'),(4,11,'https://nyang-s3.s3.ap-northeast-2.amazonaws.com/nyang/f53c19fe-9067-4112-84ba-1ecd09adc730.jpg',1,'2023-05-16 12:38:24','2023-05-16 12:38:36'),(5,15,'https://nyang-s3.s3.ap-northeast-2.amazonaws.com/nyang/78c3186c-973f-4967-b32b-707de9ca907a.jpg',1,'2023-05-17 08:50:56','2023-05-17 15:15:27'),(6,16,'https://nyang-s3.s3.ap-northeast-2.amazonaws.com/nyang/00cf19e4-c2a8-4fa3-950c-a588c212390c.jpg',0,'2023-05-18 01:03:34','2023-05-18 01:03:34'),(7,17,'https://nyang-s3.s3.ap-northeast-2.amazonaws.com/nyang/49b737f9-c913-401b-8544-ac57f610d72a.jpg',0,'2023-05-18 01:18:13','2023-05-18 01:18:13'),(8,18,'https://nyang-s3.s3.ap-northeast-2.amazonaws.com/nyang/56c03ae2-49c9-4542-90a4-3b8773fdac39.jpg',0,'2023-05-18 01:21:25','2023-05-18 01:21:25'),(9,21,'https://nyang-s3.s3.ap-northeast-2.amazonaws.com/nyang/fa5de70d-9750-4539-8724-b584b7104656.jpg',0,'2023-05-18 02:00:59','2023-05-18 02:00:59'),(10,22,'https://nyang-s3.s3.ap-northeast-2.amazonaws.com/nyang/973d47b7-891d-4358-809a-04c693afcd11.jpg',0,'2023-05-18 02:05:12','2023-05-18 02:05:12'),(11,24,'https://nyang-s3.s3.ap-northeast-2.amazonaws.com/nyang/955a7ffd-386e-400c-8702-3cabd966b97f.jpg',0,'2023-05-18 02:10:24','2023-05-18 02:10:24');
/*!40000 ALTER TABLE `management_image_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-18 15:59:50
