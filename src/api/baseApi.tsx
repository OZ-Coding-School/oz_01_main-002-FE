import axios from "axios";
import Cookies from 'js-cookie';
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

async function postRefreshToken() {
  const cookie = Cookies.get('refresh_token');
  const response = await apiClient.post('/api/v1/users/refresh', {
  }, {
    headers: {
      Authorization: `Bearer ${cookie}`
    }
  })
  return response;
}
apiClient.interceptors.response.use((config) => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
})

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response } = error;

    if (response) {
      const { status } = response;
      try {
        if (status === 401) {
          const originalRequest = config;
          if (!originalRequest._retry) { // 중복 요청 방지
            originalRequest._retry = true;
            try {
              const tokenResponse = await postRefreshToken();
              if (tokenResponse.status === 200) {
                const newAccessToken = tokenResponse.data.access_token;
                localStorage.setItem('access_token', newAccessToken);
                localStorage.setItem('user_id', tokenResponse.data.user);
                axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axios(originalRequest);
              }
            } catch (refreshError) {
              console.log('토큰 갱신 실패', refreshError);
            }
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      // 응답이 없는 경우 처리
      console.error('No response received:', error);
    }

    return Promise.reject(error);
  }
);



export default apiClient;