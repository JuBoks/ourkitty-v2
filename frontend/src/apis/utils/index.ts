import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const axiosApi = (baseURL: any) => {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
  });
  return instance;
};
export const defaultInstance = axiosApi(BASE_URL);
