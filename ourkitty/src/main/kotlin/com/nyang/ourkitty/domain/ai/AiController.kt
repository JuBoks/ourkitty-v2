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
        return ResponseEntity.ok(dishService.createDishImage(imageRequestDto))
    }

    @ApiOperation(value = "개체 수 수정")
    @PutMapping("/count")
    fun updateCatCount(@RequestBody catCountRequestDto: CatCountRequestDto): ResponseEntity<ResultDto<Boolean>> {
        return ResponseEntity.ok(dishService.updateDishCatCount(catCountRequestDto))
    }

    @ApiOperation(value = "테스트")
    @PutMapping("/haha1")
    fun putTest1(testStr: String): ResponseEntity<ResultDto<String>> {
        println("test1 $testStr")

        return ResponseEntity.ok(
            ResultDto(
                data = testStr,
            )
        )
    }

    @ApiOperation(value = "테스트")
    @PutMapping("/haha2")
    fun putTest2(@RequestBody testStr: String): ResponseEntity<ResultDto<String>> {
        println("test2 $testStr")

        return ResponseEntity.ok(
            ResultDto(
                data = testStr,
            )
        )
    }

    @ApiOperation(value = "테스트")
    @PutMapping("/haha3")
    fun putTest3(@RequestParam testStr: String): ResponseEntity<ResultDto<String>> {
        println("test3 $testStr")

        return ResponseEntity.ok(
            ResultDto(
                data = testStr,
            )
        )
    }

    @ApiOperation(value = "테스트")
    @PostMapping("/haha11")
    fun postTest1(testStr: String): ResponseEntity<ResultDto<String>> {
        println("test1 $testStr")

        return ResponseEntity.ok(
            ResultDto(
                data = testStr,
            )
        )
    }

    @ApiOperation(value = "테스트")
    @PostMapping("/haha22")
    fun postTest2(@RequestBody testStr: String): ResponseEntity<ResultDto<String>> {
        println("test2 $testStr")

        return ResponseEntity.ok(
            ResultDto(
                data = testStr,
            )
        )
    }

    @ApiOperation(value = "테스트")
    @PostMapping("/haha33")
    fun postTest3(@RequestParam testStr: String): ResponseEntity<ResultDto<String>> {
        println("test3 $testStr")

        return ResponseEntity.ok(
            ResultDto(
                data = testStr,
            )
        )
    }


}