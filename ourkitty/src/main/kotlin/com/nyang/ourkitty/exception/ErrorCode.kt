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
    NEED_LOGIN_EXCEPTION(FORBIDDEN, "로그인이 필요한 기능입니다."),
    JWT_TOKEN_EXCEPTION(FORBIDDEN, "유효하지 않은 토큰입니다."),

    /* 404 NOT_FOUND : 대상이 존재하지 않음 */
    NOT_FOUND_DISH(NOT_FOUND, "존재하지 않는 냥그릇 입니다."),
    NOT_FOUND_MANAGEMENT(NOT_FOUND, "존재하지 않는 관리일지 입니다."),
    NOT_FOUND_COMMENT(NOT_FOUND, "존재하지 않는 댓글 입니다."),
    NOT_FOUND_CLIENT(NOT_FOUND, "존재하지 않는 사용자 입니다."),
    NOT_FOUND_REPORT(NOT_FOUND, "존재하지 않는 신고 입니다."),


    ;

}