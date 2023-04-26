import { defaultInstance } from "../utils";

// GET
/**
 * 신고 목록 조회
 * @returns
 */
export const getReportList = async () => {
  const data = defaultInstance.get(`report`);
  return data;
};

/**
 * 신고 조회
 * @param {int} reportId 신고글 고유 ID
 * @returns
 */
export const getReportItem = async (reportId: number) => {
  const data = defaultInstance.get(`report/${reportId}`);
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
  const data = defaultInstance.post(`report`, reportRequestDto, {
    headers: { "Content-type": "multipart/form-data" },
  });
  return data;
};

/**
 * 신고 답변 완료
 * @returns true/false
 */
export const registReportComment = async (reportId: number) => {
  const data = defaultInstance.post(`report/${reportId}`);
  return data;
};
