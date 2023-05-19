package com.nyang.ourkitty.common

import com.amazonaws.services.s3.AmazonS3
import com.amazonaws.services.s3.model.ObjectMetadata
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import org.springframework.web.multipart.MultipartFile
import java.util.*

@Component
class AwsS3ImageUploader(
    private val amazonS3: AmazonS3,
    @Value("\${cloud.aws.s3.bucket}") private val bucketName: String,
    @Value("\${cloud.aws.region.static}") private val region: String,
    @Value("\${cloud.aws.s3.dir}") private val dir: String,
) {

    fun uploadImage(file: MultipartFile): String {
        val fileExtension = getFileExtension(file.originalFilename!!)
        val key = "$dir/${UUID.randomUUID()}.$fileExtension"
        val metadata = ObjectMetadata().apply {
            contentType = file.contentType
            contentLength = file.size
        }
        val inputStream = file.inputStream
        amazonS3.putObject(bucketName, key, inputStream, metadata)
        return "https://$bucketName.s3.$region.amazonaws.com/$key"
    }

    fun uploadImageList(files: List<MultipartFile>): List<String> {
        return files.map { file ->
            uploadImage(file)
        }
    }

    private fun getFileExtension(fileName: String): String? {
        val dotIndex = fileName.lastIndexOf('.')
        return if (dotIndex == -1) null else fileName.substring(dotIndex + 1)
    }

}