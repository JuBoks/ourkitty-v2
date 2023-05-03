package com.nyang.ourkitty.domain.auth

import com.nyang.ourkitty.entity.BaseEntity
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "refresh_token_table")
class RefreshToken(
    @Id @Column(name = "rt_key")
    val key: String,

    @Column(name = "rt_value")
    var value: String,
) : BaseEntity() {

    fun updateValue(token: String): RefreshToken {
        this.value = token
        return this
    }

}