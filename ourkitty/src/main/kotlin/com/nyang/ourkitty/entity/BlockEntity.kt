package com.nyang.ourkitty.entity

import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "block_table")
class BlockEntity(
    val clientId: Long,
    val unBlockDate: LocalDateTime,

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val blockId: Long? = null,
) : BaseEntity() {
}