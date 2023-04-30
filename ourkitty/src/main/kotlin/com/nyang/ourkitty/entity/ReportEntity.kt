package com.nyang.ourkitty.entity

import com.nyang.ourkitty.common.ReportState
import javax.persistence.*

@Entity
@Table(name = "report_table")
class ReportEntity(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val reportId: Long? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    val client: ClientEntity,

    val dishId: Long,

    val reportTitle: String,
    val reportCategory: String,
    val reportContent: String,
    val locationCode: String,

    @OneToMany(mappedBy = "report")
    val reportImageList: List<ReportImageEntity> = listOf(),

    var reportState: String = ReportState.답변중.code,

) : BaseEntity() {

    fun complete() {
        this.reportState = ReportState.답변완료.code
    }

}