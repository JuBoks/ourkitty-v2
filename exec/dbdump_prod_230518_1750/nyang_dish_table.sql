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
-- Table structure for table `dish_table`
--

DROP TABLE IF EXISTS `dish_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dish_table` (
  `dish_id` bigint NOT NULL AUTO_INCREMENT,
  `dish_name` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `dish_profile_image_path` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `dish_lat` double NOT NULL,
  `dish_long` double NOT NULL,
  `dish_address` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `location_code` char(10) COLLATE utf8mb4_bin NOT NULL,
  `dish_serial_num` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `dish_weight` char(10) COLLATE utf8mb4_bin NOT NULL,
  `dish_battery_state` char(10) COLLATE utf8mb4_bin NOT NULL,
  `dish_cat_count` int NOT NULL,
  `dish_tnr_count` int NOT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  `created_date` timestamp NOT NULL,
  `updated_date` timestamp NOT NULL,
  PRIMARY KEY (`dish_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dish_table`
--

LOCK TABLES `dish_table` WRITE;
/*!40000 ALTER TABLE `dish_table` DISABLE KEYS */;
INSERT INTO `dish_table` VALUES (1,'미현이네','https://nyang-s3.s3.ap-northeast-2.amazonaws.com/nyang/c9c3a540-604b-41f6-90be-4cf28fc025d6.jpg',35.13005691369173,128.97642009398038,'부산광역시 사하구 하단동 845-53','0020001','LpnNFcE3YrQS490','0120011','0100011',0,0,0,'2023-05-10 01:11:28','2023-05-18 07:45:49'),(2,'아이유정','https://nyang-s3.s3.ap-northeast-2.amazonaws.com/nyang/6ad23d39-f78c-4c60-a7ac-70a8aef3e9cf.jpg',35.09305758448632,128.85386821816107,'부산광역시 강서구 송정동 1625','0020001','2kXBPprXEcOdzPB','0120005','0100006',3,0,0,'2023-05-10 01:11:28','2023-05-18 04:55:02'),(3,'정호네','https://nyang-s3.s3.ap-northeast-2.amazonaws.com/nyang/b536bfb9-db85-4c80-915d-e88d5f41bcd9.jpg',35.091170080213146,128.85324436607576,'부산광역시 강서구 송정동 1625','0020001','EZZwEhRzzs9LvyZ','0120002','0100003',4,0,0,'2023-05-10 01:11:28','2023-05-18 08:25:25'),(10,'testDish','https://nyang-s3.s3.ap-northeast-2.amazonaws.com/animals.png',35.0962444,128.8538,'SSAFY','0020001','asdf','0120011','0100011',5,3,1,'2023-05-12 08:12:02','2023-05-15 07:50:30');
/*!40000 ALTER TABLE `dish_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-18 17:50:51
