package com.meyou.app.management

import android.app.AlertDialog
import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.MenuItem
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import androidx.viewpager2.widget.ViewPager2
import com.bumptech.glide.Glide
import com.meyou.app.MainActivity
import com.meyou.app.R
import com.meyou.app.detailDish.tap1.DetailDIshInfo
import com.meyou.app.network.RetrofitInstance
import com.meyou.app.network.management.Data
import com.meyou.app.network.management.ManagementDetailResponse
import com.tbuonomo.viewpagerdotsindicator.DotsIndicator
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class DetailManagementActivity : AppCompatActivity() {

    // 관리 정보를 저장할 데이터 리스트
    private var dataList = mutableListOf<Data>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_detail_management)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        // 이전 활동에서 전달된 managementId를 가져옵니다.
        val managementId = intent.getIntExtra("managementId", -1)

        // API 호출을 위한 서비스 인스턴스를 생성합니다.
        val sharedPreferences = this.getSharedPreferences("user_info", Context.MODE_PRIVATE)
        val accessToken = sharedPreferences?.getString("accessToken", "") ?: ""
        val retrofitInstance = RetrofitInstance(accessToken)
        val detailService = retrofitInstance.getReadDetailManagement()

        // API 호출을 수행합니다.
        val call = detailService.readDetailManagement(managementId)

        call.enqueue(object : Callback<ManagementDetailResponse> {
            override fun onResponse(
                call: Call<ManagementDetailResponse>,
                response: Response<ManagementDetailResponse>
            ) {
                if (response.isSuccessful) {
                    val detailResponse = response.body()
                    detailResponse?.let {
                        dataList.add(it.data)
                        updateUI()
                    }
                } else {
                    Log.e(
                        "DetailManagementActivity",
                        "API 호출이 성공하지 못했습니다: ${response.message()}"
                    )
                }
            }

            override fun onFailure(call: Call<ManagementDetailResponse>, t: Throwable) {
                Log.e("DetailManagementActivity", "API 호출이 실패했습니다: ${t.message}")
            }
        })
        // 댓글 작성 창 및 전송 버튼 찾기
        val commentInput: EditText = findViewById(R.id.comment_input)
        val sendButton: Button = findViewById(R.id.send_button)

        // 서비스 인스턴스를 생성합니다.
        val commentService = retrofitInstance.postManagementComment()

        // 전송 버튼 클릭 리스너 설정
        sendButton.setOnClickListener {
            val managementCommentContent = commentInput.text.toString()
            if (managementCommentContent.isNotBlank()) {
                // 댓글 내용이 비어있지 않으면 API 호출을 수행합니다.
                val call = commentService.createCommentManagement(managementCommentContent, managementId)
                call.enqueue(object : Callback<ManagementDetailResponse> {
                    override fun onResponse(
                        call: Call<ManagementDetailResponse>,
                        response: Response<ManagementDetailResponse>
                    ) {
                        if (response.isSuccessful) {
                            Log.d("Comment", "댓글 작성 성공.")
                            dataList.clear()
                            response.body()?.let {
                                dataList.add(it.data)
                                // UI를 갱신합니다.
                                updateUI()
                            }
                        } else {
                            Log.e("Comment", "댓글 작성 실패: ${response.message()}")
                        }
                    }

                    override fun onFailure(call: Call<ManagementDetailResponse>, t: Throwable) {
                        Log.e("Comment", "API 호출에 실패했습니다: ${t.message}")
                    }
                })

                // 댓글 작성 창을 비웁니다.
                commentInput.text.clear()
            } else {
                Log.d("Comment", "댓글 내용이 비어있습니다.")
            }
        }
        // 수정 버튼
        val editButton: Button = findViewById(R.id.edit)

        editButton.setOnClickListener {
            val intent = Intent(this@DetailManagementActivity, DetailManagementEdit::class.java)

            val detailInfo = dataList[0]
//            intent.putStringArrayListExtra("imageUrls", ArrayList(detailInfo.imageUrls))
            intent.putExtra("userName", detailInfo.client.clientNickname)
            intent.putExtra("userProfileImage", detailInfo.client.clientProfileImagePath)
            intent.putExtra("message", detailInfo.managementContent)

            startActivity(intent)
        }


        val addButton: Button = findViewById(R.id.delete)
        addButton.setOnClickListener {
            // 커스텀 뷰를 inflate합니다.
            val dialogView = LayoutInflater.from(this).inflate(R.layout.custom_dialog_modal, null)

            // TextView에 텍스트를 설정합니다.
            val dialogMessage: TextView = dialogView.findViewById(R.id.dialogMessage)
            dialogMessage.text = "관리 일지를 삭제하시겠습니까?"

            // AlertDialog를 생성합니다.
            val customDialog = AlertDialog.Builder(this)
                .setView(dialogView)
                .show()
            customDialog.window?.setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))

            // 확인 버튼에 대한 클릭 리스너를 설정합니다.
            val dialogConfirmButton: Button = dialogView.findViewById(R.id.dialogConfirmButton)
            dialogConfirmButton.setOnClickListener {
                Log.d("Modal", "삭제완료")
                customDialog.dismiss()
            }

            // 취소 버튼에 대한 클릭 리스너를 설정합니다.
            val dialogCancelButton: Button = dialogView.findViewById(R.id.dialogCancelButton)
            dialogCancelButton.setOnClickListener {
                customDialog.dismiss()
            }
        }
    }

    // 가져온 데이터로 UI 업데이트
    private fun updateUI() {
        val detailInfo = dataList[0]

        // ViewPager2와 DotsIndicator 초기화
        val viewPager: ViewPager2 = findViewById(R.id.view_pager)
        val dotsIndicator: DotsIndicator = findViewById(R.id.dots_indicator)

        // ImageAdapter를 생성하고 ViewPager2에 연결합니다.
        val imageUrls = detailInfo.managementImageList.map { it.imagePath } ?: emptyList()
        val imageAdapter = ImageAdapter(this, imageUrls)
        viewPager.adapter = imageAdapter

        // DotsIndicator와 ViewPager2를 연결합니다.
        dotsIndicator.setViewPager2(viewPager)

        // 레이아웃에 가져온 데이터를 설정합니다.
        findViewById<ImageView>(R.id.userProfileImage).apply {
            Glide.with(this@DetailManagementActivity).load(detailInfo.client.clientProfileImagePath)
                .into(this)
        }
        findViewById<TextView>(R.id.userName).text = detailInfo.client.clientNickname
        findViewById<TextView>(R.id.text).text = detailInfo.managementContent

        // RecyclerView에 CommentAdapter 설정
        val recyclerView: RecyclerView = findViewById(R.id.rv)
        recyclerView.layoutManager = LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false)
        recyclerView.adapter = CommentAdapter(this, detailInfo.managementCommentList ?: emptyList())
    }

    class ImageAdapter(private val context: Context, private val imageUrls: List<String>) :
        RecyclerView.Adapter<ImageAdapter.ImageViewHolder>() {

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ImageViewHolder {
            val view = LayoutInflater.from(parent.context)
                .inflate(R.layout.slide_image_item, parent, false)
            return ImageViewHolder(view)
        }

        override fun onBindViewHolder(holder: ImageViewHolder, position: Int) {
            val imageUrl = imageUrls[position]
            Glide.with(holder.itemView.context).load(imageUrl).into(holder.imageView)
        }

        override fun getItemCount(): Int {
            return imageUrls.size
        }

        inner class ImageViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
            val imageView: ImageView = itemView.findViewById(R.id.image_view)
        }

    }

    // 뒤로가기 활성화
    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            android.R.id.home -> {
                onBackPressed()
                return true
            }
            else -> return super.onOptionsItemSelected(item)
        }
    }

}
