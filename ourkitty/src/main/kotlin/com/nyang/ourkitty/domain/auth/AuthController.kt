package com.nyang.ourkitty.domain.auth

import com.nyang.ourkitty.domain.auth.dto.JwtContextHolder
import com.nyang.ourkitty.domain.auth.dto.LoginRequestDto
import com.nyang.ourkitty.domain.auth.dto.LoginResultDto
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@Api(tags = ["인증 관련 API"])
@RestController
@RequestMapping("/auth")
class AuthController(
    private val authService: AuthService
) {

    /**
     * TODO : 로그인
     * @param loginRequestDto LoginRequestDto
     * @return ClientResponseDto
     */
    @ApiOperation(value = "로그인")
    @PostMapping("/signin")
    fun signIn(loginRequestDto: LoginRequestDto): ResponseEntity<LoginResultDto<Any>> {
        return ResponseEntity.ok(authService.signin(loginRequestDto))
    }

    /**
     * TODO : 로그아웃
     */
    @ApiOperation(value = "로그아웃")
    @GetMapping("/signout")
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

    @GetMapping("/test")
    fun test123() {
        val clientId = JwtContextHolder.clientId
        val locationCode = JwtContextHolder.locationCode
        val userCode = JwtContextHolder.userCode

        println("clientId $clientId")
        println("locationCode $locationCode")
        println("userCode $userCode")
    }

}