package com.nyang.ourkitty.common

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

enum class SearchKey(
    val code: String,
) {
    제목("0070001"),
    내용("0070002"),
    ;

}