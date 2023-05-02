package com.meyou.app

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import android.util.Log
import android.widget.Toast
import com.meyou.app.login.LoginActivity

class SplashActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash)


        // SharedPreferences 인스턴스 가져오기
        val pref = getSharedPreferences("myPref", MODE_PRIVATE)

        // SharedPreferences에서 로그인 정보 가져오기
        val isLoggedIn = pref.getBoolean("isLoggedIn", false)

        // 2초 후에 실행될 코드 설정
        Handler().postDelayed({
            // 로그인 정보가 있으면 MainActivity 실행
            if (isLoggedIn) {
                startActivity(Intent(this, MainActivity::class.java))
            }
            // 로그인 정보가 없으면 LoginActivity 실행
            else {
                startActivity(Intent(this, LoginActivity::class.java))
            }
            // 현재 액티비티 종료
            finish()
        }, 2000)

    }
}