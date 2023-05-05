import { authInstance } from "../utils";

// GET
/**
 * 사용자 아이디 목록 조회
 * @returns
 */

export const getClientIdList = async (
  dishId: number,
  searchKey: string,
  searchWord: string
) => {
  if (dishId === 0 && searchWord === "") {
    const data = authInstance.get(`client`);
    return data;
  } else if (dishId !== 0 && searchWord === "") {
    const data = authInstance.get(`client?dishId=${dishId}`);
    return data;
  } else if (dishId === 0 && searchWord !== "") {
    const data = authInstance.get(
      `client?searchKey=${searchKey}&searchWord=${searchWord}`
    );
    return data;
  } else if (dishId !== 0 && searchWord !== "") {
    const data = authInstance.get(
      `client?dishId=${dishId}&searchKey=${searchKey}&searchWord=${searchWord}`
    );
    return data;
  }
};

/**
 * 사용자 아이디 조회
 * @param {int} clientId
 * @returns
 */
export const getClientIdItem = async (clientId: number) => {
  const data = authInstance.get(`client/${clientId}`);
  return data;
};

// POST
/**
 * 사용자 아이디 생성
 * @returns {boolean}
 */
export const registClient = async (formData: FormData) => {
  const data = authInstance.post(`client`, formData, {
    headers: { "Content-type": "multipart/form-data" },
  });
  return data;
};

// PUT
/**
 * 사용자 아이디 정보 수정
 * @param {int} clientId
 * @returns {boolean}
 */
export const modifyClient = async (clientId: number, formData: FormData) => {
  const data = authInstance.put(`client/${clientId}`, formData, {
    headers: { "Content-type": "multipart/form-data" },
  });
  return data;
};

// DELETE
/**
 * 사용자 아이디 비활성화
 * @param {int} clientId
 * @returns true/false
 */
export const modifyClientState = (clientId: number, formData: FormData) => {
  const result = authInstance.delete(`client/${clientId}/block`, {
    data: formData,
    headers: { "Content-type": "multipart/form-data" },
  });
  return result;
};

/**
 * 사용자 아이디 탈퇴 요청
 * @param {int} clientId
 * @returns true/false
 */
export const deleteClient = (clientId: number) => {
  const data = authInstance.delete(`client/${clientId}`);
  return data;
};
