package com.nyang.ourkitty.domain.client.repository

import com.nyang.ourkitty.entity.ClientEntity
import com.nyang.ourkitty.entity.QClientDishEntity.clientDishEntity
import com.nyang.ourkitty.entity.QClientEntity.clientEntity
import com.querydsl.jpa.impl.JPAQueryFactory
import org.springframework.stereotype.Repository

@Repository
class ClientQuerydslRepository(
    private val queryFactory: JPAQueryFactory,
) {

    fun get(): List<ClientEntity> {
        return queryFactory.selectFrom(clientEntity)
            .leftJoin(clientEntity.dishList, clientDishEntity).fetchJoin()
            .where(
                clientEntity.isDeleted.isFalse,
            )
            .fetch()
    }


}