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
-- Table structure for table `management_table`
--

DROP TABLE IF EXISTS `management_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `management_table` (
  `management_id` bigint NOT NULL AUTO_INCREMENT,
  `dish_id` bigint NOT NULL,
  `client_id` bigint NOT NULL,
  `management_content` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `dish_state` char(10) COLLATE utf8mb4_bin NOT NULL,
  `location_code` char(10) COLLATE utf8mb4_bin NOT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  `created_date` timestamp NOT NULL,
  `updated_date` timestamp NOT NULL,
  PRIMARY KEY (`management_id`),
  KEY `dish_id` (`dish_id`),
  KEY `client_id` (`client_id`),
  CONSTRAINT `management_table_ibfk_1` FOREIGN KEY (`dish_id`) REFERENCES `dish_table` (`dish_id`),
  CONSTRAINT `management_table_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `client_table` (`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `management_table`
--

LOCK TABLES `management_table` WRITE;
/*!40000 ALTER TABLE `management_table` DISABLE KEYS */;
INSERT INTO `management_table` VALUES (1,1,8,'tt','0030002','0020001',1,'2023-05-15 02:14:54','2023-05-16 02:31:19'),(2,1,8,'tt','0030002','0020001',1,'2023-05-15 02:14:59','2023-05-16 02:31:31'),(3,1,7,'aa','0030001','0020001',1,'2023-05-15 06:55:54','2023-05-17 00:28:49'),(4,1,7,'aaaaaaa','0030001','0020001',1,'2023-05-15 06:56:31','2023-05-17 00:28:51'),(5,3,8,'12313','0030002','0020001',1,'2023-05-16 01:13:16','2023-05-16 01:13:43'),(6,3,8,'12313','0030002','0020001',1,'2023-05-16 01:13:19','2023-05-16 02:32:52'),(7,1,8,'--','0030002','0020001',1,'2023-05-16 02:34:25','2023-05-17 00:28:54'),(8,1,8,'----','0030002','0020001',1,'2023-05-16 02:35:22','2023-05-17 00:28:57'),(9,3,8,'sd','0030003','0020001',1,'2023-05-16 02:54:41','2023-05-17 00:29:00'),(10,2,8,'7777','0030002','0020001',1,'2023-05-16 03:10:34','2023-05-16 03:10:39'),(11,2,8,'rrr','0030002','0020001',1,'2023-05-16 12:38:23','2023-05-16 12:38:36'),(12,2,8,'제가 츄르 줬어요','0030001','0020001',1,'2023-05-17 06:33:02','2023-05-17 06:33:14'),(13,3,9,'I love cats','0030001','0020001',1,'2023-05-17 08:19:00','2023-05-17 08:35:53'),(14,3,7,'오전에 사료통 30% 미만이길래 사료 채워주고 왔습니다.\n\n들렀다가 오는 길에 새로운 노랑친구를 발견했습니다.','0030001','0020001',1,'2023-05-17 08:49:09','2023-05-17 08:51:11'),(15,2,7,'요즘 사진이 안올라오길래 퇴근하고 집에 가는 길에 잠시 들렀는데 그릇에 개미가 들끓었습니다.\n\n그래서 한번 깨끗히 씻어주고 새로운 사료도 채워주고 왔습니다.','0030001','0020001',1,'2023-05-17 08:50:56','2023-05-17 15:15:27'),(16,2,8,'사료통 한번 씻은 후 채워넣었습니다! 요즘 장군이 상태가 좋네요~','0030001','0020001',0,'2023-05-18 01:03:34','2023-05-18 01:03:34'),(17,1,8,'어제 비가 많이 와서 혹시나해서 가봤는데 집에 물이 새고 있었습니다.. 한번 전체적으로 닦은 후 지붕 있는곳으로 위치 조금 옮겨놨습니다?','0030003','0020001',0,'2023-05-18 01:18:13','2023-05-18 01:18:13'),(18,3,7,'정호네 냥그릇에 새로운 고양이 발견했습니다!! 상태는 피부염 조금 있는것 같고 아직 중성화는 안된 것 같네요','0030001','0020001',0,'2023-05-18 01:21:25','2023-05-18 01:21:25'),(19,1,10,'어제 사진에서 애들 상태가 별로라 오늘 병원 데려왔습니다??','0030001','0020001',0,'2023-05-18 01:55:24','2023-05-18 01:55:24'),(20,3,10,'정호네 위치 바뀌었아요? 왜 안보이죠','0030004','0020001',0,'2023-05-18 01:56:47','2023-05-18 01:56:47'),(21,3,11,'정호네 ㅇㅇ상가 옆 골목 지붕 밑에 있어요!! 비때문에 옮겼대요','0030001','0020001',0,'2023-05-18 02:00:59','2023-05-18 02:00:59'),(22,2,11,'과자때문에 계속 개미가 꼬여요ㅜㅜ','0030002','0020001',0,'2023-05-18 02:05:12','2023-05-18 02:05:12'),(23,2,9,'사료그릇 깨끗하게 씻어 놨습니다~','0030001','0020001',0,'2023-05-18 02:08:19','2023-05-18 02:08:19'),(24,1,9,'요즘 애들 상태 너무 좋네요!! 앞으로도 열심히 합시다!!','0030001','0020001',0,'2023-05-18 02:10:24','2023-05-18 02:10:24');
/*!40000 ALTER TABLE `management_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-18 15:59:52
