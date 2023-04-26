package com.nyang.ourkitty.domain.management.controller

import com.nyang.ourkitty.common.dto.ResultDto
import com.nyang.ourkitty.domain.management.dto.ManagementCommentRequestDto
import com.nyang.ourkitty.domain.management.dto.ManagementRequestDto
import com.nyang.ourkitty.domain.management.dto.ManagementResponseDto
import com.nyang.ourkitty.domain.management.service.ManagementService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@Api(tags = ["관리일지 관련 API"])
@RestController
@RequestMapping("/management")
@CrossOrigin(origins = ["*"])
class ManagementController(
    private val managementService: ManagementService
) {
    /**
     * TODO : 관리일지 목록 조회
     * @return ResponseEntity<ResultDto<List<ManagementResponseDto>>>
     */
    @ApiOperation(value = "관리일지 목록 조회")
    @GetMapping
    fun getManagementList(): ResponseEntity<ResultDto<List<ManagementResponseDto>>> {
        return ResponseEntity.ok(ResultDto(listOf(ManagementResponseDto())))
    }

    /**
     * TODO : 관리일지 조회
     * @param managementId Long
     * @return ResponseEntity<ResultDto<ManagementResponseDto>>
     */
    @ApiOperation(value = "관리일지 조회")
    @GetMapping("/{managementId}")
    fun getManagement(@PathVariable("managementId") managementId: Long): ResponseEntity<ResultDto<ManagementResponseDto>> {
        return ResponseEntity.ok(ResultDto(ManagementResponseDto()))
    }

    /**
     * TODO : 관리일지 작성
     * @param managementRequestDto ManagementRequestDto
     * @return ResponseEntity<ResultDto<ManagementResponseDto>>
     */
    @ApiOperation(value = "관리일지 작성")
    @PostMapping
    fun createManagement(@RequestBody managementRequestDto: ManagementRequestDto): ResponseEntity<ResultDto<ManagementResponseDto>> {
        return ResponseEntity.ok(ResultDto(ManagementResponseDto()))
    }

    /**
     * TODO : 관리일지 수정
     * @param managementId Long
     * @param managementRequestDto ManagementRequestDto
     * @return ResponseEntity<ResultDto<ManagementResponseDto>>
     */
    @ApiOperation(value = "관리일지 수정")
    @PutMapping("/{managementId}")
    fun modifyManagement(@PathVariable("managementId") managementId: Long, @RequestBody managementRequestDto: ManagementRequestDto): ResponseEntity<ResultDto<ManagementResponseDto>> {
        return ResponseEntity.ok(ResultDto(ManagementResponseDto()))
    }

    /**
     * TODO : 관리일지 삭제
     * @param managementId Long
     * @return ResponseEntity<ResultDto<Boolean>>
     */
    @ApiOperation(value = "관리일지 삭제")
    @DeleteMapping("/{managementId}")
    fun deleteManagement(@PathVariable("managementId") managementId: Long): ResponseEntity<ResultDto<Boolean>> {
        return ResponseEntity.ok(ResultDto(true))
    }

    /**
     * TODO : 관리일지에 댓글 등록
     * @param managementId Long
     * @param managementCommentRequestDto ManagementCommentRequestDto
     * @return ResponseEntity<ResultDto<ManagementResponseDto>>
     */
    @ApiOperation(value = "관리일지 댓글 작성")
    @PostMapping("/{managementId}/comment")
    fun createManagementComment(
        @PathVariable("managementId") managementId: Long,
        @RequestBody managementCommentRequestDto: ManagementCommentRequestDto
    ): ResponseEntity<ResultDto<ManagementResponseDto>> {
        return ResponseEntity.ok(ResultDto(ManagementResponseDto()))
    }

    /**
     * TODO : 관리일지의 댓글 삭제
     * @param managementId Long
     * @param managementCommentId Long
     * @return ResponseEntity<ResultDto<Boolean>>
     */
    @ApiOperation(value = "관리일지 댓글 삭제")
    @DeleteMapping("/{managementId}/comment/{managementCommentId}")
    fun deleteManagementComment(@PathVariable("managementId") managementId: Long, @PathVariable("managementCommentId") managementCommentId: Long): ResponseEntity<ResultDto<Boolean>> {
        return ResponseEntity.ok(ResultDto(true))
    }

    //TODO : 관리일지의 댓글 목록 조회


}