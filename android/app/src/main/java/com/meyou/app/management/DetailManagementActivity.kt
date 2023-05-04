package com.meyou.app.management

import android.content.Context
import android.content.Intent
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
import com.tbuonomo.viewpagerdotsindicator.DotsIndicator

class DetailManagementActivity : AppCompatActivity() {
    private var dataList = mutableListOf<DetailManagementInfo>()

    override fun onCreate(savedInstanceState: Bundle?) {

        dataList.add(
            DetailManagementInfo(
                listOf("https://dummyimage.com/600x400/000/fff","https://dummyimage.com/600x400/111/fff", "https://dummyimage.com/600x400/222/fff"),
                "홍길동",
                "https://dummyimage.com/100x100/000/fff",
                "서울시 강남구",
                "오늘 하루도 힘내세요!",
                listOf(
                    UserComment( "https://dummyimage.com/100x100/333/fff",
                        "김철수",
                        " 말씀대로입니다!",
                         "2022-05-03 14:32:01"),
                    UserComment("https://dummyimage.com/100x100/444/fff",
                         "이영희",
                         "감사합니다!",
                        "2022-05-02 09:15:42")
                )
            )
        )


        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_detail_management)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)


        // 클릭시 넘어온 managementId
        val managementId: String? = intent.getStringExtra("managementId")

        // ViewPager2와 DotsIndicator 초기화
        val viewPager: ViewPager2 = findViewById(R.id.view_pager)
        val dotsIndicator: DotsIndicator = findViewById(R.id.dots_indicator)

        // ImageAdapter를 생성하고 ViewPager2에 연결합니다.
        val imageUrls = dataList[0].imageUrls ?: emptyList()
        val imageAdapter = ImageAdapter(this, imageUrls)
        viewPager.adapter = imageAdapter

        // DotsIndicator와 ViewPager2를 연결합니다.
        dotsIndicator.setViewPager2(viewPager)


        // 더미 데이터를 레이아웃에 설정
        val detailInfo = dataList[0]

        findViewById<ImageView>(R.id.userProfileImage).apply {
            Glide.with(this@DetailManagementActivity).load(detailInfo.userProfileImage).into(this)
        }

        findViewById<TextView>(R.id.userName).text = detailInfo.userName
        findViewById<TextView>(R.id.text).text = detailInfo.message

        // RecyclerView에 CommentAdapter 설정
        val recyclerView: RecyclerView = findViewById(R.id.rv)
        recyclerView.layoutManager = LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false)
        recyclerView.adapter = CommentAdapter(this, detailInfo.comments)

        // 댓글 작성 창 및 전송 버튼 찾기
        val commentInput: EditText = findViewById(R.id.comment_input)
        val sendButton: Button = findViewById(R.id.send_button)

        // 전송 버튼 클릭 리스너 설정
        sendButton.setOnClickListener {
            val commentText = commentInput.text.toString()
            Log.d("Comment", commentText)
            commentInput.text.clear()
        }

        // 수정 버튼
        val editButton: Button = findViewById(R.id.edit)

        editButton.setOnClickListener {
            val intent = Intent(this@DetailManagementActivity, DetailManagementEdit::class.java)

            val detailInfo = dataList[0]
            intent.putStringArrayListExtra("imageUrls", ArrayList(detailInfo.imageUrls))
            intent.putExtra("userName", detailInfo.userName)
            intent.putExtra("userProfileImage", detailInfo.userProfileImage)
            intent.putExtra("message", detailInfo.message)

            startActivity(intent)
        }
    }

    class ImageAdapter(private val context: Context, private val imageUrls: List<String>) : RecyclerView.Adapter<ImageAdapter.ImageViewHolder>() {

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ImageViewHolder {
            val view = LayoutInflater.from(parent.context).inflate(R.layout.slide_image_item, parent, false)
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