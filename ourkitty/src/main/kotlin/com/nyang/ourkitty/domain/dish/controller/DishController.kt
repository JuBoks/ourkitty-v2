package com.nyang.ourkitty.domain.dish.controller

import com.nyang.ourkitty.domain.dish.dto.DishRequestDto
import com.nyang.ourkitty.domain.dish.dto.DishResponseDto
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@Api(tags = ["냥그릇 관련 API"])
@RestController
@RequestMapping("/dish")
class DishController(
    //TODO service 의존성 주입
) {

    /**
     * 현재 유저의 id 를 받아와서 (jwt 토큰 까서?) 해당 유저가 관리하는 dish 의 목록을 반환한다.
     *
     * return : List<DishResponseDto> 를 반환
     */
    @ApiOperation(value = "냥그릇 목록 조회")
    @GetMapping
    fun getDishList(): ResponseEntity<List<DishResponseDto>> {
        //TODO ResultDto 생성 - Generic
        //TODO DishResponseDto 생성
        //TODO 상황에 맞는 Custom Exception 생성
        return ResponseEntity.ok().body(listOf(DishResponseDto()))
    }

    /**
     * 입력받은 dishRequestDto 의 정보를 바탕으로 새로운 냥그릇을 생성한 뒤,
     * exception 이 발생하지 않는다면 id 값을 return 한다.
     * swagger 에 @ApiParam 이라는 어노테이션도 존재
     *
     * param    dishRequestDto: DishRequestDto
     * return   savedDishId: Long
     */
    @ApiOperation(value = "냥그릇 생성")
    @PostMapping
    fun createDish(@RequestBody dishRequestDto: DishRequestDto): ResponseEntity<Long> {
        //TODO DishRequestDto 생성
        return ResponseEntity.ok().body(DishResponseDto(dishRequestDto.toEntity()).dishId)
    }

    /**
     * 입력으로 들어온 dishId 값을 기준으로 냥그릇을 조회한 뒤 반환한다.
     *
     * param    dishId: Long
     * return   dishResponseDto: DishResponseDto
     */
    @ApiOperation(value = "냥그릇 조회")
    @GetMapping("/{dishId}")
    fun getDish(@PathVariable("dishId") dishId: Long): ResponseEntity<DishResponseDto> {
        return ResponseEntity.ok().body(DishResponseDto())
    }

    /**
     * 입력으로 들어온 dishId 와 일치하는 id 를 가진 냥그릇의 정보를
     * dishRequestDto 의 정보로 update 한다.
     * 업데이트가 성공적으로 완료되면, id 값을 반환한다.
     *
     * param    dishId: Long
     * param    dishRequestDto: DishRequestDto
     * return   dishId: Long
     */
    @ApiOperation(value = "냥그릇 수정")
    @PutMapping("/{dishId}")
    fun modifyDish(@PathVariable("dishId") dishId: Long, @RequestBody dishRequestDto: DishRequestDto): ResponseEntity<Long> {
        return ResponseEntity.ok().body(dishId)
    }

    /**
     * 입력으로 들어온 dishId 와 일치하는 id 를 가진 냥그릇을 삭제한다.
     * 삭제가 성공적으로 완료되면 true, 아니면 false 를 반환한다.
     *
     * param    dishId: Long
     * return   result: Boolean
     */
    @ApiOperation(value = "냥그릇 삭제")
    @DeleteMapping("/{dishId}")
    fun deleteDish(@PathVariable("dishId") dishId: Long): ResponseEntity<Boolean> {
        return ResponseEntity.ok().body(true)
    }


}