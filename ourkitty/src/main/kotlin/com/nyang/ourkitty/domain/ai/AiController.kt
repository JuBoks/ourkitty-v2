package com.nyang.ourkitty.domain.ai

import io.swagger.annotations.Api
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@Api(tags = ["AI 관련 API"])
@RestController
@RequestMapping("/ai")
@CrossOrigin(origins = ["*"])
class AiController {
}