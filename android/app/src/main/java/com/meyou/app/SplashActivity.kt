package com.meyou.app

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import android.util.Log
import com.meyou.app.login.LoginActivity
import com.meyou.app.main.ContentsMyDishList
import com.meyou.app.network_API.RetrofitInstance
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class SplashActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash)

        // SharedPreferences 인스턴스 가져오기
        val pref = getSharedPreferences("user_info", MODE_PRIVATE)
        val accessToken = pref?.getString("accessToken", "") ?: ""
        val retrofitInstance = RetrofitInstance(accessToken)

        val service = retrofitInstance.getDishList()

        val mActionBar = supportActionBar
        mActionBar!!.hide()

        // 2초 후에 실행될 코드 설정
        Handler().postDelayed({
            service.getDishes().enqueue(object : Callback<ContentsMyDishList> {
                // 응답이 성공적으로 왔을 때
                override fun onResponse(call: Call<ContentsMyDishList>, response: Response<ContentsMyDishList>) {
                    try {
                        if (response.isSuccessful) {
                            Log.d("accessToken", accessToken)
                            startActivity(Intent(this@SplashActivity, MainActivity::class.java))
                        } else {
                            throw Exception("Response is not successful")
                        }
                    } catch (e: Exception) {
//                        startActivity(Intent(this@SplashActivity, MainActivity::class.java))

                        // Log exception e
                        startActivity(Intent(this@SplashActivity, LoginActivity::class.java))
                    }
                }

                // 요청이 실패했을 때
                override fun onFailure(call: Call<ContentsMyDishList>, t: Throwable) {
//                    startActivity(Intent(this@SplashActivity, MainActivity::class.java))
                    startActivity(Intent(this@SplashActivity, LoginActivity::class.java))
                }
            })
            // 현재 액티비티 종료
            finish()
        }, 2000)


    }
}