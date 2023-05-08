package com.nyang.ourkitty.common

enum class Authority {
    ROLE_USER, ROLE_ADMIN
    ;
}

enum class UserCode(
    val code: String,
) {
    캣맘("0010001"),
    지자체("0010002"),
    ;

}

enum class LocationCode(
    val code: String,
) {
    해운대구("0020001"),
    창원시("0020002"),
    사하구("0020003"),
    강서구("0020004"),
    ;

}

enum class DishState(
    val code: String,
) {
    정상("0030001"),
    더러움("0030002"),
    파손("0030003"),
    ;

}

enum class ReportCategory(
    val code: String,
) {
    장비파손("0040001"),
    테러위험("0040002"),
    ;

}

enum class ReportState(
    val code: String,
) {
    답변중("0050001"),
    답변완료("0050002"),
    ;

}

enum class AlertState(
    val code: String,
) {
    ;

}

enum class ReportSearchKey(
    val code: String,
) {
    제목("0070001"),
    내용("0070002"),
    ;

}

enum class ClientSearchKey(
    val code: String,
) {
    이름("0090001"),
    닉네임("0090002"),
    이메일("0090003"),
    전화번호("0090004"),
    주소("0090005"),
    ;

}

enum class BatteryState(
    val code: String,
) {
    ZERO("0100001"),
    PERCENT_10("0100002"),
    PERCENT_20("0100003"),
    PERCENT_30("0100004"),
    PERCENT_40("0100005"),
    PERCENT_50("0100006"),
    PERCENT_60("0100007"),
    PERCENT_70("0100008"),
    PERCENT_80("0100009"),
    PERCENT_90("0100010"),
    PERCENT_100("0100011"),

    ;

}

enum class UserState(
    val code: String,
) {
    정상("0110001"),
    비활성화("0110002"),
    탈퇴("0110003"),
    ;

}