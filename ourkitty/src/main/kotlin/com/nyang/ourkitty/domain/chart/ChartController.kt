package com.nyang.ourkitty.domain.chart

import com.nyang.ourkitty.common.UserCode
import com.nyang.ourkitty.domain.auth.dto.JwtContextHolder
import com.nyang.ourkitty.domain.chart.dto.DishCountResultDto
import com.nyang.ourkitty.exception.CustomException
import com.nyang.ourkitty.exception.ErrorCode
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@Api(tags = ["차트 관련 API"])
@RestController
@RequestMapping("/chart")
@CrossOrigin(origins = ["*"])
class ChartController(
    private val chartService: ChartService,
) {

    /**
     * 시간대 별 찍힌 사진 수 (히트맵) 데이터 형태에 맞게 가공해서 return
     * fileNameList 도 줘야 볼 수 있다.
     */
    @ApiOperation("최근 일주일 시간대별 히트맵 데이터")
    @GetMapping("/visit")
    fun getCatVisitData(dishId: Long) {
        chartService.getCatVisitData(dishId)

        // return ResponseEntity.ok(chartService.getCatVisitData(dishId))
    }


    /**
     * 냥그릇 별 개체수 (라인그래프) 데이터 형태에 맞게 가공해서 return
     * serial-num 과 date 를 찍어놔야 그래프가 나오겠지?
     */
    @ApiOperation("최근 일주일 개체 수 데이터")
    @GetMapping("/count")
    fun getCatCountData(dishId: Long): ResponseEntity<DishCountResultDto> {
        if (JwtContextHolder.userCode != UserCode.지자체.code) throw CustomException(ErrorCode.NO_ACCESS)

        return ResponseEntity.ok(chartService.getCatCountData(dishId))
    }

    /**
     * 사료통 무게
     */

}