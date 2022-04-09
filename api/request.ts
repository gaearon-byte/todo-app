import axios from 'axios'
import { getStorage } from '../utils/storage'

// TODO 区分线上环境
axios.defaults.baseURL = 'http://localhost:4400'

axios.defaults.timeout = 10000
// 自定义请求头：对所有请求方法生效
axios.defaults.headers.common['authorization'] = 'custom value: for all methods'
// 自定义请求头：只对post方法生效
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 自定义请求头：只对get方法生效
axios.defaults.headers.get['get-custom-key'] = 'custom value: only for get method';

// 请求携带 token
axios.interceptors.request.use(async (config: any) => {
  const token = `Bearer ${await getStorage('token')}`
  config.headers.Authorization = token
  
  return config
})

type AJAXMethod= 'GET' | 'POST' | 'PUT' | 'DELETE'

export function request(method: AJAXMethod, url: string, data:any) {
  return axios({
    method,
    url,
    data
  })
}

export function get(url: string, data: any) {
  return request('GET', url, {
    param: data
  })
}

export function post(url: string, data: any) {
  return request('POST', url, data)
}

export default axios