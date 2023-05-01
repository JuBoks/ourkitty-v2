package com.nyang.ourkitty.domain.report.repository

import com.nyang.ourkitty.entity.ReportImageEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ReportImageRepository : JpaRepository<ReportImageEntity, Long> {
}