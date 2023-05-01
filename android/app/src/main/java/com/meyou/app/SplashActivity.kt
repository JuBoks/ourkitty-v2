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


//        try{
//            현재 로그인된 정보가 있는지 확인
    //        Toast.makeText(this, "원래 로그인된 사람입니다.", Toast.LENGTH_LONG).show()
//            Handler().postDelayed({
//                    startActivity(Intent(this, LoginActivity::class.java))
//                    finish()
//                }, 2000)
//        }catch (e:Exception){
//                Log.d("SPLASH", "로그인 페이지로")
            Handler().postDelayed({
                startActivity(Intent(this, MainActivity::class.java))
                finish()
            }, 2000)
//        }

    }
}