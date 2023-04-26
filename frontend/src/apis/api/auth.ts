import { defaultInstance } from "../utils";

interface loginRequestDto {
  clientEmail: string;
  clientPassword: string;
}
/**
 * 로그인
 * @param loginRequestDto
 */
export const login = async (loginRequestDto: loginRequestDto) => {
  try {
    const res = await defaultInstance.post(`auth/signIn`, loginRequestDto, {
      headers: { "Content-type": "multipart/form-data" },
    });
    const accessToken = res.data;
    const refreshToken = res.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  } catch (e) {}
};

/**
 * 로그아웃
 */
// export const logout = async () => {
//   const refresh = localStorage.getItem("refreshToken");
//   const access = localStorage.getItem("accessToken");
//   const res = await authInstance.get(`auth/signout`);

//   if (res.data.message === "SUCCESS") {
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("accessToken");
//   }
// };
