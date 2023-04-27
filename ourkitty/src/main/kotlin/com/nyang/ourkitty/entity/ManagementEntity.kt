package com.nyang.ourkitty.entity

import javax.persistence.*

@Entity
@Table(name = "management_table")
class ManagementEntity(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val managementId: Long? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dish_id")
    val dish: DishEntity,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    val client: ClientEntity,

    @OneToMany(mappedBy = "management")
    val managementImageList: MutableList<ManagementImageEntity> = mutableListOf(),

    @OneToMany(mappedBy = "management")
    val managementCommentList: MutableList<ManagementCommentEntity> = mutableListOf(),

    val managementContent: String,
    val dishState: String,
    val locationCode: String,
) : BaseEntity() {

    fun addComment(comment: ManagementCommentEntity) {
        this.managementCommentList.add(comment)
    }
}