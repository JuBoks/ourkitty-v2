package com.nyang.ourkitty.exception

import org.springframework.http.HttpStatus
import org.springframework.http.HttpStatus.*

enum class ErrorCode(
    val status: HttpStatus,
    val message: String
) {
    /* 409 CONFLICT : Resource 의 현재 상태와 충돌. 보통 중복된 데이터 존재 */
    DUPLICATE_RESOURCE(CONFLICT, "데이터가 이미 존재합니다."),

    BAD_REQUEST_EXCEPTION(BAD_REQUEST, "잘못된 요청입니다."),

    /* 403 FORBIDDEN : 접근 권한 없음 */
    NO_ACCESS(FORBIDDEN, "페이지에 대한 접근 권한이 없습니다."),

    /* 404 NOT_FOUND : 대상이 존재하지 않음 */
    NOT_FOUND_DISH(NOT_FOUND, "조회한 냥그릇이 존재하지 않습니다.")
    ;

//    val status: HttpStatus = status
//    val message: String = message

}