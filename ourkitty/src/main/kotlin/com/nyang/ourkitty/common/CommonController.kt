package com.nyang.ourkitty.common

import com.nyang.ourkitty.common.dto.ResultDto
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile

@Api(tags = ["공통 API"])
@RestController
@CrossOrigin(origins = ["*"])
class CommonController(
    private val imageUploader: AwsS3ImageUploader,
) {

    @ApiOperation(value = "단일 이미지 업로드", notes = "파일 S3 업로드 후 저장경로 반환")
    @PostMapping("/upload/image")
    fun uploadImage(@RequestParam file: MultipartFile): ResponseEntity<ResultDto<String>> {
        return ResponseEntity.ok(
            ResultDto(
                data = imageUploader.uploadImage(file),
            )
        )
    }

    @ApiOperation(value = "다중 이미지 업로드", notes = "파일 S3 업로드 후 저장경로 반환")
    @PostMapping("/upload/images")
    fun uploadImageList(@RequestParam files: List<MultipartFile>): ResponseEntity<ResultDto<List<String>>> {
        return ResponseEntity.ok(
            ResultDto(
                data = imageUploader.uploadImageList(files),
            )
        )
    }

}