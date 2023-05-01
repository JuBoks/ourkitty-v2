package com.nyang.ourkitty.domain.management

import com.nyang.ourkitty.common.LocationCode
import com.nyang.ourkitty.common.UserCode
import com.nyang.ourkitty.common.dto.ResultDto
import com.nyang.ourkitty.domain.management.dto.ManagementCommentRequestDto
import com.nyang.ourkitty.domain.management.dto.ManagementRequestDto
import com.nyang.ourkitty.domain.management.dto.ManagementResponseDto
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@Api(tags = ["관리일지 관련 API"])
@RestController
@RequestMapping("/management")
@CrossOrigin(origins = ["*"])
class ManagementController(
    private val managementService: ManagementService,
) {

    private val testToken = mapOf(
        "clientId" to 1L,
        "userCode" to UserCode.지자체.code,
        "locationCode" to LocationCode.해운대구.code,
    )

    /**
     * TODO : JWT
     * @param limit Long
     * @param offset Long
     * @param id Long?      : 냥그릇 ID
     * @return ResponseEntity<ResultDto<List<ManagementResponseDto>>>
     */
    @ApiOperation(value = "관리일지 목록 조회")
    @GetMapping
    fun getManagementList(
        @RequestParam limit: Long, @RequestParam offset: Long, @RequestParam("id") dishId: Long?
    ): ResponseEntity<ResultDto<List<ManagementResponseDto>>> {
        val managementList = managementService.getManagementList(
            dishId = dishId,
            locationCode = testToken["locationCode"].toString(),
            limit = limit, offset = offset,
        )

        return ResponseEntity.ok(managementList)
    }

    /**
     * @param managementId Long
     * @return ResponseEntity<ResultDto<ManagementResponseDto>>
     */
    @ApiOperation(value = "관리일지 조회")
    @GetMapping("/{managementId}")
    fun getManagement(@PathVariable("managementId") managementId: Long): ResponseEntity<ResultDto<ManagementResponseDto>> {
        return ResponseEntity.ok(managementService.getManagement(managementId))
    }

    /**
     * @param managementRequestDto ManagementRequestDto
     * @return ResponseEntity<ResultDto<ManagementResponseDto>>
     */
    @ApiOperation(value = "관리일지 작성")
    @PostMapping
    fun createManagement(
        managementRequestDto: ManagementRequestDto, @RequestParam(required = false) files: List<MultipartFile>?
    ): ResponseEntity<ResultDto<ManagementResponseDto>> {
        val managementResponseDto = managementService.createManagement(
            clientId = testToken["clientId"].toString().toLong(),
            locationCode = testToken["locationCode"].toString(),
            managementRequestDto = managementRequestDto,
            files = files
        )

        return ResponseEntity.ok(managementResponseDto)
    }

    /**
     * @param managementId Long
     * @param managementRequestDto ManagementRequestDto
     * @return ResponseEntity<ResultDto<ManagementResponseDto>>
     */
    @ApiOperation(value = "관리일지 수정")
    @PutMapping("/{managementId}")
    fun modifyManagement(
        @PathVariable("managementId") managementId: Long,
        managementRequestDto: ManagementRequestDto,
        @RequestParam(required = false) deleteList: List<Long>?,
        @RequestParam(required = false) insertList: List<MultipartFile>?
    ): ResponseEntity<ResultDto<ManagementResponseDto>> {
        val managementResponseDto = managementService.modifyManagement(
            managementId = managementId,
            managementRequestDto = managementRequestDto,
            deleteList = deleteList, insertList = insertList
        )

        return ResponseEntity.ok(managementResponseDto)
    }

    /**
     * @param managementId Long
     * @return ResponseEntity<ResultDto<Boolean>>
     */
    @ApiOperation(value = "관리일지 삭제")
    @DeleteMapping("/{managementId}")
    fun deleteManagement(@PathVariable("managementId") managementId: Long): ResponseEntity<ResultDto<Boolean>> {
        managementService.deleteManagement(
            clientId = testToken["clientId"].toString().toLong(),
            managementId = managementId,
            userCode = testToken["userCode"].toString(),
            locationCode = testToken["locationCode"].toString()
        )

        return ResponseEntity.ok(ResultDto(true))
    }

    /**
     * @param managementId Long
     * @param managementCommentRequestDto ManagementCommentRequestDto
     * @return ResponseEntity<ResultDto<ManagementResponseDto>>
     */
    @ApiOperation(value = "관리일지 댓글 작성")
    @PostMapping("/{managementId}/comment")
    fun createManagementComment(
        @PathVariable("managementId") managementId: Long,
        managementCommentRequestDto: ManagementCommentRequestDto
    ): ResponseEntity<ResultDto<ManagementResponseDto>> {
        val managementResponseDto = managementService.createManagementComment(
            managementId = managementId,
            clientId = testToken["clientId"].toString().toLong(),
            managementCommentRequestDto = managementCommentRequestDto,
        )

        return ResponseEntity.ok(managementResponseDto)
    }

    /**
     * @param managementId Long
     * @param managementCommentId Long
     * @return ResponseEntity<ResultDto<Boolean>>
     */
    @ApiOperation(value = "관리일지 댓글 삭제")
    @DeleteMapping("/{managementId}/comment/{managementCommentId}")
    fun deleteManagementComment(@PathVariable("managementId") managementId: Long, @PathVariable("managementCommentId") managementCommentId: Long): ResponseEntity<ResultDto<Boolean>> {
        val result = managementService.deleteManagementComment(
            clientId = testToken["clientId"].toString().toLong(),
            managementId = managementId,
            userCode = testToken["userCode"].toString(),
            locationCode = testToken["locationCode"].toString(),
            managementCommentId = managementCommentId,
        )

        return ResponseEntity.ok(result)
    }

}
