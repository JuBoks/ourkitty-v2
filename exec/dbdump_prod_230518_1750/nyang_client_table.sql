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
-- Table structure for table `client_table`
--

DROP TABLE IF EXISTS `client_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client_table` (
  `client_id` bigint NOT NULL AUTO_INCREMENT,
  `client_email` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `client_password` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `client_name` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `client_nickname` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `client_profile_image_path` varchar(255) COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `client_address` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `client_phone` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `user_code` char(10) COLLATE utf8mb4_bin NOT NULL,
  `location_code` char(10) COLLATE utf8mb4_bin NOT NULL,
  `last_posting_date` timestamp NOT NULL,
  `user_state` char(10) COLLATE utf8mb4_bin NOT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  `client_description` varchar(255) COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `created_date` timestamp NOT NULL,
  `updated_date` timestamp NOT NULL,
  PRIMARY KEY (`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_table`
--

LOCK TABLES `client_table` WRITE;
/*!40000 ALTER TABLE `client_table` DISABLE KEYS */;
INSERT INTO `client_table` VALUES (2,'ourkittyKR','$2a$10$4/RCqVxc5J8UkS7ivsF09umM2wy3i4VkWxE8S/fCdIlHKz6MUfKeG','admin','테스트관리자','','477, Nakdongbuk-ro, Gangseo-gu, Busan, Republic of Korea','010-0000-0002','0010002','0020001','2023-05-10 01:11:28','0110001',0,'','2023-05-10 01:11:28','2023-05-10 01:11:28'),(5,'consultant@ssafy.com','$2a$10$URlnKnYUThXPyQbFjQzf4eVrQSLNvY19AyICcCJsHAQ.jQRJ/Q21e','consultant','컨설턴트','','ssafy 202','010-2222-2222','0010002','0020001','2023-05-10 01:11:28','0110001',0,'','2023-05-10 01:11:28','2023-05-10 01:11:28'),(6,'coach@ssafy.com','$2a$10$CYNtFi7GH/RFohNii2J7neI5SFghBdOEcUuA9fPrQHK22IOltDhfi','coach','코치','','ssafy 202','010-3333-3333','0010002','0020001','2023-05-10 01:11:28','0110001',0,'','2023-05-10 01:11:28','2023-05-10 01:11:28'),(7,'pakjeoungho@gmail.com','$2a$10$ldO2b/A/SoijfJqplJ9kIOTLckRmJ1jqrz9ON9XbUTv/QZWs8KmlK','박정호','박정호','','창원시 의창구 중동로 34','010-8245-8433','0010001','0020001','2023-05-18 01:21:25','0110001',0,'','2023-05-12 08:37:10','2023-05-18 01:21:25'),(8,'bome7531@naver.com','$2a$10$kEHYiuGvLRSrGH4m5KvMKu7/0A289cMXOqx6tN/v1c.FAo6RZjbpW','이미현','이미현','https://nyang-s3.s3.ap-northeast-2.amazonaws.com/nyang/c028f5d2-a8b8-4f44-bd83-b9d91e00066b.null','부산광역시 사하구 하신번영로','010-7518-7531','0010001','0020001','2023-05-18 08:23:12','0110001',0,'','2023-05-15 00:24:44','2023-05-18 08:23:12'),(9,'jysong587@gmail.com','$2a$10$S05r/v3x3U64T3xBblWqbuRB61kr/W1mkVwmzIF3mXD8219ls1hMu','송주영','송주영','','부산시 강서구 명지','010-7743-7780','0010001','0020001','2023-05-18 08:29:04','0110001',0,'','2023-05-15 00:26:55','2023-05-18 08:29:04'),(10,'indl1670@gmail.com','$2a$10$X5lr87KkXJErm6yxwK8b..lh63yw5oR0MA7.IkkOcXkUQndOLF/oe','김정윤','indl1670','','부산광역시 사하구 동매로','010-5448-2069','0010001','0020001','2023-05-18 01:56:47','0110001',0,'','2023-05-17 07:57:06','2023-05-18 01:56:47'),(11,'donghoon@naver.com','$2a$10$tRrfC6EvlUapewGhZGP7CesEB9XpYCWQQlmaSvKs/6Uqll0aLDCAi','강동훈','donghoon','','부산광역시 강서구 녹산산단로','010-9157-6988','0010001','0020001','2023-05-18 02:05:12','0110001',0,'','2023-05-17 07:58:43','2023-05-18 02:05:12'),(12,'choonghyeon@gmail.com','$2a$10$BnSsSmKaaeDja1TvL.vKKOY6bPi//ONcJverVXgus/NaxIl4QKaB2','배충현','choonghyeon','','부산광역시 강서구 녹산산단로','010-3874-6521','0010001','0020001','2023-05-17 07:59:24','0110002',0,'불성실','2023-05-17 07:59:24','2023-05-17 07:59:50');
/*!40000 ALTER TABLE `client_table` ENABLE KEYS */;
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
