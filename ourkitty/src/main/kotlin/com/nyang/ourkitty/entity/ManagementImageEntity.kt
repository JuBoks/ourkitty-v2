package com.nyang.ourkitty.entity

import javax.persistence.*

@Entity
@Table(name = "management_image_table")
class ManagementImageEntity(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val managementImageId: Long? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "management_id")
    val management: ManagementEntity,

    val imagePath: String,
) : ImageEntity() {
}