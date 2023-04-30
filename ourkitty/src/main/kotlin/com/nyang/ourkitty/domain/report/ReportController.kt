package com.nyang.ourkitty.domain.report

import com.nyang.ourkitty.common.dto.ResultDto
import com.nyang.ourkitty.domain.report.dto.ReportRequestDto
import com.nyang.ourkitty.domain.report.dto.ReportResponseDto
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@Api(tags = ["문의 관련 API"])
@RestController
@RequestMapping("/report")
class ReportController(
    private val reportService: ReportService
) {

    /**
     * TODO : 신고 작성
     * @param reportRequestDto ReportRequestDto
     * @return ResponseEntity<ResultDto<Boolean>>
     */
    @ApiOperation(value = "신고 작성")
    @PostMapping
    fun createReport(@RequestBody reportRequestDto: ReportRequestDto): ResponseEntity<ResultDto<Boolean>> {
        return ResponseEntity.ok(ResultDto(true))
    }

    /**
     * TODO : 신고 목록 조회 - 장비 파손, 테러 위협 따로 List 전달
     * @return ResponseEntity<ResultDto<List<ReportResponseDto>>>
     */
    @ApiOperation(value = "신고 목록 조회")
    @GetMapping
    fun getReportList(): ResponseEntity<ResultDto<List<ReportResponseDto>>> {
        return ResponseEntity.ok(ResultDto(listOf(ReportResponseDto())))
    }

    /**
     * TODO : 신고 조회
     * @param reportId Long
     * @return ResponseEntity<ResultDto<ReportResponseDto>>
     */
    @ApiOperation(value = "신고 조회")
    @GetMapping("/{reportId}")
    fun getReport(@PathVariable("reportId") reportId: Long): ResponseEntity<ResultDto<ReportResponseDto>> {
        return ResponseEntity.ok(ResultDto(ReportResponseDto()))
    }

    /**
     * TODO : 신고 답변 완료
     * @param reportId Long
     * @return ResponseEntity<ResultDto<Boolean>>
     */
    @ApiOperation(value = "신고 답변 완료")
    @PostMapping("/{reportId}")
    fun checkReport(@PathVariable("reportId") reportId: Long): ResponseEntity<ResultDto<Boolean>> {
        return ResponseEntity.ok(ResultDto(true))
    }

}