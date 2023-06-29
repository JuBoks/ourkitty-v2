import { ReactComponent as InfoButton } from "assets/info.svg";
import { Props } from "react-apexcharts";

export default function ChartIoTImage({ imgUrl, onClickInfo }: Props) {
  return (
    <>
      <img src={imgUrl} className="h-full object-cover" alt="cat" />
      <div className="relative mr-[-1rem]">
        <button className="absolute top-4 right-8 bg-white rounded-full" onClick={onClickInfo}>
          {" "}
          <InfoButton className="w-[1rem] h-[1rem]" />{" "}
        </button>
      </div>
    </>
  );
}
