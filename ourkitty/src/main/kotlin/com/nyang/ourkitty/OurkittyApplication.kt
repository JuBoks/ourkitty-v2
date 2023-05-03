package com.nyang.ourkitty

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.jpa.repository.config.EnableJpaAuditing
import org.springframework.scheduling.annotation.EnableScheduling

@EnableJpaAuditing
@SpringBootApplication
@EnableScheduling
class OurkittyApplication

fun main(args: Array<String>) {
    runApplication<OurkittyApplication>(*args)
}
