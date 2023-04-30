package com.nyang.ourkitty.domain.iot

import com.nyang.ourkitty.common.dto.ResultDto
import com.nyang.ourkitty.domain.dish.DishService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@Api(tags = ["IoT 관련 API"])
@RestController
@RequestMapping("/iot")
@CrossOrigin(origins = ["*"])
class IoTController(
    private val dishService: DishService,
) {

    @ApiOperation(value = "잔여 사료량 업데이트")
    @PutMapping("/{serialNum}")
    fun updateDishWeight(@PathVariable("serialNum") dishSerialNum: String, dishWeight: Double): ResponseEntity<ResultDto<Boolean>> {
        return ResponseEntity.ok(dishService.updateDishWeight(dishSerialNum, dishWeight))
    }
}