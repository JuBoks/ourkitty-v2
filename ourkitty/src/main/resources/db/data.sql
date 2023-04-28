INSERT INTO `client_table`
VALUES (1, 'test1@ssafy.com', 'pwd', 'name1', 'nickname1', './default.png', 'address1', '0123', '0001', '0001', now(),
        false,
        now(), now()),
       (2, 'test2@ssafy.com', 'pwd', 'name2', 'nickname2', './default.png', 'address2', '0123', '0002', '0001', now(),
        false,
        now(), now()),
       (3, 'test3@ssafy.com', 'pwd', 'name3', 'nickname3', './default.png', 'address3', '0123', '0001', '0002', now(),
        false,
        now(), now());


INSERT INTO `dish_table`
VALUES (1, 'dish1', './default.png', 10.123, 20.321, 'address4', '0020001', 'serial-1234-0001', 33.33, 5, 3, false,
        now(),
        now()),
       (2, 'dish2', './default.png', 20.123, 21.321, 'address5', '0020001', 'serial-1234-0002', 22.22, 3, 1, false,
        now(),
        now()),
       (3, 'dish3', './default.png', 20.123, 22.321, 'address6', '0020001', 'serial-5678-0003', 11.11, 7, 2, false,
        now(),
        now());

INSERT INTO `dish_client_table`
VALUES (1, 1, 2, false, now(), now()),
       (2, 1, 3, false, now(), now()),
       (3, 2, 1, false, now(), now()),
       (4, 3, 1, false, now(), now());

INSERT INTO `dish_image_table`
VALUES (1, 1, './default.png', false, now(), now()),
       (2, 1, './default.png', false, now(), now()),
       (3, 2, './default.png', false, now(), now()),
       (4, 3, './default.png', false, now(), now());

INSERT INTO `management_table`
VALUES (1, 1, 1, '고양이 커여웡', '0040001', '0020001', false, now(), now()),
       (2, 2, 1, '고양이 커여웡', '0040002', '0020001', false, now(), now()),
       (3, 3, 1, '고양이 커여웡', '0040001', '0020001', false, now(), now()),
       (4, 1, 1, '고양이 커여웡', '0040001', '0020001', false, now(), now()),
       (5, 2, 1, '고양이 커여웡', '0040001', '0020001', false, now(), now()),
       (6, 3, 1, '고양이 커여웡', '0040001', '0020001', false, now(), now()),
       (7, 1, 1, '고양이 커여웡', '0040001', '0020001', false, now(), now()),
       (8, 2, 1, '고양이 커여웡', '0040001', '0020001', false, now(), now()),
       (9, 3, 1, '고양이 커여웡', '0040001', '0020001', false, now(), now());

INSERT INTO `management_comment_table`
VALUES (1, 1, 1, '고양이 짱커여웡', false, now(), now());

-- INSERT INTO `management_image_table`
-- VALUES (1, 1, './default.png', false, now(), now()),
--        (2, 2, './default.png', false, now(), now()),
--        (3, 2, './default.png', false, now(), now()),
--        (4, 3, './default.png', false, now(), now());

INSERT INTO `report_table`
VALUES (1, 1, '신고1', '0001', '고양이 아파', '0001', false, now(), now()),
       (2, 2, '신고2', '0001', '고양이 아파', '0002', false, now(), now()),
       (3, 2, '신고3', '0002', '밥통 사라졌음', '0001', false, now(), now());

-- INSERT INTO `report_comment_table`
-- VALUES (1, 2, 2, '병원 데려갈게요', false, now(), now());

INSERT INTO `report_image_table`
VALUES (1, 1, './default.png', false, now(), now()),
       (2, 2, './default.png', false, now(), now()),
       (3, 2, './default.png', false, now(), now());

INSERT INTO `alert_table`
VALUES (1, '0001', '관리일지알림', 2, null, null, '0001', false, now(), now()),
       (2, '0002', '냥그릇알림', null, 1, null, '0001', false, now(), now()),
       (3, '0002', '냥그릇알림', null, 2, null, '0002', false, now(), now()),
       (4, '0003', '리포트알림', null, null, 2, '0002', false, now(), now());