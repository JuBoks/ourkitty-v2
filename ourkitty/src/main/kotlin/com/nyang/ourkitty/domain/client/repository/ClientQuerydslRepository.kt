package com.nyang.ourkitty.domain.client.repository

import com.nyang.ourkitty.common.ClientSearchKey
import com.nyang.ourkitty.entity.ClientEntity
import com.nyang.ourkitty.entity.QClientDishEntity.clientDishEntity
import com.nyang.ourkitty.entity.QClientEntity.clientEntity
import com.nyang.ourkitty.exception.CustomException
import com.nyang.ourkitty.exception.ErrorCode
import com.querydsl.jpa.impl.JPAQueryFactory
import org.springframework.stereotype.Repository

@Repository
class ClientQuerydslRepository(
    private val queryFactory: JPAQueryFactory,
) {

    fun getClientList(locationCode: String, dishId: Long?, searchKey: String?, searchWord: String): List<ClientEntity> {
        return queryFactory.selectFrom(clientEntity).distinct()
            .leftJoin(clientEntity.dishList, clientDishEntity)
            .where(
                clientEntity.locationCode.eq(locationCode),
                dishId?.let { clientDishEntity.dish.dishId.eq(dishId) },
                searchKey?.let {
                    when (it) {
                        ClientSearchKey.이름.code -> clientEntity.clientName.contains(searchWord)
                        ClientSearchKey.닉네임.code -> clientEntity.clientNickname.contains(searchWord)
                        ClientSearchKey.이메일.code -> clientEntity.clientEmail.contains(searchWord)
                        ClientSearchKey.전화번호.code -> clientEntity.clientPhone.contains(searchWord)
                        ClientSearchKey.주소.code -> clientEntity.clientAddress.contains(searchWord)
                        else -> throw CustomException(ErrorCode.BAD_REQUEST_EXCEPTION)
                    }
                }
            )
            .orderBy(
                clientEntity.updatedDate.asc()
            )
            .fetch()
    }

    fun getClientById(clientId: Long): ClientEntity? {
        return queryFactory.selectFrom(clientEntity)
            .leftJoin(clientEntity.dishList, clientDishEntity).fetchJoin()
            .where(
                clientEntity.clientId.eq(clientId),
            )
            .fetchOne()
    }

    fun getClientByEmail(clientEmail: String): ClientEntity? {
        return queryFactory.selectFrom(clientEntity)
            .where(
                clientEntity.clientEmail.eq(clientEmail)
            )
            .fetchOne()
    }


}