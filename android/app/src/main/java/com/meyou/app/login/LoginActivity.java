package com.meyou.app.login;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;
import com.bumptech.glide.Glide;
import com.meyou.app.MainActivity;
import com.meyou.app.R;
import com.meyou.app.network_API.Login.LoginGetToken;
import com.meyou.app.network_API.RetrofitInstance;
import com.meyou.app.network_API.Login.TokenResponse;


import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {

    EditText inputPhoneNum;

    EditText inputPassword;
    Button checkBt;
    SharedPreferences pref;
    SharedPreferences.Editor editor;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        ImageView cat = (ImageView) findViewById(R.id.CatGif);
        Glide.with(this).load(R.raw.login_cat).into(cat);

        inputPhoneNum = findViewById(R.id.input_phone_num);

        inputPassword = findViewById(R.id.input_password);
        checkBt = findViewById(R.id.login_button);
        // SharedPreferences 초기화
        pref = getApplicationContext().getSharedPreferences("user_info", MODE_PRIVATE);
        editor = pref.edit();

        // 로그인
        checkBt.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Get phone number and password
                String phoneNum = inputPhoneNum.getText().toString();
                String password = inputPassword.getText().toString();
                phoneNum = phoneNum.substring(0, 3) + "-" + phoneNum.substring(3, 7) + "-" + phoneNum.substring(7, 11);

                // Create service
                LoginGetToken service = new RetrofitInstance().getUserToken();
                Call<TokenResponse> call = service.getToken(phoneNum, password);
                    call.enqueue(new Callback<TokenResponse>() {
                        @Override
                        public void onResponse(Call<TokenResponse> call, Response<TokenResponse> response) {
                            if (response.isSuccessful()) {
                                TokenResponse tokenResponse = response.body();
                                if (tokenResponse != null) {
                                    String accessToken = response.body().getData().getAccessToken();
                                    Log.d("getAccessToken",response.body().getData().getAccessToken());
                                    // Save access token in SharedPreferences
                                    SharedPreferences.Editor editor = pref.edit();
                                    editor.putString("accessToken", accessToken);
                                    editor.apply();

                                    Toast.makeText(getApplicationContext(), "로그인 완료 되었습니다.", Toast.LENGTH_SHORT).show();
                                    Intent intent = new Intent(LoginActivity.this, MainActivity.class);
                                    startActivity(intent);
                                    finish();
                                } else {
                                    Toast.makeText(getApplicationContext(), "다시 시도해 주세요.", Toast.LENGTH_SHORT).show();
                                }
                            } else {
                                Toast.makeText(getApplicationContext(), "로그인 실패 " + response.code(), Toast.LENGTH_SHORT).show();
                            }
                        }

                        @Override
                        public void onFailure(Call<TokenResponse> call, Throwable t) {
                            Toast.makeText(getApplicationContext(), "네트워크 오류", Toast.LENGTH_SHORT).show();
                        }
                    });
            }
        });
    }

}