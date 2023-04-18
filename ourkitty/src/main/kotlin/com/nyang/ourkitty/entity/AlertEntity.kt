package com.nyang.ourkitty.entity

import javax.persistence.*

@Entity
@Table(name = "alert_table")
class AlertEntity(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val alertId: Long? = null,

    val alertCode: String,
    val alertContent: String,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "management_id")
    val management: ManagementEntity? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dish_id")
    val dish: DishEntity? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "report_id")
    val report: ReportEntity? = null,

    val alertState: String,
) : BaseEntity() {
}