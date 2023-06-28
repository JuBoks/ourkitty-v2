export const getKRTime = (date: Date): { date_obj: Date; date_str: string } => {
  // 한국 시간으로 맞추기
  const offset = date.getTimezoneOffset() * 60000; //ms단위라 60000곱해줌
  const dateOffset = new Date(date.getTime() - offset);
  const dateString = dateOffset.toISOString().split("T")[0];

  return { date_obj: dateOffset, date_str: dateString };
};
