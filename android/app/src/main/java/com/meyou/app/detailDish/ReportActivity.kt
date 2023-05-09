package com.meyou.app.detailDish

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.MenuItem
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.meyou.app.R

class ReportActivity : AppCompatActivity() {
    private lateinit var recyclerView: RecyclerView
    private val images = mutableListOf<Uri>()

    private val PICK_IMAGE_REQUEST = 1

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_report)

        if (supportActionBar != null) {
            supportActionBar?.setDisplayHomeAsUpEnabled(true)
        }


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

        // ArrayAdapter를 생성합니다.
        val dishAdapter = ArrayAdapter(this, android.R.layout.simple_spinner_dropdown_item, resources.getStringArray(R.array.spinner_dish_items))
        val statusAdapter = ArrayAdapter(this, android.R.layout.simple_spinner_dropdown_item, resources.getStringArray(R.array.spinner_dish_status_items))

        // 생성한 ArrayAdapter를 Spinner에 설정합니다.
        dishSpinner.adapter = dishAdapter
        statusSpinner.adapter = statusAdapter

        // 첫 번째 스피너에 대한 onItemSelectedListener
        dishSpinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(
                parent: AdapterView<*>?,
                view: View?,
                position: Int,
                id: Long
            ) {
                if (position >= 0) {
                    val selectedItem = parent?.getItemAtPosition(position)
                    Log.d("Spinner", "Selected Dish: $selectedItem")
                }
            }

            override fun onNothingSelected(parent: AdapterView<*>?) {
                Log.d("Spinner", "Nothing Selected")
            }
        }

        // 두 번째 스피너에 대한 onItemSelectedListener
        statusSpinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(
                parent: AdapterView<*>?,
                view: View?,
                position: Int,
                id: Long
            ) {
                if (position >= 0) {
                    val selectedItem = parent?.getItemAtPosition(position)
                    Log.d("Spinner", "Selected Status: $selectedItem")
                }
            }

            override fun onNothingSelected(parent: AdapterView<*>?) {
                Log.d("Spinner", "Nothing Selected")
            }
        }
    }


    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if (requestCode == PICK_IMAGE_REQUEST && resultCode == Activity.RESULT_OK && data != null && data.data != null) {
            val selectedImageUri: Uri = data.data!!
            images.add(selectedImageUri)

            recyclerView.adapter?.notifyDataSetChanged()
        }
    }

    class ImageUploadAdapter(
        private val context: Context,
        private val images: List<Uri>
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
