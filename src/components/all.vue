<template>
  <div>hello world</div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "all",
    created() {
      //并发请求：同时进行多个请求，并同意处理返回值,axios.all(),axios.spread()
      axios.all([
        axios.get('/data.json'),
        axios.get('/city.json')
      ]).then(axios.spread((data, city) => {
        console.log(data, city, '并发请求')
      }))
      //  创建axios实例
      let instance = axios.create({
        baseURL: 'http://localhost:8080',
        timeout: 1000,
        url: '/data.json',
        method: 'get',
        headers: {
          token: ''
        },
        params: {
          id: 233,
          class: 555
        },//拼接url
        data: {
          dataId: 123
        }//请求体中
      });
      instance.get('/data.json').then(res => {
        console.log(res, '创建axios实例')
      }).catch(error=> {
        console.log(error)
      })
      //  axios全部配置 3>2>1优先级
      axios.defaults.timeout = 1000
      axios.defaults.baseURL = 'http://localhost:8080'
      //  axios实例配置
      let ins = axios.create()
      ins.defaults.timeout = 3000
      //  axios请求配置
      ins.get('/data.json', {
        timeout: 5000
      });
      //  请求拦截器
      ins.interceptors.request.use(config => {
        //在发送请求前做什么
        // $('#modal').show()
        return config
      }, err => {
        //请求错误的时候做什么
        return Promise.reject(err)
      }) //请求前，请求错误
      //  相应拦截器
      ins.interceptors.response.use(res => {
        // $('#modal').hide()
        //  请求成功对相应数据做处理
        return res
      }, error => {
        //相应错误
        return Promise.reject(error)
      })
      // 取消拦截器
      let interCeptors = axios.interceptors.request.use(config => {
        config.headers = {
          auth: true
        }
        return config
      })
      axios.interceptors.request.eject(interCeptors)
    //  取消请求
      let source = axios.CancelToken.source()
      axios.get('/data.json',{
        cancelToken: source.token
      }).then(res=> {
        console.log(res)
      }).catch(error=> {
        console.log(error)
      })
      source.cancel('cancel http 参数可选')
    }
  }
</script>

<style scoped>

</style>
