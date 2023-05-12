package com.nyang.ourkitty.entity

import javax.persistence.*

@Entity
@Table(name = "management_image_table")
class ManagementImageEntity(
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "management_id")
    val management: ManagementEntity,

    val imagePath: String,

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val managementImageId: Long? = null,
) : BaseEntity() {
}