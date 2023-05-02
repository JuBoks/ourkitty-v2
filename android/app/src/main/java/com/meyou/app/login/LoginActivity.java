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
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import android.Manifest;

import com.meyou.app.MainActivity;
import com.meyou.app.R;

import java.util.Random;

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

        inputPhoneNum = findViewById(R.id.input_phone_num);
        sendSMSBt = findViewById(R.id.send_sms_button);

        inputCheckNum = findViewById(R.id.input_check_num);
        checkBt = findViewById(R.id.check_button);
        // SharedPreferences 초기화
        pref = getPreferences(MODE_PRIVATE);
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
                // back으로 inputPhoneNum 보내서 등록된 캣맘인지 확인하기
//                if(back에서 받아온 값이 true면)){
                    // 클릭시 발생하는 이벤트
                    checkNum = numberGen(4,1);

                    editor.putString("checkNum", checkNum);
                    editor.commit();

                    sendSMS(inputPhoneNum.getText().toString(), "인증번호 : " + checkNum);
//                }else{
//                    Toast.makeText(getApplicationContext(), "인증되지 않은 캣맘입니다.", Toast.LENGTH_SHORT).show();
//                }

            }
        });

        // 인증번호 체크하는 버튼
        checkBt.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                if(pref.getString("checkNum", "").equals(inputCheckNum.getText().toString())){
                    // 로그인 상태를 저장
                    SharedPreferences.Editor editor = pref.edit();
                    editor.putBoolean("isLoggedIn", true);
                    editor.apply();

                    Toast.makeText(getApplicationContext(), "인증 완료 되었습니다.", Toast.LENGTH_SHORT).show();
                    Intent intent = new Intent(LoginActivity.this, MainActivity.class);
                    startActivity(intent);
                    finish();
                }else{
                    Toast.makeText(getApplicationContext(), "인증번호가 일치하지 않습니다.", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }




    // SMS발송 기능
    public void sendSMS(String phoneNumber, String message)
    {
        PendingIntent pi = PendingIntent.getActivity(this, 0,
                new Intent(this, LoginActivity.class),0);

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