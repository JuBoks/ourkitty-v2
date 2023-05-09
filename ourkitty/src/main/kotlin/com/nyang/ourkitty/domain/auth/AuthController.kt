package com.nyang.ourkitty.domain.auth

import com.nyang.ourkitty.domain.auth.dto.LoginRequestDto
import com.nyang.ourkitty.domain.auth.dto.LoginResultDto
import com.nyang.ourkitty.domain.dish.DishService
import com.nyang.ourkitty.exception.CustomException
import com.nyang.ourkitty.exception.ErrorCode
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpServletRequest

@Api(tags = ["인증 관련 API"])
@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = ["*"])
class AuthController(
    private val authService: AuthService,
    private val dishService: DishService,

    ) {

    /**
     * @param loginRequestDto LoginRequestDto
     * @return ClientResponseDto
     */
    @ApiOperation(value = "로그인")
    @PostMapping("/login")
    fun signIn(loginRequestDto: LoginRequestDto): ResponseEntity<LoginResultDto<Any>> {
        return ResponseEntity.ok(authService.signIn(loginRequestDto))
    }

    /**
     * TODO : 로그아웃
     */
    @ApiOperation(value = "로그아웃")
    @GetMapping("/logout")
    fun signOut() {
    }

    /**
     * TODO : 아이디 찾기
     * @return String
     */
    @ApiOperation(value = "아이디 찾기")
    @PostMapping("/find/email")
    fun findEmailBy(): String {
        return "baebug"
    }

    /**
     * TODO : 패스워드 찾기
     */
    @ApiOperation(value = "패스워드 찾기")
    @PostMapping("/find/password")
    fun findPasswordBy() {

    }

    /**
     * TODO : 비밀번호 재설정
     */
    @ApiOperation(value = "패스워드 재설정")
    @PutMapping("/find/password")
    fun resetPassword() {

    }

    @RequestMapping("/error", method = [RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE])
    fun authError(request: HttpServletRequest) {
        when (request.getAttribute("exception").toString()) {
            "AuthenticationException" -> throw CustomException(ErrorCode.NEED_LOGIN_EXCEPTION)
            "JWTException" -> throw CustomException(ErrorCode.JWT_TOKEN_EXCEPTION)
        }
    }

    @GetMapping("/test")
    fun test() {
    }

}