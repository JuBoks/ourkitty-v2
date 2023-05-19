package com.nyang.ourkitty.entity

import javax.persistence.*

@Entity
@Table(name = "management_table")
class ManagementEntity(
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dish_id")
    val dish: DishEntity,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    val client: ClientEntity,

    @OneToMany(mappedBy = "management", cascade = [CascadeType.PERSIST, CascadeType.MERGE])
    val managementImageList: MutableList<ManagementImageEntity> = mutableListOf(),

    @OneToMany(mappedBy = "management", cascade = [CascadeType.PERSIST, CascadeType.MERGE])
    val managementCommentList: MutableList<ManagementCommentEntity> = mutableListOf(),

    var managementContent: String,
    var dishState: String,
    val locationCode: String,

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val managementId: Long? = null,
) : BaseEntity() {

    fun addComment(comment: ManagementCommentEntity) {
        this.managementCommentList.add(comment)
    }

    fun deleteImage(imageId: Long) {
        val deleted = this.managementImageList.first { managementImage -> managementImage.managementImageId == imageId }
        deleted.delete()
        this.managementImageList.remove(deleted)
    }

    fun addImages(images: List<ManagementImageEntity>) {
        managementImageList.addAll(images)
    }

    fun update(managementContent: String, dishState: String): ManagementEntity {
        this.managementContent = managementContent
        this.dishState = dishState

        return this
    }

    override fun delete() {
        this.managementImageList.forEach { it.delete() }
        this.managementCommentList.forEach { it.delete() }
        this.isDeleted = true
    }
}