package com.meyou.app.management

import android.app.Activity
import android.app.AlertDialog
import android.content.ContentResolver
import android.content.Context
import android.content.Intent
import android.database.Cursor
import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.net.Uri
import android.os.Bundle
import android.provider.OpenableColumns
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.meyou.app.R
import com.meyou.app.network.RetrofitInstance
import com.meyou.app.network.management.ManagementDetailResponse
import com.meyou.app.network.management.ManagementResponse
import com.meyou.app.network.management.UploadImageData
import okhttp3.MediaType
import okhttp3.MultipartBody
import okhttp3.RequestBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

data class Dish(val code: String?, val name: String){
    override fun toString(): String {
        return name
    }
}

class HintAdapter(context: Context, resource: Int, objects: List<Dish>): ArrayAdapter<Dish>(context, resource, objects) {
    override fun getCount(): Int {
        // 마지막 항목은 힌트로 간주하므로, 실제 항목 수는 전체 길이에서 1을 뺀 값입니다.
        val count = super.getCount()
        return if (count > 0) count - 1 else count
    }
    override fun getView(position: Int, convertView: View?, parent: ViewGroup): View {
        val view = convertView ?: LayoutInflater.from(context).inflate(android.R.layout.simple_spinner_dropdown_item, parent, false)

        val dish = getItem(position) // Spinner의 해당 위치에 있는 Dish 객체를 가져옵니다.

        // Spinner의 각 항목에 표시될 TextView를 찾습니다.
        val textView = view.findViewById<TextView>(android.R.id.text1)

        // TextView에 Dish의 name을 설정합니다.
        textView.text = dish?.name

        return view
    }
    override fun getDropDownView(position: Int, convertView: View?, parent: ViewGroup): View {
        val view = convertView ?: LayoutInflater.from(context).inflate(android.R.layout.simple_spinner_dropdown_item, parent, false)

        val dish = getItem(position) // Spinner의 해당 위치에 있는 Dish 객체를 가져옵니다.

        // 드롭다운 메뉴의 각 항목에 표시될 TextView를 찾습니다.
        val textView = view.findViewById<TextView>(android.R.id.text1)

        // TextView에 Dish의 name을 설정합니다.
        textView.text = dish?.name

        return view
    }
}


class CreateManagementActivity : AppCompatActivity() {

    private lateinit var recyclerView: RecyclerView
    private val images = mutableListOf<String>()

    private val PICK_IMAGE_REQUEST = 1

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_create_management)

        recyclerView = findViewById(R.id.recyclerView)
        val selectImageButton: Button = findViewById(R.id.select_image)

        val imageUploadAdapter = ImageUploadAdapter(this, images)
        recyclerView.adapter = imageUploadAdapter

        selectImageButton.setOnClickListener {
            val intent = Intent()
            intent.type = "image/*"
            intent.action = Intent.ACTION_GET_CONTENT
            startActivityForResult(Intent.createChooser(intent, "Select Picture"), PICK_IMAGE_REQUEST)
        }

        val dishSpinner = findViewById<Spinner>(R.id.dish_spinner)
        val statusSpinner = findViewById<Spinner>(R.id.status_spinner)

        // 데이터 배열을 만듭니다.
        val dish =  listOf( Dish("1", "미현이네"), Dish("2", "아이유정"), Dish("3", "정호네"),Dish("0", "전체"))
        val dishState = listOf( Dish("0030001", "정상"), Dish("0030002", "더러움"), Dish("0030003", "파손"), Dish("0030004", "분실"),Dish("0", "상태"))

        // ArrayAdapter를 생성합니다.
        val dishAdapter = HintAdapter(this, android.R.layout.simple_spinner_dropdown_item, dish)
        val statusAdapter = HintAdapter(this, android.R.layout.simple_spinner_dropdown_item, dishState)

        // 생성한 ArrayAdapter를 Spinner에 설정합니다.
        dishSpinner.adapter = dishAdapter
        statusSpinner.adapter = statusAdapter

        // 힌트를 마지막 항목으로 설정합니다.
        dishSpinner.setSelection(dishAdapter.count)
        statusSpinner.setSelection(statusAdapter.count)
        dishSpinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {
                val selectedDish = dishAdapter.getItem(position) // 선택된 Dish 객체를 가져옵니다.
                val selectedDishCode = selectedDish?.code // 선택된 Dish 객체의 code를 가져옵니다.

                // 선택된 Dish의 code를 로그에 출력합니다.
                Log.d("CreateManagementActivity", "Selected dish code: $selectedDishCode")
            }

            override fun onNothingSelected(parent: AdapterView<*>?) {
                // Do nothing
            }
        }

        statusSpinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {
                val selectedStatus = statusAdapter.getItem(position) // 선택된 Status 객체를 가져옵니다.
                val selectedStatusCode = selectedStatus?.code // 선택된 Status 객체의 code를 가져옵니다.

                // 선택된 Status의 code를 로그에 출력합니다.
                Log.d("CreateManagementActivity", "Selected status code: $selectedStatusCode")
            }

            override fun onNothingSelected(parent: AdapterView<*>?) {
                // Do nothing
            }
        }

        // 등록 버튼 눌리면 뜨는 모달
        val addButton: Button = findViewById(R.id.add)
        addButton.setOnClickListener {
            // 커스텀 뷰를 inflate합니다.
            val dialogView = LayoutInflater.from(this).inflate(R.layout.custom_dialog_modal, null)

            // TextView에 텍스트를 설정합니다.
            val dialogMessage: TextView = dialogView.findViewById(R.id.dialogMessage)
            dialogMessage.text = "작성된 글을 등록하시겠습니까?"

            // AlertDialog를 생성합니다.
            val customDialog = AlertDialog.Builder(this)
                .setView(dialogView)
                .show()
            customDialog.window?.setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))

            // 확인 버튼에 대한 클릭 리스너를 설정합니다.
            val dialogConfirmButton: Button = dialogView.findViewById(R.id.dialogConfirmButton)
            dialogConfirmButton.setOnClickListener {
                // text_upload EditText를 찾아서 그 텍스트를 가져옵니다.
                val textUpload: EditText = findViewById(R.id.text_upload)
                val uploadedText = textUpload.text.toString()

                // 선택된 dish와 status의 code 값을 가져옵니다.
                val selectedDishCode = dishSpinner.selectedItem as Dish
                val selectedStatusCode = statusSpinner.selectedItem as Dish

                // files는  api호출로 받아온 data를 저장한 list
                val files = images

                val sharedPreferences = this.getSharedPreferences("user_info", Context.MODE_PRIVATE)
                val accessToken = sharedPreferences?.getString("accessToken", "") ?: ""

                // Retrofit 인스턴스를 생성합니다.
                val retrofitInstance = RetrofitInstance(accessToken)
                // createManagement API를 호출하기 위한 Retrofit 서비스 인스턴스 생성
                val createManagementService = retrofitInstance.postCreateManagement()

                    // API를 호출합니다.
                    val createCall = createManagementService.createManagement(
                        selectedDishCode.code?.toInt(), selectedStatusCode.code.toString(), files, uploadedText
                    )
                    createCall.enqueue(object : Callback<ManagementDetailResponse> {
                        override fun onResponse(call: Call<ManagementDetailResponse>, response: Response<ManagementDetailResponse>) {
                            if (response.isSuccessful) {
                                Log.d("API Call", "Success")
                                Toast.makeText(getApplicationContext(), "글 작성 완료", Toast.LENGTH_SHORT).show();
                                finish()
                            } else {
                                Log.d("API Call", "Failed: ${response.errorBody()}")
                                Toast.makeText(getApplicationContext(), "글 작성 실패", Toast.LENGTH_SHORT).show();
                            }
                        }

                        override fun onFailure(call: Call<ManagementDetailResponse>, t: Throwable) {
                            Log.d("API Call", "Error: ${t.message}")
                        }
                    })

                customDialog.dismiss()
            }

            // 취소 버튼에 대한 클릭 리스너를 설정합니다.
            val dialogCancelButton: Button = dialogView.findViewById(R.id.dialogCancelButton)
            dialogCancelButton.setOnClickListener {
                customDialog.dismiss()
            }
        }
    }

    fun createPartFromFile(uri: Uri, contentResolver: ContentResolver): MultipartBody.Part {
        val inputStream = contentResolver.openInputStream(uri)
        val byteArray = inputStream?.readBytes()
        val requestFile = byteArray?.let { RequestBody.create(MediaType.parse("multipart/form-data"), it) }

        val cursor: Cursor? = contentResolver.query(uri, null, null, null, null, null)
        val name = cursor?.let {
            it.moveToFirst()
            val nameIndex = it.getColumnIndex(OpenableColumns.DISPLAY_NAME)
            it.getString(nameIndex)
        }
        cursor?.close()

        return MultipartBody.Part.createFormData("file", name, requestFile)
    }
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if (requestCode == PICK_IMAGE_REQUEST && resultCode == Activity.RESULT_OK && data != null && data.data != null) {
            val selectedImageUri: Uri = data.data!!

            val filePart = createPartFromFile(selectedImageUri, contentResolver)
            val sharedPreferences = this.getSharedPreferences("user_info", Context.MODE_PRIVATE)
            val accessToken = sharedPreferences?.getString("accessToken", "") ?: ""

            // Retrofit 인스턴스를 생성합니다.
            val retrofitInstance = RetrofitInstance(accessToken)

            val uploadImageService = retrofitInstance.postUploadImage()

            val uploadCall = uploadImageService.image(listOf(filePart))
            uploadCall.enqueue(object : Callback<UploadImageData> {
                override fun onResponse(call: Call<UploadImageData>, response: Response<UploadImageData>) {
                    if (response.isSuccessful) {
                        val imageUrl = response.body()?.data
                        if (imageUrl != null) {
                            images.add(imageUrl) // imageUrl이 String이므로 이제 이 부분에 오류가 없어야 합니다.
                            recyclerView.adapter?.notifyDataSetChanged()
                        } else {
                            Log.d("API Call", "No data received")
                        }
                    } else {
                        Log.d("API Call", "Failed: ${response.errorBody()}")
                    }
                }

                override fun onFailure(call: Call<UploadImageData>, t: Throwable) {
                    Log.d("API Call", "Error: ${t.message}")
                }
            })
        }
    }
    class ImageUploadAdapter(
        private val context: Context,
        private val images: List<String>
    ) : RecyclerView.Adapter<ImageUploadAdapter.ViewHolder>() {

        inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
            val imageView: ImageView = itemView.findViewById(R.id.image_item)
        }

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
            val view = LayoutInflater.from(context).inflate(R.layout.image_upload_item, parent, false)
            return ViewHolder(view)
        }

        override fun onBindViewHolder(holder: ViewHolder, position: Int) {
            Glide.with(context)
                .load(images[position])
                .into(holder.imageView)
        }

        override fun getItemCount(): Int {
            return images.size
        }
    }
}