package com.nyang.ourkitty.domain.report

import com.nyang.ourkitty.common.ReportState
import com.nyang.ourkitty.common.dto.ResultDto
import com.nyang.ourkitty.domain.client.repository.ClientRepository
import com.nyang.ourkitty.domain.dish.repository.DishQuerydslRepository
import com.nyang.ourkitty.domain.report.dto.ReportListResultDto
import com.nyang.ourkitty.domain.report.dto.ReportRequestDto
import com.nyang.ourkitty.domain.report.dto.ReportResponseDto
import com.nyang.ourkitty.domain.report.repository.ReportImageRepository
import com.nyang.ourkitty.domain.report.repository.ReportQuerydslRepository
import com.nyang.ourkitty.domain.report.repository.ReportRepository
import com.nyang.ourkitty.entity.ClientEntity
import com.nyang.ourkitty.entity.DishEntity
import com.nyang.ourkitty.entity.ReportEntity
import com.nyang.ourkitty.entity.ReportImageEntity
import com.nyang.ourkitty.exception.CustomException
import com.nyang.ourkitty.exception.ErrorCode
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional(readOnly = true)
class ReportService(
    private val reportRepository: ReportRepository,
    private val reportQuerydslRepository: ReportQuerydslRepository,
    private val reportImageRepository: ReportImageRepository,

    private val clientRepository: ClientRepository,

    private val dishQuerydslRepository: DishQuerydslRepository,
) {

    @Transactional
    fun createReport(clientId: Long, locationCode: String, reportRequestDto: ReportRequestDto, files: List<String>?): ResultDto<Boolean> {
        val client = getClientById(clientId)
        val dish = getDishById(reportRequestDto.dishId)

        val report = reportRequestDto.toEntity(
            client = client,
            dish = dish,
            locationCode = locationCode
        )

        reportRepository.save(report)

        files?.map { imagePath ->
            ReportImageEntity(
                report = report,
                imagePath = imagePath,
            )
        }?.forEach(reportImageRepository::save)

        return ResultDto(
            data = true,
        )
    }

    fun getReportList(dishId: Long?, reportCategory: String?, searchKey: String?, searchWord: String, limit: Long, offset: Long): ReportListResultDto {
        val reportList = reportQuerydslRepository.getReportList(
            dishId = dishId,
            reportCategory = reportCategory,
            searchKey = searchKey,
            searchWord = searchWord,
            limit = limit, offset = offset
        )
        val totalCount = reportQuerydslRepository.countReportList(
            dishId = dishId,
            reportCategory = reportCategory,
            searchKey = searchKey,
            searchWord = searchWord,
        )

        val todoList = reportList
            .filter { it.reportState == ReportState.답변중.code }
            .map(ReportResponseDto::of)

        val doneList = reportList
            .filter { it.reportState == ReportState.답변완료.code }
            .map(ReportResponseDto::of)

        return ReportListResultDto(
            todoList = todoList,
            doneList = doneList,
            totalCount = totalCount,
        )
    }

    fun getReport(reportId: Long): ResultDto<ReportResponseDto> {
        return ResultDto(
            data = ReportResponseDto.of(
                getReportById(reportId)
            ),
        )
    }

    @Transactional
    fun checkReport(reportId: Long, reportDescription: String?): ResultDto<Boolean> {
        val report = getReportById(reportId)
        report.complete(reportDescription)

        reportRepository.save(report)

        return ResultDto(
            data = true,
        )
    }

    private fun getClientById(clientId: Long): ClientEntity {
        return clientRepository.findByIdOrNull(clientId) ?: throw CustomException(ErrorCode.NOT_FOUND_CLIENT)
    }

    private fun getReportById(reportId: Long): ReportEntity {
        val report = reportRepository.findByIdOrNull(reportId)

        if (report == null || report.isDeleted) {
            throw CustomException(ErrorCode.NOT_FOUND_REPORT)
        }
        return report
    }

    private fun getDishById(dishId: Long): DishEntity {
        return dishQuerydslRepository.getDishById(dishId) ?: throw CustomException(ErrorCode.NOT_FOUND_DISH)
    }

}