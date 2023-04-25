package com.nyang.ourkitty.entity

import javax.persistence.*

@Entity
@Table(name = "report_image_table")
class ReportImageEntity(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val reportImageId: Long? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "report_id")
    val report: ReportEntity,

    val fileName: String,
    val filePath: String,
) : ImageEntity() {
}