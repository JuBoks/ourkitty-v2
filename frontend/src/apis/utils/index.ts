import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const axiosApi = (baseURL: any) => {
  const instance = axios.create({
    baseURL,
    // withCredentials: true, // 유저 정보 확인(백엔드에서도 설정 필요)
  });
  return instance;
};
export const defaultInstance = axiosApi(BASE_URL);
