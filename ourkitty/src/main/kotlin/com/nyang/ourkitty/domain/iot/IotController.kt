package com.nyang.ourkitty.domain.iot

import com.nyang.ourkitty.common.dto.ResultDto
import com.nyang.ourkitty.domain.dish.DishService
import com.nyang.ourkitty.domain.iot.dto.DishWeightRequestDto
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@Api(tags = ["IoT 관련 API"])
@RestController
@RequestMapping("/iot")
@CrossOrigin(origins = ["*"])
class IotController(
    private val dishService: DishService,
) {

    @ApiOperation(value = "잔여 사료량 업데이트")
    @PutMapping("/weight")
    fun updateDishWeight(@RequestBody dishWeightRequestDto: DishWeightRequestDto): ResponseEntity<ResultDto<Boolean>> {
        return ResponseEntity.ok(
            dishService.updateDishWeight(
                dishSerialNum = dishWeightRequestDto.dishSerialNum,
                dishWeight = dishWeightRequestDto.dishWeight,
            )
        )
    }

}