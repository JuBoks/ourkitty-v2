package com.nyang.ourkitty.entity

import javax.persistence.*

@Entity
@Table(name = "management_comment_table")
class ManagementCommentEntity(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val managementCommentId: Long? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "management_id")
    val management: ManagementEntity,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    val client: ClientEntity,

    val managementCommentContent: String,
) : BaseEntity() {
}