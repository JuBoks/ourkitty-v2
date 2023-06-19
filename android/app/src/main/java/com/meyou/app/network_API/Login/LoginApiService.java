package com.meyou.app.network_API.Login;

import retrofit2.Call;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.POST;

public interface LoginApiService {
    @FormUrlEncoded
    @POST("auth/check/phone")
    Call<PhoneCheck> checkPhone(@Field("clientPhone") String phone);
}


