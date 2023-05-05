package com.nyang.ourkitty.entity

import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "block_table")
class BlockEntity(
    val clientId: Long,
    var unBlockDate: LocalDateTime,

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val blockId: Long? = null,
) : BaseEntity() {

    fun updateBlockDate(unBlockDate: LocalDateTime) {
        this.unBlockDate = unBlockDate
    }

    override fun toString(): String {
        return "BlockEntity(clientId=$clientId, unBlockDate=$unBlockDate, blockId=$blockId)"
    }
    
}