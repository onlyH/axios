import axios from 'axios'
import service from './api'
import {Toast} from 'vant'

let instance = axios.create({
  baseURL: 'http://localhost:9000/api',
  timeout: 1000
});
const http = {}

for (let key in service) {
  let api = service[key] //url,methods
  http[key] = async function (params, isFormDate = false, config = {}) {
    let url = api.url;
    let method = api.method;
    let newParams = {}
    //content-type判断
    if (params && isFormDate) {
      newParams = new FormData();
      for (let i in params) {
        newParams.append(i, params[i])
      }
    } else {
      newParams = params
    }
    //  不同请求的判断
    let response = {} //请求的返回值
    if (method === 'put' || method === 'post' || method === 'patch') {
      try {
        response = await instance[method](url, newParams, config)
      } catch (e) {
        response = e
      }
    } else if (method === 'delete' || method === 'get') {
      config.params = newParams;
      try {
        response = await instance[method](url, config)
      } catch (e) {
        response = e
      }
    }
    return response
  }
}
//拦截器
instance.interceptors.request.use(config => {
  Toast.loading({
    mask: false,
    duration: 0,// 一直存在
    forbidClick: true,//禁止点击
    message: 'loading..'//提示信息
  })
  return config
}, err => {
  Toast.clear()
  Toast(err)
});

instance.interceptors.response.use(res => {
  Toast.clear()
  return res.data
}, () => {
  Toast.clear()
  Toast('err')
})


export default http
