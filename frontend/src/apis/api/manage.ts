import { defaultInstance } from "../utils";

// GET
/**
 * 관리일지 목록 조회
 * id가 0일 경우 전체 조회
 * @returns
 */
export const getManagementList = async (
  id: number,
  limit: number,
  offset: number
) => {
  if (id === 0) {
    // 전체 일지 조회
    const data = defaultInstance.get(
      `management?limit=${limit}&offset=${offset}`
    );
    return data;
  } else {
    // 특정 냥그릇 일지 조회
    const data = defaultInstance.get(
      `management?id=${id}&limit=${limit}&offset=${offset}`
    );
    return data;
  }
};

/**
 * 관리일지 조회
 * @param {int} managementId 관리일지 고유 ID
 * @returns
 */
export const getManagementItem = async (managementId: number) => {
  const data = defaultInstance.get(`management/${managementId}`);
  return data;
};

// POST

interface managementRequestDto {
  clientId: number;
  dishId: number;
  dishState: string;
  managementContent: string;
}
/**
 * 관리일지 작성
 * @param {clientId: number, dishIdL number, dishState: string, managementContent: string}
 * @returns
 */
export const registManagement = async (
  managementRequestDto: managementRequestDto
) => {
  const data = defaultInstance.post(`management`, managementRequestDto, {
    headers: { "Content-type": "multipart/form-data" },
  });
  return data;
};

interface managementCommentRequestDto {
  clientId: number;
  managementCommentContent: string;
  managementId: number;
}
/**
 * 관리일지 댓글 작성
 * @param {int} managementId
 * @param {clientId: number, manageCommentContent: string, managementId: string}
 */
export const registComment = async (
  managementId: number,
  formData: FormData
) => {
  const data = defaultInstance.post(
    `management/${managementId}/comment`,
    formData,
    {
      headers: { "Content-type": "multipart/form-data" },
    }
  );
  return data;
};

// PUT
/**
 * 관리일지 수정
 * @param {int} managementId
 * @returns
 */
export const modifyManagement = async (
  managementId: number,
  managementCommentRequestDto: managementCommentRequestDto
) => {
  const data = defaultInstance.put(
    `management/${managementId}`,
    managementCommentRequestDto,
    {
      headers: { "Content-type": "multipart/form-data" },
    }
  );
  return data;
};

// DELETE
/**
 * 관리일지 삭제
 * @param {int} managementId
 * @returns true/false
 */

export const deleteManagement = async (managementId: number) => {
  const data = defaultInstance.delete(`management/${managementId}`);
  return data;
};

/**
 * 관리일지 댓글 삭제
 * @param {int} managementId
 * @returns true/false
 */
export const deleteComment = async (
  managementId: number,
  managementCommentId: number
) => {
  const data = defaultInstance.delete(
    `management/${managementId}/comment/${managementCommentId}`
  );
  return data;
};
