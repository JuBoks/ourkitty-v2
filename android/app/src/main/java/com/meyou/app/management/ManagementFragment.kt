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
    private lateinit var manageAdapter: ManagementAdapter
    private var selectedDishCode: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onResume() {
        super.onResume()
        refreshData()
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val view = inflater.inflate(R.layout.fragment_management, container, false)

        val dishSpinner = view.findViewById<Spinner>(R.id.home_spinner)

        val dish = listOf(Dish(null, "전체"), Dish("1", "미현이네"), Dish("2", "아이유정"), Dish("3", "정호네"))

        val dishAdapter = ArrayAdapter(requireContext(), android.R.layout.simple_spinner_dropdown_item, dish)

        dishSpinner.adapter = dishAdapter

        dishSpinner.setSelection(0)

        val ManageData = view.findViewById<RecyclerView>(R.id.rv_management)
        manageAdapter = ManagementAdapter(requireContext(), dataList)
        ManageData.adapter = manageAdapter
        ManageData.layoutManager = LinearLayoutManager(requireContext())

        val sharedPreferences = this.activity?.getSharedPreferences("user_info", Context.MODE_PRIVATE)
        val accessToken = sharedPreferences?.getString("accessToken", "") ?: ""
        val retrofitInstance = RetrofitInstance(accessToken)

        dishSpinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {
                val selectedDish = dishAdapter.getItem(position) as? Dish
                selectedDishCode = selectedDish?.code

                Log.d("CreateManagementActivity", "Selected dish code: $selectedDishCode")

                refreshData()
            }

            override fun onNothingSelected(parent: AdapterView<*>?) {
                // Do nothing
            }
        }


        val createFormImageView: ImageView = view.findViewById(R.id.create_form)
        createFormImageView.setOnClickListener {
            val intent = Intent(requireContext(), CreateManagementActivity::class.java)
            startActivity(intent)
        }

        return view
    }

    private fun refreshData() {
        val sharedPreferences = this.activity?.getSharedPreferences("user_info", Context.MODE_PRIVATE)
        val accessToken = sharedPreferences?.getString("accessToken", "") ?: ""
        val retrofitInstance = RetrofitInstance(accessToken)

        val service = retrofitInstance.getReadManagement()
        service.readManagement(if (selectedDishCode == null) null else selectedDishCode?.toInt()).enqueue(object : Callback<ManagementResponse> {
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
}
