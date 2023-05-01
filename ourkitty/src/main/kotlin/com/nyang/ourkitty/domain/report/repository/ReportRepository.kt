package com.nyang.ourkitty.domain.report.repository

import com.nyang.ourkitty.entity.ReportEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ReportRepository : JpaRepository<ReportEntity, Long> {
}