import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { getDishList } from "../../apis/api/dish";

interface detailData {
  createdData: string;
  dishAddress: string;
  dishCatCount: number;
  dishId: number;
  dishLat: number;
  dishLong: number;
  dishName: string;
  dishProfileImagePath: string;
  dishSerialNum: string;
  dishTnrCount: number;
  dishWeight: number;
  isDeleted: boolean;
  locationCode: string;
  updatedDate: string;
}

export default function MyDishButtons({ buttons, setButtons, dishList }: any) {
  const handleButtonClick = (index: number) => {
    if (buttons[index].state) buttons[index].state = false;
    else buttons[index].state = true;
    setButtons([...buttons]);
  };

  const { data, isLoading } = useQuery({
    queryKey: "getDishList",
    queryFn: () => getDishList(),
  });

  useEffect(() => {
    const newButtons = [];
    if (data !== undefined) {
      for (let i = 0; i < data.data.length; i++) {
        newButtons.push({ dishId: data.data[i].dishId, state: false });
      }

      for (let i = 0; i < data.data.length; i++) {
        for (let j = 0; j < dishList.length; j++) {
          if (newButtons[i].dishId === dishList[j].dishId) {
            newButtons[i].state = true;
          }
        }
      }
    }
    setButtons(newButtons);
  }, [data]);

  if (isLoading || data === undefined || buttons.length === 0) return null;

  return (
    <div className="w-full h-full flex flex-row gap-3">
      {data.data.map((item: detailData, index: number) => (
        <button
          key={item.dishId}
          className={`px-3 rounded-lg text-white font-bold hover:bg-LightMain dark:hover:bg-DarkMain ${
            buttons[index].state
              ? "bg-LightMain dark:bg-DarkMain"
              : "bg-LightMainHover dark:bg-DarkMainHover"
          }`}
          onClick={() => handleButtonClick(index)}
        >
          {item.dishName}
        </button>
      ))}
    </div>
  );
}
