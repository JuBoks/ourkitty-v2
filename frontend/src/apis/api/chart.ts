import { authInstance } from "../utils";

// GET

/**
 * HeatMap
 * @param {int} dishId 그릇 고유번호
 * @returns
 */
export const getCatUserList = async (dishId: number) => {
  const { data } = await authInstance.get(`chart/visit?dishId=${dishId}`);
  return data;
};

/**
 * NumOfCat
 * @param {int} dishId 그릇 고유번호
 * @returns
 */
export const getCatNum = async (dishId: number) => {
  const { data } = await authInstance.get(`chart/count?dishId=${dishId}`);
  return data;
};
