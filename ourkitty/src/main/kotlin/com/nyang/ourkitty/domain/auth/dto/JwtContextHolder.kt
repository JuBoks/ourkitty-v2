package com.nyang.ourkitty.domain.auth.dto

object JwtContextHolder {
    private val jwtContext = ThreadLocal.withInitial { mutableMapOf<String, Any?>() }

    var clientId: String?
        get() = jwtContext.get()["clientId"] as? String
        set(value) {
            jwtContext.get()["clientId"] = value
        }

    var locationCode: String?
        get() = jwtContext.get()["locationCode"] as? String
        set(value) {
            jwtContext.get()["locationCode"] = value
        }

    var userCode: String?
        get() = jwtContext.get()["userCode"] as? String
        set(value) {
            jwtContext.get()["userCode"] = value
        }

    fun clear() {
        jwtContext.remove()
    }
}
