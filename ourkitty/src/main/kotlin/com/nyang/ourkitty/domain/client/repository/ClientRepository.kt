package com.nyang.ourkitty.domain.client.repository

import com.nyang.ourkitty.entity.ClientEntity
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface ClientRepository : CrudRepository<ClientEntity, Long> {
}