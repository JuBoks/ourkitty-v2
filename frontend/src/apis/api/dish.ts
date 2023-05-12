import { authInstance } from "../utils";

// GET

/**
 * 냥그릇 목록 조회
 * @returns
 */
export const getDishList = async () => {
  const { data } = await authInstance.get(`dish`);
  return data;
};

/**
 * 냥그릇 조회
 * @param {int} dishId 그릇 고유번호
 * @returns
 */
export const getDishItem = async (dishId: number) => {
  const { data } = await authInstance.get(`dish/${dishId}`);
  return data;
};

// POST
/**
 * 냥그릇 등록 / 수정
 * @param {dishAddress: string, dishLat: 0, dishLong: 0, dishName: string, dishSerialNum: string, file: string }
 * @returns
 */

export const registDish = async (formData: FormData) => {
  const { data } = await authInstance.post(`dish`, formData, {
    headers: { "Content-type": "multipart/form-data" },
  });
  return data;
};

// PUT

/**
 * 냥그릇 수정
 * @param dishId: number
 * @param {dishAddress: string,dishLat: 0,dishLong: 0,dishName: string,dishProfileImagePath: string,dishSerialNum: string,locationCode: string }
 * @returns
 */

export const modifyDish = async (dishId: number, formData: FormData) => {
  const { data } = await authInstance.put(`dish/${dishId}`, formData, {
    headers: { "Content-type": "multipart/form-data" },
  });
  return data;
};

// DELETE
/**
 * 냥그릇 삭제
 * @param {int} dishId 냥그릇 고유번호
 * @returns true/false
 */
export const deleteDish = async (dishId: number) => {
  const { data } = await authInstance.delete(`dish/${dishId}`);
  return data;
};
