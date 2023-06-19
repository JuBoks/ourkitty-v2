package com.meyou.app.management

import android.app.AlertDialog
import android.content.Context
import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.util.Log

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.meyou.app.R
import com.meyou.app.network_API.RetrofitInstance
import com.meyou.app.network_API.management.ManagementComment
import com.meyou.app.network_API.management.UploadImageData
import com.meyou.app.user.ContentsUserInfo
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class CommentAdapter(private val context: Context, private val comments: List<ManagementComment>, private val managementId: Int) :
    RecyclerView.Adapter<CommentAdapter.CommentViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CommentViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.fragment_comment_adapter, parent, false)
        return CommentViewHolder(view)
    }

    override fun onBindViewHolder(holder: CommentViewHolder, position: Int) {
        val comment = comments[position]

        val sharedPreferences = context.getSharedPreferences("user_info", Context.MODE_PRIVATE)
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
                        val clientId = info.clientId

                        // 로그인한 사용자의 clientId와 댓글 작성자의 clientId가 일치하면 삭제 버튼을 보여줍니다.
                        if(clientId == comment.client.clientId) {
                            holder.delete.visibility = View.VISIBLE
                        } else {
                            holder.delete.visibility = View.GONE
                        }
                    }
                }
            }
            override fun onFailure(call: Call<ContentsUserInfo>, t: Throwable) {
            }
        })



        Glide.with(holder.itemView.context).load(comment.client.clientProfileImagePath).into(holder.userProfileImage)
        holder.userName.text = comment.client.clientNickname
        holder.date.text = comment.updatedDate
        holder.comment.text = comment.managementCommentContent
        val managementCommentId = comment.managementCommentId

        holder.delete.setOnClickListener {
            // 커스텀 뷰를 inflate
            val dialogView = LayoutInflater.from(context).inflate(R.layout.custom_dialog_modal, null)

            // TextView에 텍스트를 설정
            val dialogMessage: TextView = dialogView.findViewById(R.id.dialogMessage)
            dialogMessage.text = "댓글을 삭제하시겠습니까?"

            // AlertDialog를 생성
            val customDialog = AlertDialog.Builder(context)
                .setView(dialogView)
                .show()
            customDialog.window?.setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))

            // 확인 버튼에 대한 클릭 리스너를 설정
            val dialogConfirmButton: Button = dialogView.findViewById(R.id.dialogConfirmButton)
            dialogConfirmButton.setOnClickListener {
                // API 호출을 위한 서비스 인스턴스를 생성합니다.
                val sharedPreferences = context.getSharedPreferences("user_info", Context.MODE_PRIVATE)
                val accessToken = sharedPreferences?.getString("accessToken", "") ?: ""
                val retrofitInstance = RetrofitInstance(accessToken)
                val deleteService = retrofitInstance.deleteManagementComment()

                // API 호출을 수행합니다.
                val call = deleteService.deleteCommentManagement(managementId, managementCommentId)
                call.enqueue(object : Callback<UploadImageData> {
                    override fun onResponse(
                        call: Call<UploadImageData>,
                        response: Response<UploadImageData>
                    ) {
                        if (response.isSuccessful) {
                            Log.d("CommentDelete", "댓글 삭제 성공")
                            // UI 업데이트 어케하노..
                        } else {
                            Log.e("CommentDelete", "댓글 삭제 실패: ${response.message()}")
                        }
                    }

                    override fun onFailure(call: Call<UploadImageData>, t: Throwable) {
                        Log.e("CommentDelete", "API 호출에 실패했습니다: ${t.message}")
                    }
                })

                customDialog.dismiss()
            }

            // 취소 버튼에 대한 클릭 리스너를 설정
            val dialogCancelButton: Button = dialogView.findViewById(R.id.dialogCancelButton)
            dialogCancelButton.setOnClickListener {
                customDialog.dismiss()
            }
        }
    }

    override fun getItemCount(): Int {
        return comments.size
    }

    inner class CommentViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val userProfileImage: ImageView = itemView.findViewById(R.id.userProfileImage)
        val userName: TextView = itemView.findViewById(R.id.userName)
        val date: TextView = itemView.findViewById(R.id.date)
        val comment: TextView = itemView.findViewById(R.id.comment)
        val delete: Button = itemView.findViewById(R.id.delete)
    }
}