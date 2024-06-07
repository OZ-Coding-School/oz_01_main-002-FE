import axios from "axios";
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

async function postRefreshToken() {
  const response = await apiClient.post('/api/v1/users/refresh', {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
    }
  });
  return response;
}

apiClient.interceptors.response.use((config) => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response } = error;
    if (response) {
      const { status, config: { url } } = response;
      if (url === '/api/v1/users/refresh' && status === 401) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_id');
        window.location.href = '/login';
      } else {
        if (localStorage.getItem('refresh_token') && status === 401) {
          try {
            if (!config._retry) {
              config._retry = true;
              const tokenResponse = await postRefreshToken();
              if (tokenResponse.status === 200) {
                const newAccessToken = tokenResponse.data.access_token;
                localStorage.setItem('access_token', newAccessToken);
                localStorage.setItem('user_id', tokenResponse.data.user);
                axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
                config.headers.Authorization = `Bearer ${newAccessToken}`;
                return axios(config);
              } else {
                throw new Error('토큰 갱신 실패');
              }
            }
          } catch (refreshError) {
            console.log('토큰 갱신 실패', refreshError);
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user_id');

          }
        }
      }
    }
    return Promise.reject(error);
  }
);



export default apiClient;