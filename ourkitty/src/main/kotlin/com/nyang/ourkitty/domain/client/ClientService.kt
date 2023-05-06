package com.nyang.ourkitty.domain.client

import com.nyang.ourkitty.common.AwsS3ImageUploader
import com.nyang.ourkitty.common.UserState
import com.nyang.ourkitty.common.dto.ResultDto
import com.nyang.ourkitty.domain.client.dto.ClientListResultDto
import com.nyang.ourkitty.domain.client.dto.ClientRequestDto
import com.nyang.ourkitty.domain.client.dto.ClientResponseDto
import com.nyang.ourkitty.domain.client.repository.*
import com.nyang.ourkitty.domain.dish.repository.DishQuerydslRepository
import com.nyang.ourkitty.entity.BlockEntity
import com.nyang.ourkitty.entity.ClientDishEntity
import com.nyang.ourkitty.entity.ClientEntity
import com.nyang.ourkitty.entity.DishEntity
import com.nyang.ourkitty.exception.CustomException
import com.nyang.ourkitty.exception.ErrorCode
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.multipart.MultipartFile
import java.time.LocalDateTime


@Service
@Transactional(readOnly = true)
class ClientService(
    private val clientRepository: ClientRepository,
    private val clientQuerydslRepository: ClientQuerydslRepository,
    private val clientDishRepository: ClientDishRepository,

    private val blockRepository: BlockRepository,
    private val blockQuerydslRepository: BlockQuerydslRepository,

    private val dishQuerydslRepository: DishQuerydslRepository,

    private val imageUploader: AwsS3ImageUploader,
    private val passwordEncoder: PasswordEncoder,
) {

    @Transactional
    fun createAccount(locationCode: String, clientRequestDto: ClientRequestDto): ResultDto<ClientResponseDto> {
        val client = clientRequestDto.toEntity()

        if (clientRepository.existsByClientEmail(client.clientEmail)) {
            throw CustomException(ErrorCode.DUPLICATE_CLIENT_EMAIL)
        }

        if (clientRepository.existsByClientPhone(client.clientPhone)) {
            throw CustomException(ErrorCode.DUPLICATE_CLIENT_PHONE)
        }

        client.updateLocationCode(locationCode)
        client.updateLastPostingDate()
        client.updatePassword(passwordEncoder.encode(client.clientPassword))

        clientRepository.save(client)

        for (dishId in clientRequestDto.dishList) {
            val dish = getDishById(dishId)
            clientDishRepository.save(
                ClientDishEntity(
                    client = client, dish = dish,
                )
            )
        }

        return ResultDto(
            data = ClientResponseDto.of(
                clientRepository.save(client)
            ),
        )
    }

    fun checkEmailDuplication(clientEmail: String): ResultDto<Boolean> {
        if (clientRepository.existsByClientEmail(clientEmail)) {
            throw CustomException(ErrorCode.DUPLICATE_CLIENT_EMAIL)
        }

        return ResultDto(
            data = true,
        )
    }

    fun checkPhoneDuplication(clientPhone: String): ResultDto<Boolean> {
        if (clientRepository.existsByClientPhone(clientPhone)) {
            throw CustomException(ErrorCode.DUPLICATE_CLIENT_PHONE)
        }

        return ResultDto(
            data = true,
        )
    }

    fun getAccountList(locationCode: String, dishId: Long?, searchKey: String?, searchWord: String): ClientListResultDto {
        val clientListResponseDto = clientQuerydslRepository.getClientList(
            locationCode = locationCode,
            dishId = dishId,
            searchKey = searchKey,
            searchWord = searchWord,
        )
            .map(ClientResponseDto::of)

        val result = ClientListResultDto()

        clientListResponseDto.forEach {
            when (it.userState) {
                UserState.정상.code -> result.activeList.add(it)
                UserState.비활성화.code -> result.inactiveList.add(it)
                UserState.탈퇴.code -> result.deletedList.add(it)
            }
        }
        /*
        * if (it.isDeleted) {
            result.deletedList.add(it)
        } else if (it.isActive) {
            result.activeList.add(it)
        } else {
            result.inactiveList.add(it)
        }
        */

        return result
    }

    fun getAccountById(clientId: Long): ResultDto<ClientResponseDto> {

        return ResultDto(
            data = ClientResponseDto.of(
                getAllClientById(clientId)
            ),
        )
    }

    fun getAccountByEmail(clientEmail: String): ResultDto<ClientResponseDto> {

        return ResultDto(
            data = ClientResponseDto.of(
                getClientByEmail(clientEmail)
            ),
        )
    }

    //TODO : 휴대폰 번호 변경

    @Transactional
    fun modifyMyAccount(clientId: Long, clientRequestDto: ClientRequestDto, file: MultipartFile?): ResultDto<ClientResponseDto> {
        val client = getAllClientById(clientId)
        val updateParam = clientRequestDto.toEntity()

        if (file != null) {
            val imagePath = imageUploader.uploadImage(file)
            client.updateProfileImage(imagePath)
        }

        client.updateMyAccount(updateParam)

        return ResultDto(
            data = ClientResponseDto.of(
                clientRepository.save(client)
            ),
        )
    }

    @Transactional
    fun modifyAccount(clientId: Long, clientRequestDto: ClientRequestDto): ResultDto<ClientResponseDto> {
        val client = getAllClientById(clientId)
        val updateParam = clientRequestDto.toEntity()

        client.updateAccount(updateParam)

        val newDishList: Set<Long> = clientRequestDto.dishList.toSet()
        val oldDishList: Set<Long> = client.dishList
            .map { clientDish -> clientDish.dish.dishId!! }
            .toSet()

        for (dishId in oldDishList subtract newDishList) {
            client.dishList
                .first { it.dish.dishId == dishId }
                .also(client::deleteDish)
                .also(clientDishRepository::delete)
        }

        for (dishId in newDishList subtract oldDishList) {
            ClientDishEntity(
                client = client,
                dish = getDishById(dishId),
            )
                .run(clientDishRepository::save)
                .run(client::addDish)
        }

        return ResultDto(
            data = ClientResponseDto.of(
                clientRepository.save(client)
            ),
        )
    }

    @Transactional
    fun deleteAccount(clientId: Long, clientDescription: String): ResultDto<Boolean> {
        getAllClientById(clientId).let {
            it.delete(clientDescription)
            clientRepository.save(it)
        }

        return ResultDto(
            data = true,
        )
    }

    @Transactional
    fun cancelDeleteAccount(clientId: Long): ResultDto<Boolean>? {
        getAllClientById(clientId).let {
            it.cancelDelete()
            clientRepository.save(it)
        }

        return ResultDto(
            data = true,
        )
    }

    @Transactional
    fun deactivateAccount(clientId: Long, clientDescription: String, unBlockDate: LocalDateTime): ResultDto<Boolean> {
        getClientById(clientId).let {
            it.deactivate(clientDescription)
            clientRepository.save(it)
        }

        val block = blockRepository.findByClientId(clientId)?.apply{ this.updateBlockDate(unBlockDate) } ?: BlockEntity(
            clientId = clientId,
            unBlockDate = unBlockDate,
        )

        blockRepository.save(block)

        return ResultDto(
            data = true,
        )
    }

    @Transactional
    fun activateAccount() {
        val now = LocalDateTime.now()
        val unBlockList = blockQuerydslRepository.getUnblockList(now)

        unBlockList
            .map { getAllClientById(it.clientId) }
            .forEach { it.activate() }

        unBlockList.forEach(blockRepository::delete)
    }

    private fun getClientById(clientId: Long): ClientEntity {
        return clientQuerydslRepository.getClientById(clientId) ?: throw CustomException(ErrorCode.NOT_FOUND_CLIENT)
    }
    private fun getAllClientById(clientId: Long): ClientEntity {
        return clientQuerydslRepository.getAllClientById(clientId) ?: throw CustomException(ErrorCode.NOT_FOUND_CLIENT)
    }

    private fun getClientByEmail(clientEmail: String): ClientEntity {
        return clientQuerydslRepository.getClientByEmail(clientEmail) ?: throw CustomException(ErrorCode.NOT_FOUND_CLIENT)
    }

    private fun getDishById(dishId: Long): DishEntity {
        return dishQuerydslRepository.getDishById(dishId) ?: throw CustomException(ErrorCode.NOT_FOUND_DISH)
    }

}