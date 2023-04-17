package com.nyang.ourkitty.entity

import javax.persistence.*

@Entity
@Table(name = "management_table")
class ManagementEntity(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val managementId: Long? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    val client: ClientEntity,

    val managementContent: String,
) : BaseEntity() {
}