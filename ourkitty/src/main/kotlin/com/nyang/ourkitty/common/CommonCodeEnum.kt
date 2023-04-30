package com.nyang.ourkitty.common

enum class UserCode(
    val code: String,
) {
    캣맘("0010001"),
    지자체("0010002"),
    ;

    override fun toString(): String {
        return code
    }
}

enum class LocationCode(
    val code: String,
) {
    해운대구("0020001"),
    창원시("0020002"),
    사하구("0020003"),
    강서구("0020004"),
    ;

    override fun toString(): String {
        return code
    }
}

enum class DishState(
    val code: String,
) {
    정상("0030001"),
    더러움("0030002"),
    파손("0030003"),
    ;

    override fun toString(): String {
        return code
    }
}

enum class ReportCategory(
    val code: String,
) {
    장비파손("0040001"),
    테러위험("0040002"),
    ;

    override fun toString(): String {
        return code
    }
}

enum class ReportState(
    val code: String,
) {
    답변중("0050001"),
    답변완료("0050002"),
    ;

    override fun toString(): String {
        return code
    }
}

enum class AlertState(
    val code: String,
) {
    ;

    override fun toString(): String {
        return code
    }
}

enum class SearchKey(
    val code: String,
) {
    제목("0070001"),
    내용("0070002"),
    ;

    override fun toString(): String {
        return code
    }
}