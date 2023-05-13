// service 统一出口
import Request from './request'
// import { BASE_URL, TIME_OUT } from './request/config'
import { ElMessage } from 'element-plus'

const request = new Request({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: import.meta.env.TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token 拦截
      const token = localStorage.getItem('token')
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    },
    requestInterceptorCatch: (error) => {
      console.log('请求失败的拦截')
      return error
    },
    responseInterceptor: (res) => {
      if (res.data.code !== 200) {
        ElMessage.error(res.config.baseURL + res.config.url! + res.data.message)
      }

      return res
    },
    responseInterceptorCatch: (error) => {
      console.log('响应失败的拦截')
      return error
    }
  }
})

export default request
