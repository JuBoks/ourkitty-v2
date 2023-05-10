package com.meyou.app.network.Login;

import retrofit2.Call;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.POST;

public interface LoginGetToken {
    @FormUrlEncoded
    @POST("auth/login/phone")
    Call<TokenResponse> getToken(@Field("clientPhone") String tokenRequest);
}
