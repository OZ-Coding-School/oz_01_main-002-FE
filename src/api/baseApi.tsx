import axios from "axios";
const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// const refreshToken = async () => {
//   try {
//     const response = await apiClient.post(
//       "/api/v1/users/refresh",
//       {
//         token_type: "Bearer",
//         token: Cookies.get("refresh_token"),
//       }
//     );
//     const newAccessToken = response.data.access;
//     localStorage.setItem("access_token", newAccessToken);
//     return newAccessToken;
//   } catch (error) {
//     console.error("리프레시 토큰 에러", error);
//     throw error;
//   }
// };

// apiClient.interceptors.request.use(
//   async (config) => {
//     const accessToken = localStorage.getItem("access_token");
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// apiClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       try {
//         const newAccessToken = await refreshToken();
//         originalRequest._retry = true;
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return apiClient(originalRequest);
//       } catch (error) {
//         console.error("리프레시 토큰 에러", error);
//         throw error;
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default apiClient;