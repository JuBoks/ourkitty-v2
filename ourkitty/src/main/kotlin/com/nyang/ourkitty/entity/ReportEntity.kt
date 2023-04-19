package com.nyang.ourkitty.entity

import javax.persistence.*

@Entity
@Table(name = "report_table")
class ReportEntity(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val reportId: Long? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    val client: ClientEntity,

    val reportCategory: String,
    val reportContent: String,
    val reportState: String,
) : BaseEntity() {
}