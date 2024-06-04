import axios from "axios";
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

async function postRefreshToken() {
  const response = await apiClient.post('/api/v1/users/refresh', {
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
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
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response } = error;
    if (response) {
      const { status } = response;
      if (localStorage.getItem('refresh_token') && status === 401) {
        if (!config._retry) {
          config._retry = true;
          try {
            const tokenResponse = await postRefreshToken();
            if (tokenResponse.status === 200) {
              const newAccessToken = tokenResponse.data.access_token;
              localStorage.setItem('access_token', newAccessToken);
              localStorage.setItem('user_id', tokenResponse.data.user);
              axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
              config.headers.Authorization = `Bearer ${newAccessToken}`;
              return axios(config);
            } else {
              console.error('error:', error);
              localStorage.removeItem('access_token');
              localStorage.removeItem('user_id');
            }
          } catch (refreshError) {
            console.log('토큰 갱신 실패', refreshError);
            localStorage.removeItem('access_token');
            localStorage.removeItem('user_id');
          }
        }
      }
    } else {
      console.error('No response received:', error);
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_id');
    }
    return Promise.reject(error);
  }
);



export default apiClient;