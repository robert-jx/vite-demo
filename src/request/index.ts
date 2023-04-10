// axios封装
import axios from 'axios'
// 创建axios实例
const request = axios.create({
    baseURL: '',// 所有的请求地址前缀部分
    timeout: 5000, // 请求超时时间，单位为毫秒
    withCredentials: true,// 异步请求是否携带cookie
    headers: {
        // 设置后端需要的传参类型
        'Content-Type': 'application/json',
        'token': '此处放token',
        'X-Requested-With': 'XMLHttpRequest',
    },
})

// request拦截器
request.interceptors.request.use(
    config => {
        // 从localstorage获取token
        let token = localStorage.getItem("token");
        if (token) {
            //添加请求头
            config.headers["Authorization"] = "Bearer " + token
        }
        return config
    },
    error => {
        // 对请求错误做些什么
        Promise.reject(error)
    }
)

// response 拦截器
request.interceptors.response.use(
    response => {
        // 对响应数据返回结果
        return response.data
    },
    error => {
        // 对响应错误返回结果
        return Promise.reject(error)
    }
)
export default request