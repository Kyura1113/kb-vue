import axios from 'axios'

let instance = axios.create({ timeout: 1000 * 10 })
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
//请求拦截
axios.interceptors.request.use(
    config=>{
        // const token = ''
        // token && (config.headers.Authorization = token)
        return config
    },
    error => {
        return Promise.error(error)
    }
)
//响应拦截
instance.interceptors.response.use(
    response => [ 200, 201 ].indexOf(response.status) > -1 ? Promise.resolve(response) : Promise.reject(response),
    error => {
        const { response } = error
        if(response) {
            errorHandle(response.status, response.data.message)
        }
        return Promise.reject(response)
    }
)

const errorHandle = (status, msg) => {
    switch (status) {
        case 401:
            console.log(msg)
            break;
        case 402:
            break;
        case 403:
            break;
        case 404:
            break;
        default:
            break;
    }
}

export default instance

