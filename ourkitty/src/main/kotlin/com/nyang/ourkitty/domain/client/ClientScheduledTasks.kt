package com.nyang.ourkitty.domain.client

import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component

@Component
class ClientScheduledTasks(
    private val clientService: ClientService,
) {

    /**
     * 10 분에 한 번씩 차단 해제 실행
     */
    @Scheduled(cron = "0 0/10 * * * *")
    fun unBlockEveryHour() {
        clientService.activateAccount()
    }

}