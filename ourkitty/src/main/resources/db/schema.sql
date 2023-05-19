DROP TABLE IF EXISTS `block_table`;
DROP TABLE IF EXISTS `alert_table`;
DROP TABLE IF EXISTS `report_image_table`;
DROP TABLE IF EXISTS `report_comment_table`;
DROP TABLE IF EXISTS `report_table`;
DROP TABLE IF EXISTS `management_image_table`;
DROP TABLE IF EXISTS `management_comment_table`;
DROP TABLE IF EXISTS `management_table`;
DROP TABLE IF EXISTS `dish_total_log_table`;
DROP TABLE IF EXISTS `dish_weight_log_table`;
DROP TABLE IF EXISTS `dish_count_log_table`;
DROP TABLE IF EXISTS `dish_image_table`;
DROP TABLE IF EXISTS `client_dish_table`;
DROP TABLE IF EXISTS `dish_client_table`;
DROP TABLE IF EXISTS `dish_table`;
DROP TABLE IF EXISTS `client_table`;
DROP TABLE IF EXISTS `refresh_token_table`;

create table `refresh_token_table`
(
    `rt_key`       VARCHAR(255) NOT NULL,
    `rt_value`     TEXT         NOT NULL,
    `is_deleted`   BOOLEAN      NOT NULL,
    `created_date` TIMESTAMP    NOT NULL,
    `updated_date` TIMESTAMP    NOT NULL,
    PRIMARY KEY (`rt_key`)
) engine = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_bin;

create table `client_table`
(
    `client_id`                 BIGINT       NOT NULL auto_increment,
    `client_email`              VARCHAR(50)  NOT NULL,
    `client_password`           VARCHAR(255) NOT NULL,
    `client_name`               VARCHAR(50)  NOT NULL,
    `client_nickname`           VARCHAR(50)  NOT NULL,
    `client_profile_image_path` VARCHAR(255) NOT NULL DEFAULT '',
    `client_address`            VARCHAR(255) NOT NULL,
    `client_phone`              VARCHAR(50)  NOT NULL,
    `user_code`                 CHAR(10)     NOT NULL,
    `location_code`             CHAR(10)     NOT NULL,
    `last_posting_date`         TIMESTAMP    NOT NULL,
    `user_state`                CHAR(10)     NOT NULL,
    `is_deleted`                BOOLEAN      NOT NULL,
    `client_description`        VARCHAR(255) NOT NULL DEFAULT '',
    `created_date`              TIMESTAMP    NOT NULL,
    `updated_date`              TIMESTAMP    NOT NULL,
    PRIMARY KEY (`client_id`)
) engine = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_bin;


CREATE TABLE `dish_table`
(
    `dish_id`                 BIGINT       NOT NULL auto_increment,
    `dish_name`               VARCHAR(50)  NOT NULL,
    `dish_profile_image_path` VARCHAR(255) NOT NULL,
    `dish_lat`                DOUBLE       NOT NULL,
    `dish_long`               DOUBLE       NOT NULL,
    `dish_address`            VARCHAR(255) NOT NULL,
    `location_code`           CHAR(10)     NOT NULL,
    `dish_serial_num`         VARCHAR(50)  NOT NULL,
    `dish_weight`             CHAR(10)     NOT NULL,
    `dish_battery_state`      CHAR(10)     NOT NULL,
    `dish_cat_count`          INTEGER      NOT NULL,
    `dish_tnr_count`          INTEGER      NOT NULL,
    `is_deleted`              BOOLEAN      NOT NULL,
    `created_date`            TIMESTAMP    NOT NULL,
    `updated_date`            TIMESTAMP    NOT NULL,
    PRIMARY KEY (`dish_id`)
) engine = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_bin;

create table `client_dish_table`
(
    `client_dish_id` BIGINT    NOT NULL auto_increment,
    `client_id`      BIGINT    NOT NULL,
    `dish_id`        BIGINT    NOT NULL,
    `is_deleted`     BOOLEAN   NOT NULL,
    `created_date`   TIMESTAMP NOT NULL,
    `updated_date`   TIMESTAMP NOT NULL,
    PRIMARY KEY (`client_dish_id`),
    FOREIGN KEY (`client_id`)
        REFERENCES `client_table` (`client_id`),
    FOREIGN KEY (`dish_id`)
        REFERENCES `dish_table` (`dish_id`)
) engine = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_bin;

create table `dish_image_table`
(
    `dish_image_id` BIGINT       NOT NULL auto_increment,
    `dish_id`       BIGINT       NOT NULL,
    `image_path`    VARCHAR(255) NOT NULL,
    `is_deleted`    BOOLEAN      NOT NULL,
    `created_date`  TIMESTAMP    NOT NULL,
    `updated_date`  TIMESTAMP    NOT NULL,
    PRIMARY KEY (`dish_image_id`),
    FOREIGN KEY (`dish_id`)
        REFERENCES `dish_table` (`dish_id`)
) engine = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_bin;

create table `dish_weight_log_table`
(
    `dish_weight_log_id` BIGINT    NOT NULL auto_increment,
    `dish_id`            BIGINT    NOT NULL,
    `dish_weight`        CHAR(10)  NOT NULL,
    `is_deleted`         BOOLEAN   NOT NULL,
    `created_date`       TIMESTAMP NOT NULL,
    `updated_date`       TIMESTAMP NOT NULL,
    PRIMARY KEY (`dish_weight_log_id`),
    FOREIGN KEY (`dish_id`)
        REFERENCES `dish_table` (`dish_id`)
) engine = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_bin;

create table `dish_count_log_table`
(
    `dish_count_log_id` BIGINT    NOT NULL auto_increment,
    `dish_id`           BIGINT    NOT NULL,
    `date`              DATE      NOT NULL,
    `dish_cat_count`    INT       NOT NULL,
    `dish_tnr_count`    INT       NOT NULL,
    `is_deleted`        BOOLEAN   NOT NULL,
    `created_date`      TIMESTAMP NOT NULL,
    `updated_date`      TIMESTAMP NOT NULL,
    PRIMARY KEY (`dish_count_log_id`),
    FOREIGN KEY (`dish_id`)
        REFERENCES `dish_table` (`dish_id`)
) engine = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_bin;

create table `dish_total_log_table`
(
    `dish_total_log_id` BIGINT    NOT NULL auto_increment,
    `dish_id`           BIGINT    NOT NULL,
    `date`              DATE      NOT NULL,
    `battery_amount`    INT       NOT NULL,
    `food_amount`       INT       NOT NULL,
    `cat_count`         INT       NOT NULL,
    `tnr_count`         INT       NOT NULL,
    `is_deleted`        BOOLEAN   NOT NULL,
    `created_date`      TIMESTAMP NOT NULL,
    `updated_date`      TIMESTAMP NOT NULL,
    PRIMARY KEY (`dish_total_log_id`),
    FOREIGN KEY (`dish_id`)
        REFERENCES `dish_table` (`dish_id`)
) engine = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_bin;

create table `management_table`
(
    `management_id`      BIGINT       NOT NULL auto_increment,
    `dish_id`            BIGINT       NOT NULL,
    `client_id`          BIGINT       NOT NULL,
    `management_content` VARCHAR(255) NOT NULL,
    `dish_state`         CHAR(10)     NOT NULL,
    `location_code`      CHAR(10)     NOT NULL,
    `is_deleted`         BOOLEAN      NOT NULL,
    `created_date`       TIMESTAMP    NOT NULL,
    `updated_date`       TIMESTAMP    NOT NULL,
    PRIMARY KEY (`management_id`),
    FOREIGN KEY (`dish_id`)
        REFERENCES `dish_table` (`dish_id`),
    FOREIGN KEY (`client_id`)
        REFERENCES `client_table` (`client_id`)
) engine = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_bin;

create table `management_comment_table`
(
    `management_comment_id`      BIGINT       NOT NULL auto_increment,
    `management_id`              BIGINT       NOT NULL,
    `client_id`                  BIGINT       NOT NULL,
    `management_comment_content` VARCHAR(255) NOT NULL,
    `is_deleted`                 BOOLEAN      NOT NULL,
    `created_date`               TIMESTAMP    NOT NULL,
    `updated_date`               TIMESTAMP    NOT NULL,
    PRIMARY KEY (`management_comment_id`),
    FOREIGN KEY (`client_id`)
        REFERENCES `client_table` (`client_id`),
    FOREIGN KEY (`management_id`)
        REFERENCES `management_table` (`management_id`)
) engine = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_bin;

create table `management_image_table`
(
    `management_image_id` BIGINT       NOT NULL auto_increment,
    `management_id`       BIGINT       NOT NULL,
    `image_path`          VARCHAR(255) NOT NULL,
    `is_deleted`          BOOLEAN      NOT NULL,
    `created_date`        TIMESTAMP    NOT NULL,
    `updated_date`        TIMESTAMP    NOT NULL,
    PRIMARY KEY (`management_image_id`),
    FOREIGN KEY (`management_id`)
        REFERENCES `management_table` (`management_id`)
) engine = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_bin;

create table `report_table`
(
    `report_id`          BIGINT       NOT NULL auto_increment,
    `client_id`          BIGINT       NOT NULL,
    `dish_id`            BIGINT       NOT NULL,
    `report_title`       VARCHAR(50)  NOT NULL,
    `report_category`    CHAR(10)     NOT NULL,
    `report_content`     VARCHAR(255) NOT NULL,
    `report_description` VARCHAR(255) NOT NULL DEFAULT '',
    `location_code`      CHAR(10)     NOT NULL,
    `report_state`       CHAR(10)     NOT NULL,
    `is_deleted`         BOOLEAN      NOT NULL,
    `created_date`       TIMESTAMP    NOT NULL,
    `updated_date`       TIMESTAMP    NOT NULL,
    PRIMARY KEY (`report_id`),
    FOREIGN KEY (`client_id`)
        REFERENCES `client_table` (`client_id`)
) engine = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_bin;

-- create table `report_comment_table`
-- (
--     `report_comment_id`      BIGINT       NOT NULL auto_increment,
--     `report_id`              BIGINT       NOT NULL,
--     `client_id`              BIGINT       NOT NULL,
--     `report_comment_content` VARCHAR(255) NOT NULL,
--     `is_deleted`             BOOLEAN      NOT NULL,
--     `created_date`           TIMESTAMP     NOT NULL,
--     `updated_date`           TIMESTAMP     NOT NULL,
--     PRIMARY KEY (`report_comment_id`),
--     FOREIGN KEY (`report_id`)
--         REFERENCES `report_table` (`report_id`),
--     FOREIGN KEY (`client_id`)
--         REFERENCES `client_table` (`client_id`)
-- ) engine=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

create table `report_image_table`
(
    `report_image_id` BIGINT       NOT NULL auto_increment,
    `report_id`       BIGINT       NOT NULL,
    `image_path`      VARCHAR(255) NOT NULL,
    `is_deleted`      BOOLEAN      NOT NULL,
    `created_date`    TIMESTAMP    NOT NULL,
    `updated_date`    TIMESTAMP    NOT NULL,
    PRIMARY KEY (`report_image_id`),
    FOREIGN KEY (`report_id`)
        REFERENCES `report_table` (`report_id`)
) engine = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_bin;

create table `alert_table`
(
    `alert_id`      BIGINT       NOT NULL auto_increment,
    `alert_code`    CHAR(10)     NOT NULL,
    `alert_content` VARCHAR(255) NOT NULL,
    `management_id` BIGINT,
    `dish_id`       BIGINT,
    `report_id`     BIGINT,
    `alert_state`   CHAR(10)     NOT NULL,
    `is_deleted`    BOOLEAN      NOT NULL,
    `created_date`  TIMESTAMP    NOT NULL,
    `updated_date`  TIMESTAMP    NOT NULL,
    PRIMARY KEY (`alert_id`),
    FOREIGN KEY (`management_id`)
        REFERENCES `management_table` (`management_id`),
    FOREIGN KEY (`dish_id`)
        REFERENCES `dish_table` (`dish_id`),
    FOREIGN KEY (`report_id`)
        REFERENCES `report_table` (`report_id`)
) engine = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_bin;

create table `block_table`
(
    `block_id`      BIGINT    NOT NULL auto_increment,
    `client_id`     BIGINT    NOT NULL,
    `un_block_date` TIMESTAMP NOT NULL,
    `is_deleted`    BOOLEAN   NOT NULL,
    `created_date`  TIMESTAMP NOT NULL,
    `updated_date`  TIMESTAMP NOT NULL,
    PRIMARY KEY (`block_id`)
) engine = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_bin;