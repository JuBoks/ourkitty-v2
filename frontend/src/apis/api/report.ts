import { authInstance } from "../utils";

// GET
/**
 * @param {int} limit
 * @param {int} offset
 * @param {int} dishId
 * @param {string} reportCategory
 * @param {string} searchKey
 * @param {string} searchWord
 * 신고 목록 조회
 * @returns
 */
export const getReportList = async (
  limit: number,
  offset: number,
  dishId: number,
  reportCategory: string,
  searchKey: string,
  searchWord: string
) => {
  // 냥그릇 선택
  if (dishId !== 0 && reportCategory === "" && searchWord === "") {
    const data = await authInstance.get(
      `report?limit=${limit}&offset=${offset}&dishId=${dishId}`
    );
    return data;
  }
  // 민원 카테고리 선택
  else if (dishId === 0 && reportCategory !== "" && searchWord === "") {
    const data = await authInstance.get(
      `report?limit=${limit}&offset=${offset}&reportCategory=${reportCategory}`
    );
    return data;
  }
  // 검색어 입력
  else if (dishId === 0 && reportCategory === "" && searchWord !== "") {
    const data = await authInstance.get(
      `report?limit=${limit}&offset=${offset}&searchKey=${searchKey}&searchWord=${searchWord}`
    );
    return data;
  }
  // 냥그릇 & 민원 카테고리
  else if (dishId !== 0 && reportCategory !== "" && searchWord === "") {
    const data = await authInstance.get(
      `report?limit=${limit}&offset=${offset}&dishId=${dishId}&reportCategory=${reportCategory}`
    );
    return data;
  }
  // 냥그릇 & 검색어
  else if (dishId !== 0 && reportCategory === "" && searchWord !== "") {
    const data = await authInstance.get(
      `report?limit=${limit}&offset=${offset}&dishId=${dishId}&searchKey=${searchKey}&searchWord=${searchWord}`
    );
    return data;
  }
  // 민원 카테고리 & 검색어
  else if (dishId === 0 && reportCategory !== "" && searchWord !== "") {
    const data = await authInstance.get(
      `report?limit=${limit}&offset=${offset}&reportCategory=${reportCategory}&searchKey=${searchKey}&searchWord=${searchWord}`
    );
    return data;
  }
  // 냥그릇 & 민원 카테고리 & 검색어
  else if (dishId !== 0 && reportCategory !== "" && searchWord !== "") {
    const data = await authInstance.get(
      `report?limit=${limit}&offset=${offset}&dishId=${dishId}&reportCategory=${reportCategory}&searchKey=${searchKey}&searchWord=${searchWord}`
    );
    return data;
  }
  // 선택 X
  else {
    const data = await authInstance.get(
      `report?limit=${limit}&offset=${offset}`
    );
    return data;
  }
};

/**
 * 신고 조회
 * @param {number} reportId 신고글 고유 ID
 * @returns
 */
export const getReportItem = async (reportId: number) => {
  const data = await authInstance.get(`report/${reportId}`);
  return data;
};

// POST
interface reportRequestDto {
  clientId: number;
  reportCategory: string;
  reportContent: string;
  reportState: string;
  reportTitle: string;
}

/**
 * 신고 작성
 * @returns true/false
 */
export const registReport = async (reportRequestDto: reportRequestDto) => {
  const data = await authInstance.post(`report`, reportRequestDto, {
    headers: { "Content-type": "multipart/form-data" },
  });
  return data;
};

/**
 * 신고 답변 완료
 * @param {int} reportId
 * @param {FormData} formData
 * @returns true/false
 */
export const registReportComment = async (
  reportId: number,
  formData: FormData
) => {
  const { data } = await authInstance.put(`report/${reportId}`, formData, {
    headers: { "Content-type": "multipart/form-data" },
  });
  return data;
};
