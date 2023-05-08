package com.nyang.ourkitty.domain.ai

import com.nyang.ourkitty.common.dto.ResultDto
import com.nyang.ourkitty.domain.ai.dto.CatCountRequestDto
import com.nyang.ourkitty.domain.ai.dto.ImageRequestDto
import com.nyang.ourkitty.domain.dish.DishService
import com.nyang.ourkitty.domain.dish.dto.DishImageResponseDto
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.LocalDate
import java.time.format.DateTimeFormatter

@Api(tags = ["AI 관련 API"])
@RestController
@RequestMapping("/ai")
@CrossOrigin(origins = ["*"])
class AiController(
    private val dishService: DishService,
) {

    @ApiOperation(value = "냥그릇 고양이 사진 리스트")
    @GetMapping("/image")
    fun getCatImageList(dishSerialNum: String, date: String): ResponseEntity<ResultDto<List<DishImageResponseDto>>> {
        val localDate: LocalDate = LocalDate.parse(date, DateTimeFormatter.ISO_DATE)

        return ResponseEntity.ok(dishService.getDishImageList(dishSerialNum, localDate))
    }

    @ApiOperation(value = "고양이 사진 전송")
    @PostMapping("/image")
    fun saveCatImage(@RequestBody imageRequestDto: ImageRequestDto): ResponseEntity<ResultDto<Boolean>> {
        //FIXME : serialNum 위치 - DTO or PathVariable
        return ResponseEntity.ok(dishService.createDishImage(imageRequestDto))
    }

    @ApiOperation(value = "개체 수 수정")
    @PutMapping("/count")
    fun updateCatCount(@RequestBody catCountRequestDto: CatCountRequestDto): ResponseEntity<ResultDto<Boolean>> {
        return ResponseEntity.ok(dishService.updateDishCatCount(catCountRequestDto))
    }

}