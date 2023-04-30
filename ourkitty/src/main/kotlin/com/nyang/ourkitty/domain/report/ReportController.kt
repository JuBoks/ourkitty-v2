package com.nyang.ourkitty.domain.report

import com.nyang.ourkitty.common.LocationCode
import com.nyang.ourkitty.common.SearchKey
import com.nyang.ourkitty.common.UserCode
import com.nyang.ourkitty.common.dto.ResultDto
import com.nyang.ourkitty.domain.report.dto.ReportListResultDto
import com.nyang.ourkitty.domain.report.dto.ReportRequestDto
import com.nyang.ourkitty.domain.report.dto.ReportResponseDto
import com.nyang.ourkitty.exception.CustomException
import com.nyang.ourkitty.exception.ErrorCode
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@Api(tags = ["문의 관련 API"])
@RestController
@RequestMapping("/report")
class ReportController(
    private val reportService: ReportService
) {

    private val testToken = mapOf(
        "clientId" to 1L,
        "userCode" to UserCode.지자체.code,
        "locationCode" to LocationCode.해운대구.code,
    )

    /**
     * @param reportRequestDto ReportRequestDto
     * @return ResponseEntity<ResultDto<Boolean>>
     */
    @ApiOperation(value = "신고 작성")
    @PostMapping
    fun createReport(reportRequestDto: ReportRequestDto, @RequestParam(required = false) files: List<MultipartFile>?): ResponseEntity<ResultDto<Boolean>> {

        return ResponseEntity.ok(
            reportService.createReport(testToken["clientId"].toString().toLong(), testToken["locationCode"].toString(), reportRequestDto, files)
        )
    }

    /**
     * TODO : 신고 목록 조회 - 장비 파손, 테러 위협 따로 List 전달
     * @return ResponseEntity<ResultDto<List<ReportResponseDto>>>
     */
    @ApiOperation(value = "신고 목록 조회")
    @GetMapping
    fun getReportList(
        @RequestParam limit: Long, @RequestParam offset: Long,
        @RequestParam("dishId") dishId: Long?,
        @RequestParam("reportCategory") reportCategory: String?,
        @RequestParam("searchKey") searchKey: String?,
        @RequestParam("searchWord", defaultValue = "") searchWord: String,
    ): ResponseEntity<ReportListResultDto> {
        if (testToken["userCode"] != UserCode.지자체.code) throw CustomException(ErrorCode.NO_ACCESS)

        val reportList = reportService.getReportList(
            dishId = dishId,
            reportCategory = reportCategory,
            searchKey = searchKey,
            searchWord = searchWord,
            limit = limit, offset = offset)

        return ResponseEntity.ok(reportList)
    }

    /**
     * TODO : 신고 조회
     * @param reportId Long
     * @return ResponseEntity<ResultDto<ReportResponseDto>>
     */
    @ApiOperation(value = "신고 조회")
    @GetMapping("/{reportId}")
    fun getReport(@PathVariable("reportId") reportId: Long): ResponseEntity<ResultDto<ReportResponseDto>> {
        if (testToken["userCode"] != UserCode.지자체.code) throw CustomException(ErrorCode.NO_ACCESS)

        return ResponseEntity.ok(reportService.getReport(reportId))
    }

    /**
     * TODO : 신고 답변 완료 - return Entity
     * @param reportId Long
     * @return ResponseEntity<ResultDto<Boolean>>
     */
    @ApiOperation(value = "신고 답변 완료")
    @PostMapping("/{reportId}")
    fun checkReport(@PathVariable("reportId") reportId: Long): ResponseEntity<ResultDto<Boolean>> {
        if (testToken["userCode"] != UserCode.지자체.code) throw CustomException(ErrorCode.NO_ACCESS)

        return ResponseEntity.ok(reportService.checkReport(reportId))
    }

}