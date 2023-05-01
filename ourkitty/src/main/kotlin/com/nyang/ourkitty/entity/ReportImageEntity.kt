package com.nyang.ourkitty.entity

import javax.persistence.*

@Entity
@Table(name = "report_image_table")
class ReportImageEntity(
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "report_id")
    val report: ReportEntity,

    val imagePath: String,

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val reportImageId: Long? = null,
) : ImageEntity() {
}