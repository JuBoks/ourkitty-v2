package com.nyang.ourkitty.domain.client

import com.nyang.ourkitty.common.dto.ResultDto
import com.nyang.ourkitty.domain.client.dto.ClientRequestDto
import com.nyang.ourkitty.domain.client.dto.ClientResponseDto
import com.nyang.ourkitty.domain.client.repository.ClientDishRepository
import com.nyang.ourkitty.domain.client.repository.ClientQuerydslRepository
import com.nyang.ourkitty.domain.client.repository.ClientRepository
import com.nyang.ourkitty.domain.dish.repository.DishQuerydslRepository
import com.nyang.ourkitty.entity.ClientDishEntity
import com.nyang.ourkitty.entity.ClientEntity
import com.nyang.ourkitty.entity.DishEntity
import com.nyang.ourkitty.exception.CustomException
import com.nyang.ourkitty.exception.ErrorCode
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional(readOnly = true)
class ClientService(
    private val clientRepository: ClientRepository,
    private val clientQuerydslRepository: ClientQuerydslRepository,
    private val clientDishRepository: ClientDishRepository,

    private val dishQuerydslRepository: DishQuerydslRepository,
) {

    @Transactional
    fun createAccount(locationCode: String, clientRequestDto: ClientRequestDto) {
        val client = clientRequestDto.toEntity(locationCode)

        clientRepository.save(client)

        for (dishId in clientRequestDto.dishList) {
            val dish = getDishById(dishId)
            clientDishRepository.save(
                ClientDishEntity(
                    client = client, dish = dish,
                )
            )
        }
    }

    fun getClientList(): ResultDto<List<ClientResponseDto>> {
        val clientList = clientQuerydslRepository.get()

        val clientListResponseDto: List<ClientResponseDto> = clientList.map(ClientResponseDto::of)

        return ResultDto(
            data = clientListResponseDto,
        )
    }

    private fun getClientById(clientId: Long): ClientEntity {
        val client: ClientEntity? = clientRepository.findByIdOrNull(clientId)

        if (client == null || client.isDeleted) {
            throw CustomException(ErrorCode.NOT_FOUND_CLIENT)
        }
        return client
    }

    private fun getDishById(dishId: Long): DishEntity {
        return dishQuerydslRepository.getDishById(dishId) ?: throw CustomException(ErrorCode.NOT_FOUND_DISH)
    }

}