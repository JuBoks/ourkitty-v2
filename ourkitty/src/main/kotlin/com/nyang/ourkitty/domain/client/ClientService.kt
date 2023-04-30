package com.nyang.ourkitty.domain.client

import com.nyang.ourkitty.domain.client.repository.ClientRepository
import com.nyang.ourkitty.entity.ClientEntity
import com.nyang.ourkitty.exception.CustomException
import com.nyang.ourkitty.exception.ErrorCode
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional(readOnly = true)
class ClientService(
    private val clientRepository: ClientRepository
) {

    private fun getClientById(clientId: Long): ClientEntity {
        val client: ClientEntity? = clientRepository.findByIdOrNull(clientId)

        if (client == null || client.isDeleted) {
            throw CustomException(ErrorCode.NOT_FOUND_CLIENT)
        }
        return client
    }
    
}