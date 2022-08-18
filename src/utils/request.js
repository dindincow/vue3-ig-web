import axios from 'axios'

const service = axios.create({
  // 獲取當前環境便量使用的 api
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})

service.interceptors.request.use((config) => {
  config.headers.icode = 'AFF3601EB1BCA13C'
  return config
})

service.interceptors.response.use((response) => {
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    return Promise.reject(new Error(message))
  }
})

export default service
