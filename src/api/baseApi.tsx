import axios from "axios";
import Cookies from 'js-cookie';
const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

async function postRefreshToken() {
  const cookie = Cookies.get('refresh_token');
  const response = await apiClient.post('/api/v1/users/refresh', {
  }, {
    headers: {
      Authorization: `Bearer ${cookie}`
    }
  })
  console.log('토큰 갱신 요청', response.data);
  return response;
}
apiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
})

apiClient.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const {
    config,
    response: { status },
  } = error;

  if (status === 401) {
    const originalRequest = config;
    try {
      const tokenResponse = await postRefreshToken();
      if (tokenResponse.status === 200) {
        const newAccessToken = tokenResponse.data.access_token;
        localStorage.setItem('access_token', newAccessToken);
        axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      };
    } catch (error) {
      console.log('토큰 갱신 실패');
    }
  }
  return Promise.reject(error);
}



)

export default apiClient;