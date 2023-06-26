package com.nyang.ourkitty.domain.auth

import com.nyang.ourkitty.common.UserState
import com.nyang.ourkitty.domain.auth.dto.LoginErrorResponseDto
import com.nyang.ourkitty.domain.auth.dto.LoginRequestDto
import com.nyang.ourkitty.domain.auth.dto.LoginResultDto
import com.nyang.ourkitty.domain.client.repository.BlockQuerydslRepository
import com.nyang.ourkitty.domain.client.repository.ClientQuerydslRepository
import com.nyang.ourkitty.exception.CustomException
import com.nyang.ourkitty.exception.ErrorCode
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime

@Service
@Transactional(readOnly = true)
class AuthService(
    private val tokenProvider: JwtTokenProvider,
    private val passwordEncoder: PasswordEncoder,

    private val clientQuerydslRepository: ClientQuerydslRepository,

    private val blockQuerydslRepository: BlockQuerydslRepository
) {

    fun signIn(loginRequestDto: LoginRequestDto): LoginResultDto<Any> {
        val client = clientQuerydslRepository.getClientByEmail(loginRequestDto.clientEmail) ?: throw CustomException(ErrorCode.NOT_FOUND_CLIENT)

        if (client.userState == UserState.비활성화.code) {
            val block = blockQuerydslRepository.getBlockByClient(client)
            return LoginResultDto(
                code = "1",
                data = LoginErrorResponseDto(
                    clientDescription = client.clientDescription,
                    unBlockDate = block?.unBlockDate ?: LocalDateTime.now(),
                )
            )
        } else if (client.userState == UserState.탈퇴.code) {
            return LoginResultDto(
                code = "2",
                data = LoginErrorResponseDto(
                    clientDescription = client.clientDescription,
                )
            )
        }

        if (!passwordEncoder.matches(loginRequestDto.clientPassword, client.clientPassword)) {
            throw CustomException(ErrorCode.BAD_REQUEST_EXCEPTION)
        }


        return LoginResultDto(
            code = "0",
            data = tokenProvider.createToken(client),
        )
    }

    fun signInWithPhone(loginRequestDto: LoginRequestDto): LoginResultDto<Any> {
        val client = clientQuerydslRepository.getClientByPhone(loginRequestDto.clientEmail) ?: throw CustomException(ErrorCode.NOT_FOUND_CLIENT)

        if (client.userState == UserState.비활성화.code) {
            val block = blockQuerydslRepository.getBlockByClient(client)
            return LoginResultDto(
                code = "1",
                data = LoginErrorResponseDto(
                    clientDescription = client.clientDescription,
                    unBlockDate = block?.unBlockDate ?: LocalDateTime.now(),
                )
            )
        } else if (client.userState == UserState.탈퇴.code) {
            return LoginResultDto(
                code = "2",
                data = LoginErrorResponseDto(
                    clientDescription = client.clientDescription,
                )
            )
        }

        if (!passwordEncoder.matches(loginRequestDto.clientPassword, client.clientPassword)) {
            throw CustomException(ErrorCode.BAD_REQUEST_EXCEPTION)
        }

        return LoginResultDto(
            code = "0",
            data = tokenProvider.createToken(client),
        )
    }

}