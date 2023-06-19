package com.meyou.app.login;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.app.PendingIntent;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.telephony.SmsManager;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import android.Manifest;

import com.bumptech.glide.Glide;
import com.meyou.app.MainActivity;
import com.meyou.app.R;
import com.meyou.app.network_API.Login.LoginApiService;
import com.meyou.app.network_API.Login.LoginGetToken;
import com.meyou.app.network_API.Login.PhoneCheck;
import com.meyou.app.network_API.RetrofitInstance;
import com.meyou.app.network_API.Login.TokenResponse;

import java.util.Random;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {

    EditText inputPhoneNum;
    Button sendSMSBt;

    EditText inputCheckNum;
    Button checkBt;

    static final int SNS_SEND_PERMISSON = 1;

    // 인증번호를 비교하기 위해 쉐어드에 저장해줍니다.
    SharedPreferences pref;
    SharedPreferences.Editor editor;
    String checkNum;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        ImageView cat = (ImageView) findViewById(R.id.CatGif);
        Glide.with(this).load(R.raw.login_cat).into(cat);

        inputPhoneNum = findViewById(R.id.input_phone_num);
        sendSMSBt = findViewById(R.id.send_sms_button);

        inputCheckNum = findViewById(R.id.input_check_num);
        checkBt = findViewById(R.id.check_button);
        // SharedPreferences 초기화
        pref = getApplicationContext().getSharedPreferences("user_info", MODE_PRIVATE);
        editor = pref.edit();

//         sms 보내기 권한 확인

        int permissonCheck = ContextCompat.checkSelfPermission(this, Manifest.permission.SEND_SMS);

        if(permissonCheck != PackageManager.PERMISSION_GRANTED){
            // 문자 보내기 권한 거부
            if(ActivityCompat.shouldShowRequestPermissionRationale(this, Manifest.permission.SEND_SMS)){
                Toast.makeText(getApplicationContext(), "SMS권한이 필요합니다.", Toast.LENGTH_SHORT).show();
            }
            // 문자 보내기 권한 허용
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.SEND_SMS}, SNS_SEND_PERMISSON);
        }

        // 클릭 이벤트 기능
        sendSMSBt.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String phoneNum = inputPhoneNum.getText().toString();
                if (phoneNum.length() != 11) {
                    Toast.makeText(getApplicationContext(), "번호를 다시 입력해 주세요", Toast.LENGTH_SHORT).show();
                    return;
                }
                phoneNum = phoneNum.substring(0, 3) + "-" + phoneNum.substring(3, 7) + "-" + phoneNum.substring(7, 11);
//                Phone phone = new Phone(phoneNum);

                LoginApiService service = new RetrofitInstance().getPhoneCheckApi();
                Call<PhoneCheck> call = service.checkPhone(phoneNum);

                // back으로 inputPhoneNum 보내서 등록된 캣맘인지 확인하기
                call.enqueue(new Callback<PhoneCheck>() {
                    @Override
                    public void onResponse(Call<PhoneCheck> call, Response<PhoneCheck> response) {
                        if (response.isSuccessful() && response.body() != null) {
                            PhoneCheck phoneCheck = response.body();
                            if (phoneCheck != null) {
                            String data = response.body().getData();
                                // 관리자가 등록해놓은 캣맘이면 인증번호 발송
                                if ("true".equals(data)) {
                                    String checkNum = numberGen(4, 1);
                                    editor.putString("checkNum", checkNum);
                                    editor.commit();

                                    // 인증번호 문자 보내기
                                    sendSMS(inputPhoneNum.getText().toString(), "냥그릇 인증번호 : " + checkNum);
                                } else {
                                    Toast.makeText(getApplicationContext(), "서버 오류: 응답 본문이 비어 있습니다.", Toast.LENGTH_SHORT).show();
                                }
                            } else {
                                Toast.makeText(getApplicationContext(), "관리자 인증이 되지 않은 유저입니다.", Toast.LENGTH_SHORT).show();
                            }
                        } else {
                            Toast.makeText(getApplicationContext(), "관리자 인증이 되지 않은 유저입니다.", Toast.LENGTH_SHORT).show();
                        }
                    }

                    @Override
                    public void onFailure(Call<PhoneCheck> call, Throwable t) {
                        Toast.makeText(getApplicationContext(), "네트워크 오류", Toast.LENGTH_SHORT).show();
                    }
                });
            }
        });

        // 인증번호 체크, 동시에 로그인 하는 버튼
        checkBt.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (pref.getString("checkNum", "").equals(inputCheckNum.getText().toString())) {
                    // Get phone number
                    String phoneNum = inputPhoneNum.getText().toString();
                    phoneNum = phoneNum.substring(0, 3) + "-" + phoneNum.substring(3, 7) + "-" + phoneNum.substring(7, 11);
//                    Phone tokenRequest = new Phone(phoneNum);

                    // Create service
                    LoginGetToken service = new RetrofitInstance().getUserToken();
                    Call<TokenResponse> call = service.getToken(phoneNum);

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

                                    Toast.makeText(getApplicationContext(), "인증 완료 되었습니다.", Toast.LENGTH_SHORT).show();
                                    Intent intent = new Intent(LoginActivity.this, MainActivity.class);
                                    startActivity(intent);
                                    finish();
                                } else {
                                    Toast.makeText(getApplicationContext(), "서버 오류: 응답 본문이 비어 있습니다.", Toast.LENGTH_SHORT).show();
                                }
                            } else {
                                Toast.makeText(getApplicationContext(), "서버 오류: " + response.code(), Toast.LENGTH_SHORT).show();
                            }
                        }

                        @Override
                        public void onFailure(Call<TokenResponse> call, Throwable t) {
                            Toast.makeText(getApplicationContext(), "네트워크 오류", Toast.LENGTH_SHORT).show();
                        }
                    });
                } else {
                    Toast.makeText(getApplicationContext(), "인증번호가 일치하지 않습니다.", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }




    // SMS발송 기능
    public void sendSMS(String phoneNumber, String message)
    {
        PendingIntent pi = PendingIntent.getActivity(this, 0, new Intent(), 0);

        SmsManager sms = SmsManager.getDefault();
        sms.sendTextMessage(phoneNumber, null, message, pi, null);

        Toast.makeText(getBaseContext(), "메세지가 전송 되었습니다.", Toast.LENGTH_SHORT).show();
    }

    // 인증번호 생성 기능
    public static String numberGen(int len, int dupCd){
        Random rand = new Random();
        String numStr = ""; // 난수가 저장된 변수

        for(int i=0; i<len; i++){
            String ran = Integer.toString(rand.nextInt(10));

            if(dupCd==1){
                numStr += ran;
            }else if(dupCd == 2){
                if(!numStr.contains(ran)){
                    numStr += ran;
                }else{
                    i -=1;
                }
            }
        }
        return numStr;
    }

}