INSERT INTO `client_table`
VALUES (1, 'client', '$2a$10$kNnSCr0rS0SxvR7w09F2FetmPh6doUi7GyrZAXsQ3BOSFEbY5YLha', 'name1', '테스트유저', '', 'address1',
        '01000000001', '0010001', '0020001',
        now(),
        '0110001', false, '',
        now(), now()),
       (2, 'admin', '$2a$10$kNnSCr0rS0SxvR7w09F2FetmPh6doUi7GyrZAXsQ3BOSFEbY5YLha', 'name2', '테스트관리자', '', 'address2',
        '01000000002', '0010002', '0020001',
        now(),
        '0110001', false, '',
        now(), now()),
       (3, 'test3@ssafy.com', '$2a$10$kNnSCr0rS0SxvR7w09F2FetmPh6doUi7GyrZAXsQ3BOSFEbY5YLha', 'name3', 'nickname3', '',
        'address3', '01000000003', '0010001', '0020001',
        now(),
        '0110001', false, '',
        now(), now()),
       (4, 'test4@ssafy.com', '$2a$10$kNnSCr0rS0SxvR7w09F2FetmPh6doUi7GyrZAXsQ3BOSFEbY5YLha', 'name4', 'nickname3', '',
        'address3', '01000000004', '0010001', '0020001',
        now(),
        '0110003', false, '이사',
        now(), now());

INSERT INTO `dish_table`
VALUES (1, '미현이네', 'https://nyang-s3.s3.ap-northeast-2.amazonaws.com/animals.png', 35.158593, 129.155774, 'address4',
        '0020001', 'LpnNFcE3YrQS490', 100.0, '0100001', 5, 3,
        false,
        now(),
        now()),
       (2, '아이유정', 'https://nyang-s3.s3.ap-northeast-2.amazonaws.com/animals.png', 35.155395, 129.152768, 'address5',
        '0020001', '2kXBPprXEcOdzPB', 50.0, '0100001', 3, 1,
        false,
        now(),
        now()),
       (3, '정호네', 'https://nyang-s3.s3.ap-northeast-2.amazonaws.com/animals.png', 35.152933, 129.150499, 'address6',
        '0020001', 'EZZwEhRzzs9LvyZ', 10.0, '0100001', 7, 2,
        false,
        now(),
        now());

INSERT INTO `client_dish_table`
VALUES (1, 2, 1, false, now(), now()),
       (2, 3, 1, false, now(), now()),
       (3, 1, 2, false, now(), now()),
       (4, 1, 3, false, now(), now());

INSERT INTO `dish_image_table`
VALUES (1, 1, 'https://nyang-s3.s3.ap-northeast-2.amazonaws.com/animals.png', false, now(), now()),
       (2, 1, 'https://nyang-s3.s3.ap-northeast-2.amazonaws.com/animals.png', false, now(), now()),
       (3, 2, 'https://nyang-s3.s3.ap-northeast-2.amazonaws.com/animals.png', false, now(), now()),
       (4, 3, 'https://nyang-s3.s3.ap-northeast-2.amazonaws.com/animals.png', false, now(), now());

INSERT INTO `dish_count_log_table`
VALUES (1, 1, '2023-05-08', 5, 4, false, now(), now()),
       (2, 1, '2023-05-01', 5, 3, false, now(), now()),
       (3, 1, '2023-05-05', 5, 3, false, now(), now()),
       (4, 1, '2023-05-03', 6, 1, false, now(), now()),
       (5, 1, '2023-05-02', 5, 3, false, now(), now()),
       (6, 1, '2023-05-04', 5, 3, false, now(), now()),
       (7, 1, '2023-05-07', 6, 4, false, now(), now()),
       (8, 1, '2023-05-06', 5, 3, false, now(), now()),
       (9, 1, '2023-04-30', 6, 2, false, now(), now());

INSERT INTO `management_table`
VALUES (1, 1, 1, '고양이 커여웡', '0030001', '0020001', false, now(), now()),
       (2, 2, 1, '고양이 커여웡', '0030002', '0020001', false, now(), now()),
       (3, 3, 1, '고양이 커여웡', '0030001', '0020001', false, now(), now()),
       (4, 1, 1, '고양이 커여웡', '0030001', '0020001', false, now(), now()),
       (5, 2, 1, '고양이 커여웡', '0030001', '0020001', false, now(), now()),
       (6, 3, 1, '고양이 커여웡', '0030001', '0020001', false, now(), now()),
       (7, 1, 1, '고양이 커여웡', '0030001', '0020001', false, now(), now()),
       (8, 2, 1, '고양이 커여웡', '0030001', '0020001', false, now(), now()),
       (9, 3, 1, '고양이 커여웡', '0030001', '0020001', false, now(), now());

INSERT INTO `management_comment_table`
VALUES (1, 1, 1, '고양이 짱커여웡', false, now(), now());

-- INSERT INTO `management_image_table`
-- VALUES (1, 1, './default.png', false, now(), now()),
--        (2, 2, './default.png', false, now(), now()),
--        (3, 2, './default.png', false, now(), now()),
--        (4, 3, './default.png', false, now(), now());

INSERT INTO `report_table`
VALUES (1, 1, 1, '신고1', '0040001', '고양이 아파', '처방전1', '0020001', '0050001', false, now(), now()),
       (2, 1, 2, '신고2', '0040001', '고양이 아파', '처방전2', '0020001', '0050002', false, now(), now()),
       (3, 1, 3, '신고3', '0040002', '밥통 사라졌음', '', '0020001', '0050001', false, now(), now());

-- INSERT INTO `report_comment_table`
-- VALUES (1, 2, 2, '병원 데려갈게요', false, now(), now());

INSERT INTO `report_image_table`
VALUES (1, 1, 'https://nyang-s3.s3.ap-northeast-2.amazonaws.com/animals.png', false, now(), now()),
       (2, 2, 'https://nyang-s3.s3.ap-northeast-2.amazonaws.com/animals.png', false, now(), now()),
       (3, 2, 'https://nyang-s3.s3.ap-northeast-2.amazonaws.com/animals.png', false, now(), now());

INSERT INTO `alert_table`
VALUES (1, '0080001', '관리일지알림', 2, null, null, '0060001', false, now(), now()),
       (2, '0080002', '냥그릇알림', null, 1, null, '0060001', false, now(), now()),
       (3, '0080002', '냥그릇알림', null, 2, null, '0060002', false, now(), now()),
       (4, '0080003', '리포트알림', null, null, 2, '0060002', false, now(), now());