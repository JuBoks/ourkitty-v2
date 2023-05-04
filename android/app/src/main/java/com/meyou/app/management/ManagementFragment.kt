package com.meyou.app.management

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Spinner
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.meyou.app.R
import com.meyou.app.main.ContentsMyDishList

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

        val spinner = view.findViewById<Spinner>(R.id.home_spinner)

        // 데이터 배열을 만듭니다.
        val data = arrayOf("전체","아이유정", "미현이네", "정호네")

        // ArrayAdapter를 생성합니다.
        val adapter = ArrayAdapter(requireContext(), android.R.layout.simple_spinner_dropdown_item, data)

        // 생성한 ArrayAdapter를 Spinner에 설정합니다.
        spinner.adapter = adapter

        spinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(
                parent: AdapterView<*>?,
                view: View?,
                position: Int,
                id: Long
            ) {
                val selectedItem = parent?.getItemAtPosition(position)
                Log.d("Spinner", "Selected Item: $selectedItem")
            }

            override fun onNothingSelected(parent: AdapterView<*>?) {
                Log.d("Spinner", "Nothing Selected")
            }
        }

        dataList.add(
            ManagementInfo(
                listOf("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUiNRqrAJKbWIZ-1Nl8tygN61EqmpRuveYzQ&usqp=CAU","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUiNRqrAJKbWIZ-1Nl8tygN61EqmpRuveYzQ&usqp=CAU"),
                "2023.04.01",
                "이미현",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUiNRqrAJKbWIZ-1Nl8tygN61EqmpRuveYzQ&usqp=CAU",
                "강서구 명지",
                "한마리가 아파보여서 약을 먹였습니다.",
                1,
                true
            )
        )
        dataList.add(
            ManagementInfo(
                listOf("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUiNRqrAJKbWIZ-1Nl8tygN61EqmpRuveYzQ&usqp=CAU","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUiNRqrAJKbWIZ-1Nl8tygN61EqmpRuveYzQ&usqp=CAU","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUiNRqrAJKbWIZ-1Nl8tygN61EqmpRuveYzQ&usqp=CAU"),
                "2023.04.01",
                "이미현",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUiNRqrAJKbWIZ-1Nl8tygN61EqmpRuveYzQ&usqp=CAU",
                "강서구 명지",
                "한마리가 아파보여서 약을 먹였습니다.",
                2,
                false
            )
        )
        val ManageData = view.findViewById<RecyclerView>(R.id.rv_management)
        val manageAdapter = ManagementAdapter(requireContext(), dataList)
        ManageData.adapter = manageAdapter
        ManageData.layoutManager = LinearLayoutManager(requireContext())

        return view
    }


}