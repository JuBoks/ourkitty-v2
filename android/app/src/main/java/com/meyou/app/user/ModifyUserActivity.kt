package com.meyou.app.user

import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.Environment
import android.provider.MediaStore
import android.text.TextUtils
import android.util.Log
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.bumptech.glide.Glide
import com.meyou.app.R
import com.meyou.app.network.RetrofitInstance
import okhttp3.MediaType
import okhttp3.MultipartBody
import okhttp3.RequestBody
import okhttp3.ResponseBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.io.File


class ModifyUserActivity : AppCompatActivity() {
    private lateinit var getResult: ActivityResultLauncher<Intent>

    private lateinit var modifyButton: Button // 수정 완료
    private lateinit var cancelButton: Button // 수정 취소
    private lateinit var profileImage: ImageView // 프로필
    private lateinit var profileNickname: TextView // 닉네임
    private lateinit var profilePhone: TextView // 연락처
    private lateinit var profileEmail: TextView // 이메일
    private lateinit var profileAddress: TextView // 거주지
    private lateinit var profileDishes: TextView // 담당 냥그릇
    private var mydish: List<Dish> = listOf()
    private var profileName = ""
    private var profileImageUrl = ""
    private var clientId = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_modify_user)

        getResult = registerForActivityResult(ActivityResultContracts.StartActivityForResult()) {
            if (it.resultCode == RESULT_OK) {
                var filePath = getRealPathFromURI(it.data?.data!!)
                Log.d("FILEPATH: ", "${filePath}")
                val file = File(filePath)
                val requestFile = RequestBody.create(MediaType.parse("images/*"), file)
                val body: MultipartBody.Part = MultipartBody.Part.createFormData("file", "file", requestFile)

                // API 요청
                val sharedPreferences = this?.getSharedPreferences("user_info", Context.MODE_PRIVATE)
                val accessToken = sharedPreferences?.getString("accessToken", "") ?: ""
                val retrofitInstance = RetrofitInstance(accessToken)

                val service = retrofitInstance.uploadSingleImage()

                service.uploadSingleImage(body).enqueue(object : Callback<ResultImage> {
                    override fun onResponse(
                        call: Call<ResultImage>,
                        response: Response<ResultImage>
                    ) {
                        if (response.isSuccessful) {
                            val img = response.body()?.data

                            if (img != null) {
                                profileImageUrl = img
                                Glide.with(this@ModifyUserActivity).load(img).into(profileImage)
                            }
                        }
                    }
                    override fun onFailure(call: Call<ResultImage>, t: Throwable) {

                    }
                })
            }
        }

        profileImage = findViewById(R.id.profile_image)
        profileNickname = findViewById(R.id.profile_nickname)
        profilePhone = findViewById(R.id.profile_phone)
        profileEmail = findViewById(R.id.profile_email)
        profileAddress = findViewById(R.id.profile_address)
        profileDishes = findViewById(R.id.profile_dishes)

        val sharedPreferences = this?.getSharedPreferences("user_info", Context.MODE_PRIVATE)
        val accessToken = sharedPreferences?.getString("accessToken", "") ?: ""
        val retrofitInstance = RetrofitInstance(accessToken)

        val service = retrofitInstance.getUserList()

        service.getUserList().enqueue(object : Callback<ContentsUserInfo> {
            override fun onResponse(
                call: Call<ContentsUserInfo>,
                response: Response<ContentsUserInfo>
            ) {
                if (response.isSuccessful) {
                    val info = response.body()?.data

                    if (info != null) {

                        clientId = info.clientId

                        val imageUrl = info.clientProfileImagePath
                        if (imageUrl != "") {
                            Glide.with(this@ModifyUserActivity).load(imageUrl).into(profileImage)
                        }
                        profileName = info.clientName
                        profileNickname.text = info.clientNickname
                        profilePhone.text = info.clientPhone
                        profileEmail.text = info.clientEmail
                        profileAddress.text = info.clientAddress
                        mydish = info.dishList
                        val myDishList = mutableListOf<String>()
                        for (dish in info.dishList) {
                            myDishList.add(dish.dishName)
                        }
                        // 리스트 내부 아이템만 표시
                        profileDishes.text = myDishList.joinToString(",","","",-1)
                    }
                } else {

                }

            }
            override fun onFailure(call: Call<ContentsUserInfo>, t: Throwable) {
            }
        })

        // 프로필 이미지 수정
        profileImage.setOnClickListener{
            Log.d("TEST", "PROFILE")

            // 권한 설정
            // 쓰기 권한
            var writePermission = ContextCompat.checkSelfPermission(this, android.Manifest.permission.WRITE_EXTERNAL_STORAGE)
            // 읽기 권한
            var readPermission = ContextCompat.checkSelfPermission(this, android.Manifest.permission.READ_EXTERNAL_STORAGE)

            // 권한 설정
            if (writePermission == PackageManager.PERMISSION_DENIED || readPermission == PackageManager.PERMISSION_DENIED) {
                ActivityCompat.requestPermissions(
                    this,
                    arrayOf(android.Manifest.permission.WRITE_EXTERNAL_STORAGE, android.Manifest.permission.READ_EXTERNAL_STORAGE), 1
                )
            } else {
                var state = Environment.getExternalStorageState()

                // 갤러리를 열어 파일 선택
                if (TextUtils.equals(state, Environment.MEDIA_MOUNTED)) {
                    val intent = Intent(Intent.ACTION_PICK)
                    intent.type = "image/*"
                    getResult.launch(intent)
                }
            }
        }
        // 프로필 수정 완료

        modifyButton = findViewById(R.id.profile_modify)
        cancelButton = findViewById(R.id.modify_cancel)

        // 회원정보 수정 완료 요청
        modifyButton.setOnClickListener {
            val address = RequestBody.create(MediaType.parse("text/plain"), "${profileAddress}")
            val email = RequestBody.create(MediaType.parse("text/plain"), "${profileEmail}")
            val name = RequestBody.create(MediaType.parse("text/plain"), "${profileName}")
            val  nickname = RequestBody.create(MediaType.parse("text/plain"), "${profileNickname}")
            val password = RequestBody.create(MediaType.parse("text/plain"), "password")
            val phone = RequestBody.create(MediaType.parse("text/plain"), "${profilePhone}")
            val file = RequestBody.create(MediaType.parse("text/plain"), "${profileImageUrl}")

            val requestMap = HashMap<String, RequestBody>()
            requestMap["clientAddress"] = address
            requestMap["clientEmail"] = email
            requestMap["clientName"] = name
            requestMap["clientNickname"] =nickname
            requestMap["clientPassword"] = password
            requestMap["clientPhone"] = phone
            requestMap["file"] = file

            val sharedPreferences = this?.getSharedPreferences("user_info", Context.MODE_PRIVATE)
            val accessToken = sharedPreferences?.getString("accessToken", "") ?: ""
            val retrofitInstance = RetrofitInstance(accessToken)

            val service = retrofitInstance.modifyProfile()


            // 프로필 페이지로 이동
            val intent = Intent(this, UserFragment::class.java)
            startActivity(intent)
        }

        // 수정 취소
        cancelButton.setOnClickListener {
            // 프로필 페이지로 이동
            val intent = Intent(this, UserFragment::class.java)
            startActivity(intent)
        }

    }

    private fun getRealPathFromURI(uri: Uri): String {
        val buildName = Build.MANUFACTURER
        if (buildName.equals("Xiaomi")) {
            return uri.path.toString()
        }

        var columnIndex = 0
        var proj = arrayOf(MediaStore.Images.Media.DATA)
        var cursor = contentResolver.query(uri, proj, null, null, null)

        if (cursor!!.moveToFirst()) {
            columnIndex = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA)
        }

        return cursor.getString(columnIndex)
    }
}