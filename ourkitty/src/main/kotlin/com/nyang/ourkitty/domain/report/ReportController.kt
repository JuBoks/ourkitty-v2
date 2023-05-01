package com.nyang.ourkitty.domain.report

import com.nyang.ourkitty.common.LocationCode
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
        val result = reportService.createReport(
            clientId = testToken["clientId"].toString().toLong(),
            locationCode = testToken["locationCode"].toString(),
            reportRequestDto = reportRequestDto,
            files = files
        )

        return ResponseEntity.ok(result)
    }

    /**
     * @return ResponseEntity<ResultDto<List<ReportResponseDto>>>
     */
    @ApiOperation(value = "신고 목록 조회")
    @GetMapping
    fun getReportList(
        @RequestParam limit: Long, @RequestParam offset: Long,
        @RequestParam("dishId", required = false) dishId: Long?,
        @RequestParam("reportCategory", required = false) reportCategory: String?,
        @RequestParam("searchKey", required = false) searchKey: String?,
        @RequestParam("searchWord", required = false, defaultValue = "") searchWord: String,
    ): ResponseEntity<ReportListResultDto> {

        if (testToken["userCode"].toString() != UserCode.지자체.code) throw CustomException(ErrorCode.NO_ACCESS)

        val reportList = reportService.getReportList(
            dishId = dishId,
            reportCategory = reportCategory,
            searchKey = searchKey,
            searchWord = searchWord,
            limit = limit, offset = offset
        )

        return ResponseEntity.ok(reportList)
    }

    /**
     * @param reportId Long
     * @return ResponseEntity<ResultDto<ReportResponseDto>>
     */
    @ApiOperation(value = "신고 조회")
    @GetMapping("/{reportId}")
    fun getReport(@PathVariable("reportId") reportId: Long): ResponseEntity<ResultDto<ReportResponseDto>> {

        if (testToken["userCode"].toString() != UserCode.지자체.code) throw CustomException(ErrorCode.NO_ACCESS)

        return ResponseEntity.ok(reportService.getReport(reportId))
    }

    /**
     * TODO : 신고 답변 완료 - return Entity
     * @param reportId Long
     * @return ResponseEntity<ResultDto<Boolean>>
     */
    @ApiOperation(value = "신고 답변 완료")
    @PutMapping("/{reportId}")
    fun checkReport(@PathVariable("reportId") reportId: Long, reportDescription: String): ResponseEntity<ResultDto<Boolean>> {

        if (testToken["userCode"].toString() != UserCode.지자체.code) throw CustomException(ErrorCode.NO_ACCESS)

        return ResponseEntity.ok(reportService.checkReport(reportId, reportDescription))
    }

}