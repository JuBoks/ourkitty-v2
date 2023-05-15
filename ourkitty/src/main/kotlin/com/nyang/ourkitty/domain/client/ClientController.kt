package com.nyang.ourkitty.domain.client

import com.nyang.ourkitty.common.UserCode
import com.nyang.ourkitty.common.dto.ResultDto
import com.nyang.ourkitty.domain.auth.dto.JwtContextHolder
import com.nyang.ourkitty.domain.client.dto.ClientListResultDto
import com.nyang.ourkitty.domain.client.dto.ClientRequestDto
import com.nyang.ourkitty.domain.client.dto.ClientResponseDto
import com.nyang.ourkitty.exception.CustomException
import com.nyang.ourkitty.exception.ErrorCode
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.LocalDateTime

@Api(tags = ["사용자 관련 API"])
@RestController
@RequestMapping("/client")
@CrossOrigin(origins = ["*"])
class ClientController(
    private val clientService: ClientService,
) {

    /**
     * @param clientRequestDto ClientRequestDto
     * @return ResponseEntity<ResultDto<ClientResponseDto>>
     */
    @ApiOperation(value = "사용자 아이디 생성")
    @PostMapping
    fun createAccount(clientRequestDto: ClientRequestDto): ResponseEntity<ResultDto<ClientResponseDto>> {

        if (JwtContextHolder.userCode != UserCode.지자체.code) throw CustomException(ErrorCode.NO_ACCESS)

        val client = clientService.createAccount(
            locationCode = JwtContextHolder.locationCode!!,
            clientRequestDto = clientRequestDto,
        )

        return ResponseEntity.ok(client)
    }

    @ApiOperation(value = "E-mail 중복 확인")
    @PostMapping("/check/email")
    fun checkEmailDuplication(clientEmail: String): ResponseEntity<ResultDto<Boolean>> {

        if (JwtContextHolder.userCode != UserCode.지자체.code) throw CustomException(ErrorCode.NO_ACCESS)

        return ResponseEntity.ok(clientService.checkEmailDuplication(clientEmail))
    }

    @ApiOperation(value = "휴대전화 번호 중복 확인")
    @PostMapping("/check/phone")
    fun checkPhoneDuplication(clientPhone: String): ResponseEntity<ResultDto<Boolean>> {

        if (JwtContextHolder.userCode != UserCode.지자체.code) throw CustomException(ErrorCode.NO_ACCESS)

        return ResponseEntity.ok(clientService.checkPhoneDuplication(clientPhone))
    }


    /**
     * @return ResponseEntity<ResultDto<List<ClientResponseDto>>>
     */
    @ApiOperation(value = "사용자 아이디 목록 조회")
    @GetMapping
    fun getAccountList(
        @RequestParam("dishId", required = false) dishId: Long?,
        @RequestParam("searchKey", required = false) searchKey: String?,
        @RequestParam("searchWord", required = false, defaultValue = "") searchWord: String,
    ): ResponseEntity<ClientListResultDto> {

        if (JwtContextHolder.userCode != UserCode.지자체.code) throw CustomException(ErrorCode.NO_ACCESS)

        return ResponseEntity.ok(
            clientService.getAccountList(
                locationCode = JwtContextHolder.locationCode!!,
                dishId = dishId,
                searchKey = searchKey,
                searchWord = searchWord,
            )
        )
    }

    @ApiOperation(value = "본인 아이디 정보 조회 (캣맘용)")
    @GetMapping("/mypage")
    fun getMyAccount(): ResponseEntity<ResultDto<ClientResponseDto>> {

        return ResponseEntity.ok(clientService.getAccountById(JwtContextHolder.clientId!!.toLong()))
    }

    /**
     * @param clientRequestDto ClientRequestDto
     * @return ResponseEntity<ResultDto<ClientResponseDto>>
     */
    @ApiOperation(value = "본인 아이디 정보 수정 (캣맘용)")
    @PutMapping("/mypage")
    fun modifyMyAccount(clientRequestDto: ClientRequestDto, @RequestParam(required = false) file: String?): ResponseEntity<ResultDto<ClientResponseDto>> {

        val client = clientService.modifyMyAccount(
            clientId = JwtContextHolder.clientId!!.toLong(),
            clientRequestDto = clientRequestDto,
            file = file
        )

        return ResponseEntity.ok(client)
    }

    @ApiOperation(value = "본인 닉네임 수정 (캣맘용)")
    @PostMapping("/nickname")
    fun modifyMyNickname(nickname: String): ResponseEntity<ResultDto<ClientResponseDto>> {

        val client = clientService.modifyMyNickname(
            clientId = JwtContextHolder.clientId!!.toLong(),
            nickname = nickname,
        )

        return ResponseEntity.ok(client)
    }


    /**
     * @param clientId Long
     * @return ResponseEntity<ResultDto<ClientResponseDto>>
     */
    @ApiOperation(value = "소속 사용자 아이디 조회 (관리자용)")
    @GetMapping("/{clientId}")
    fun getAccount(@PathVariable("clientId") clientId: Long): ResponseEntity<ResultDto<ClientResponseDto>> {

        if (JwtContextHolder.clientId!!.toLong() != clientId && JwtContextHolder.userCode != UserCode.지자체.code) {
            throw CustomException(ErrorCode.NO_ACCESS)
        }

        return ResponseEntity.ok(clientService.getAccountById(clientId))
    }

    /**
     * @param clientId Long
     * @param clientRequestDto ClientRequestDto
     * @return ResponseEntity<ResultDto<ClientResponseDto>>
     */
    @ApiOperation(value = "소속 사용자 아이디 정보 수정 (관리자용)")
    @PutMapping("/{clientId}")
    fun modifyAccount(@PathVariable("clientId") clientId: Long, clientRequestDto: ClientRequestDto): ResponseEntity<ResultDto<ClientResponseDto>> {

        if (JwtContextHolder.userCode != UserCode.지자체.code) throw CustomException(ErrorCode.NO_ACCESS)

        val clientResponseDto = clientService.modifyAccount(
            clientId = clientId,
            clientRequestDto = clientRequestDto
        )

        return ResponseEntity.ok(clientResponseDto)
    }

    /**
     * @param clientId Long
     * @return ResponseEntity<ResultDto<Boolean>>
     */
    @ApiOperation(value = "사용자 아이디 탈퇴")
    @DeleteMapping("/{clientId}")
    fun deleteAccount(@PathVariable clientId: Long, @RequestParam(required = false, defaultValue = "") clientDescription: String): ResponseEntity<ResultDto<Boolean>> {

        if (JwtContextHolder.clientId!!.toLong() != clientId && JwtContextHolder.userCode != UserCode.지자체.code) throw CustomException(ErrorCode.NO_ACCESS)

        return ResponseEntity.ok(
            clientService.deleteAccount(clientId, clientDescription)
        )
    }

    /**
     * @param clientId Long
     * @return ResponseEntity<ResultDto<Boolean>>
     */
    @ApiOperation(value = "사용자 아이디 탈퇴 취소")
    @PutMapping("/{clientId}/cancel")
    fun cancelDeleteAccount(@PathVariable clientId: Long): ResponseEntity<ResultDto<Boolean>> {

        if (JwtContextHolder.userCode != UserCode.지자체.code) throw CustomException(ErrorCode.NO_ACCESS)

        return ResponseEntity.ok(
            clientService.cancelDeleteAccount(clientId)
        )
    }

    /**
     * @param clientId Long
     * @return ResponseEntity<ResultDto<Boolean>>
     */
    @ApiOperation(value = "사용자 아이디 비활성화")
    @DeleteMapping("/{clientId}/block")
    fun deactivateAccount(
        @PathVariable clientId: Long,
        @RequestParam(required = false, defaultValue = "") clientDescription: String,
        unBlockDate: LocalDateTime
    ): ResponseEntity<ResultDto<Boolean>> {

        if (JwtContextHolder.userCode != UserCode.지자체.code) throw CustomException(ErrorCode.NO_ACCESS)

        return ResponseEntity.ok(
            clientService.deactivateAccount(clientId, clientDescription, unBlockDate)
        )
    }

}