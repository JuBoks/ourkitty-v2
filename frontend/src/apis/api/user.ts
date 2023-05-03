import { defaultInstance } from "../utils";

// GET
/**
 * 사용자 아이디 목록 조회
 * @returns
 */
export const getClientIdList = async () => {
  const data = defaultInstance.get(`client`);
  return data;
};

/**
 * 사용자 아이디 조회
 * @param {int} clientId
 * @returns
 */
export const getClientIdItem = async (clientId: number) => {
  const data = defaultInstance.get(`client/${clientId}`);
  return data;
};

// POST
export const registClient = async (formData: FormData) => {
  const data = defaultInstance.post(`client`, formData, {
    headers: { "Content-type": "multipart/form-data" },
  });
  return data;
};

// PUT
/**
 * 사용자 아이디 정보 수정
 * @param {int} clientId
 * @param {clientAddress: string, clientEmail: string, clientName: string, clientNickname: string, clientPassword: string, clientPhone: string, clientProfileImagePath: string, dishList: [{dishAddress: string, dishLat: number, dishLong: number, dishName: string, dishProfileImagePath: string, dishSerialNum: string, locationCode: string}], locationCode: string}
 * @returns true/false
 */
export const modifyClient = async (clientId: number, formData: FormData) => {
  const data = defaultInstance.put(`client/${clientId}`, formData, {
    headers: { "Content-type": "multipart/form-data" },
  });
  return data;
};

// DELETE
/**
 * 사용자 아이디 횔성화/비활성화
 * @param {int} clientId
 * @returns true/false
 */
export const modifyClientState = (clientId: number) => {
  const data = defaultInstance.delete(`client${clientId}`);
  return data;
};

/**
 * 사용자 아이디 탈퇴 요청
 * @param {int} clientId
 * @returns true/false
 */
export const deleteClient = (clientId: number) => {
  const data = defaultInstance.delete(`client/${clientId}/request`);
  return data;
};
