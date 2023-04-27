import { defaultInstance } from "../utils";

// GET

/**
 * 냥그릇 목록 조회
 * @returns
 */
export const getDishList = async (limit: number, offSet: number) => {
  const { data } = await defaultInstance.get(
    `dish?limit=${limit}&offset=${offSet}`
  );
  return data;
};

/**
 * 냥그릇 조회
 * @param {int} dishId 그릇 고유번호
 * @returns
 */
export const getDishItem = async (
  dishId: number,
  limit: number,
  offSet: number
) => {
  const { data } = await defaultInstance.get(
    `dish/${dishId}?limit=${limit}&offSet=${offSet}`
  );
  return data;
};

// POST

interface dishRequestDto {
  dishAddress: string;
  dishLat: number;
  dishLong: number;
  dishName: string;
  dishProfileImagePath: string;
  dishSeriaNum: string;
  locationCode: string;
}

/**
 * 냥그릇 등록
 * @param {dishAddress: string,dishLat: 0,dishLong: 0,dishName: string,dishProfileImagePath: string,dishSerialNum: string,locationCode: string }
 * @returns
 */

export const registDish = async (dishRequestDto: dishRequestDto) => {
  const { data } = await defaultInstance.post(`dish`, dishRequestDto, {
    headers: { "Content-type": "multipart/form-data" },
  });
  return data;
};

// POST

/**
 * 냥그릇 수정
 * @param dishId: number
 * @param {dishAddress: string,dishLat: 0,dishLong: 0,dishName: string,dishProfileImagePath: string,dishSerialNum: string,locationCode: string }
 * @returns
 */

export const modifyDish = async (
  dishId: number,
  dishRequestDto: dishRequestDto
) => {
  const { data } = await defaultInstance.put(`dish/${dishId}`, dishRequestDto, {
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
  const { data } = await defaultInstance.delete(`dish/${dishId}`);
  return data;
};
