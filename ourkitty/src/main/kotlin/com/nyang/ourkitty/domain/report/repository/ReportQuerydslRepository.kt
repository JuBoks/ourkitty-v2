package com.nyang.ourkitty.domain.report.repository

import com.nyang.ourkitty.common.SearchKey
import com.nyang.ourkitty.entity.QReportEntity.reportEntity
import com.nyang.ourkitty.entity.ReportEntity
import com.nyang.ourkitty.exception.CustomException
import com.nyang.ourkitty.exception.ErrorCode
import com.querydsl.jpa.impl.JPAQueryFactory
import org.springframework.stereotype.Repository

@Repository
class ReportQuerydslRepository(
    private val queryFactory: JPAQueryFactory,
) {

    fun getReportList(dishId: Long?, reportCategory: String?, searchKey: String?, searchWord: String, limit: Long, offset: Long): List<ReportEntity> {
        return queryFactory.selectFrom(reportEntity)
            .leftJoin(reportEntity.client).fetchJoin()
            .leftJoin(reportEntity.dish).fetchJoin()
            .where(
                reportEntity.isDeleted.isFalse,
                dishId?.let { reportEntity.dish.dishId.eq(dishId) },
                reportCategory?.let { reportEntity.reportCategory.eq(reportCategory) },
                searchKey?.let {
                    when (it) {
                        SearchKey.제목.code -> reportEntity.reportTitle.contains(searchWord)
                        SearchKey.내용.code -> reportEntity.reportContent.contains(searchWord)
                        else -> throw CustomException(ErrorCode.BAD_REQUEST_EXCEPTION)
                    }
                },
            )
            .orderBy(
                reportEntity.reportState.asc(),
                reportEntity.createdDate.asc(),
            )
            .limit(limit)
            .offset(offset)
            .fetch()
    }

    fun countReportList(dishId: Long?, reportCategory: String?, searchKey: String?, searchWord: String): Long {
        return queryFactory.select(reportEntity.reportId.count())
            .from(reportEntity)
            .leftJoin(reportEntity.dish)
            .where(
                reportEntity.isDeleted.isFalse,
                dishId?.let { reportEntity.dish.dishId.eq(dishId) },
                reportCategory?.let { reportEntity.reportCategory.eq(reportCategory) },
                searchKey?.let {
                    when (it) {
                        SearchKey.제목.code -> reportEntity.reportTitle.contains(searchWord)
                        SearchKey.내용.code -> reportEntity.reportContent.contains(searchWord)
                        else -> throw CustomException(ErrorCode.BAD_REQUEST_EXCEPTION)
                    }
                },
            )
            .fetchOne() ?: 0L
    }

}