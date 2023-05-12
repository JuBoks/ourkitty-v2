package com.meyou.app.user

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import com.bumptech.glide.Glide
import com.meyou.app.R
import com.meyou.app.login.LoginActivity
import com.meyou.app.network.RetrofitInstance
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class UserFragment : Fragment() {
    private lateinit var profileImage: ImageView // 프로필
    private lateinit var profileNickname: TextView // 닉네임
    private lateinit var profilePhone: TextView // 연락처
    private lateinit var profileEmail: TextView // 이메일
    private lateinit var profileAddress: TextView // 거주지
    private lateinit var profileDishes: TextView // 담당 냥그릇
    private var clientId = 0
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        profileImage = view.findViewById(R.id.profile_image)
        profileNickname = view.findViewById(R.id.profile_nickname)
        profilePhone = view.findViewById(R.id.profile_phone)
        profileEmail = view.findViewById(R.id.profile_email)
        profileAddress = view.findViewById(R.id.profile_address)
        profileDishes = view.findViewById(R.id.profile_dishes)

        val sharedPreferences = this.activity?.getSharedPreferences("user_info", Context.MODE_PRIVATE)
        val accessToken = sharedPreferences?.getString("accessToken", "") ?: ""
        val retrofitInstance = RetrofitInstance(accessToken)

        val service = retrofitInstance.getUserList()

        service.getUserList().enqueue(object : Callback<ContentsUserInfo> {
            override fun onResponse(
                call: Call<ContentsUserInfo>,
                response: Response<ContentsUserInfo>
            ) {

                val info = response.body()?.data
                if (info != null) {

                    clientId = info.clientId

                    val imageUrl = info.clientProfileImagePath
                    if (imageUrl != "") {
                        Glide.with(view).load(imageUrl).into(profileImage)
                    }
                    profileNickname.text = info.clientNickname
                    profilePhone.text = info.clientPhone
                    profileEmail.text = info.clientEmail
                    profileAddress.text = info.clientAddress
                    val myDishList = mutableListOf<String>()
                    for (dish in info.dishList) {
                        myDishList.add(dish.dishName)
                    }
                    // 리스트 내부 아이템만 표시
                    profileDishes.text = myDishList.joinToString(",","","",-1)
                }
            }

            override fun onFailure(call: Call<ContentsUserInfo>, t: Throwable) {
            }
        })
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_user, container, false)

        val logoutButton = view.findViewById<TextView>(R.id.logout)
        val modifyButton = view.findViewById<Button>(R.id.profile_modify)
        val deleteButton = view.findViewById<Button>(R.id.profile_delete)

        // 로그아웃
        logoutButton.setOnClickListener {
            val sharedPreferences = requireActivity().getSharedPreferences("user_info", Context.MODE_PRIVATE)
            val editor = sharedPreferences.edit()

            editor.clear()
            editor.commit()
            val intent = Intent(activity, LoginActivity::class.java)
            startActivity(intent)
            activity?.finish()
        }
        modifyButton.setOnClickListener {  }
        deleteButton.setOnClickListener {

            val sharedPreferences = requireActivity().getSharedPreferences("user_info", Context.MODE_PRIVATE)
            val accessToken = sharedPreferences?.getString("accessToken", "") ?: ""
            val retrofitInstance = RetrofitInstance(accessToken)
            val editor = sharedPreferences.edit()

            val service = retrofitInstance.deleteUser()

            service.deleteUser(clientId).enqueue(object : Callback<DeleteRequest> {
                override fun onResponse(
                    call: Call<DeleteRequest>,
                    response: Response<DeleteRequest>
                ) {
                    Log.d("SUCCESS", "!!!")
                    val res = response.body()?.data
                    if (res != null) {
                        if (response.body()?.data == true) {
                            Toast.makeText(activity, "탈퇴요청 처리되었습니다.", Toast.LENGTH_SHORT)
                            editor.clear()
                            editor.commit()
                            Log.d("TOKEN: ", "${sharedPreferences.getString("accessToken", "")}")
                            val intent = Intent(activity, LoginActivity::class.java)
                            startActivity(intent)
                            activity?.finish()
                        } else {
                            Toast.makeText(activity, "탈퇴 요청 중 오류가 발생했습니다..", Toast.LENGTH_SHORT)
                        }
                    }


                }

                override fun onFailure(call: Call<DeleteRequest>, t: Throwable) {
                }
            })

        }

        return view
    }



}