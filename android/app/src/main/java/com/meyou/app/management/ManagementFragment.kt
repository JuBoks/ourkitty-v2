package com.meyou.app.management

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

class ManagementFragment : Fragment() {
    private var dataList = mutableListOf<ManagementInfo>()

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
        val dish =  listOf( Dish("1", "미현이네"), Dish("2", "아이유정"), Dish("3", "정호네"),Dish("0", "전체"))

        // HintAdapter 생성합니다.
        val dishAdapter = HintAdapter(requireContext(), android.R.layout.simple_spinner_dropdown_item, dish)

        // 생성한 ArrayAdapter를 Spinner에 설정합니다.
        dishSpinner.adapter = dishAdapter


        // 힌트를 마지막 항목으로 설정합니다.
        dishSpinner.setSelection(dishAdapter.count)
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


        val ManageData = view.findViewById<RecyclerView>(R.id.rv_management)
        val manageAdapter = ManagementAdapter(requireContext(), dataList)
        ManageData.adapter = manageAdapter
        ManageData.layoutManager = LinearLayoutManager(requireContext())

        // 클릭시 CreageManagementActivity 로 이동
        val createFormImageView: ImageView = view.findViewById(R.id.create_form)
        createFormImageView.setOnClickListener {
            val intent = Intent(requireContext(), CreateManagementActivity::class.java)
            startActivity(intent)
        }

        return view
    }


}