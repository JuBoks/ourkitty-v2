package com.meyou.app.management

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.ImageView
import android.widget.Spinner
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.meyou.app.R
import com.meyou.app.network.RetrofitInstance
import com.meyou.app.network.management.Data
import com.meyou.app.network.management.ManagementResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class ManagementFragment : Fragment() {
    private var dataList = mutableListOf<Data>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }
    override fun onCreateView(

        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_management, container, false)


        val dishSpinner = view.findViewById<Spinner>(R.id.home_spinner)

        // 데이터 배열을 만듭니다.
        val dish =  listOf(Dish(null, "전체"), Dish("1", "미현이네"), Dish("2", "아이유정"), Dish("3", "정호네"))

        // HintAdapter 생성합니다.
        val dishAdapter = ArrayAdapter(requireContext(), android.R.layout.simple_spinner_dropdown_item, dish)

        // 생성한 ArrayAdapter를 Spinner에 설정합니다.
        dishSpinner.adapter = dishAdapter


        // 선택된 dish의 code 값을 가져옵니다.
        val selectedDishCode = dishSpinner.selectedItem as Dish
        dishSpinner.setSelection(0)

        val ManageData = view.findViewById<RecyclerView>(R.id.rv_management)
        val manageAdapter = ManagementAdapter(requireContext(), dataList)
        ManageData.adapter = manageAdapter
        ManageData.layoutManager = LinearLayoutManager(requireContext())

        val sharedPreferences = this.activity?.getSharedPreferences("user_info", Context.MODE_PRIVATE)
        val accessToken = sharedPreferences?.getString("accessToken", "") ?: ""
        val retrofitInstance = RetrofitInstance(accessToken)

        // 힌트를 마지막 항목으로 설정합니다.
        dishSpinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {
                val selectedDish = dishAdapter.getItem(position) // 선택된 Dish 객체를 가져옵니다.
                val selectedDishCode = selectedDish?.code // 선택된 Dish 객체의 code를 가져옵니다.

                // 선택된 Dish의 code를 로그에 출력합니다.
                Log.d("CreateManagementActivity", "Selected dish code: $selectedDishCode")

                // Retrofit 인스턴스를 가져와서
                val service = retrofitInstance.getReadManagement()
                service.readManagement(if (selectedDishCode == null) null else selectedDishCode.toInt()).enqueue(object : Callback<ManagementResponse> {
                    override fun onResponse(call: Call<ManagementResponse>, response: Response<ManagementResponse>) {
                        if (response.isSuccessful) {
                            val managementResponse = response.body()
                            if (managementResponse != null) {
                                dataList.clear()
                                dataList.addAll(managementResponse.data)
                                manageAdapter.notifyDataSetChanged()
                            } else {
                                Log.e("ManagementFragment1", "ManagementResponse is null")
                            }
                        } else {
                            Log.e("ManagementFragment2", "Response not successful. Code: ${response.code()}")
                        }
                    }

                    override fun onFailure(call: Call<ManagementResponse>, t: Throwable) {
                        Log.e("ManagementFragment3", "Error fetching data: ${t.message}", t)
                    }
                })
            }

            override fun onNothingSelected(parent: AdapterView<*>?) {
                // Do nothing
            }
        }

        // 클릭시 CreageManagementActivity 로 이동
        val createFormImageView: ImageView = view.findViewById(R.id.create_form)
        createFormImageView.setOnClickListener {
            val intent = Intent(requireContext(), CreateManagementActivity::class.java)
            startActivity(intent)
        }

        return view
    }
}