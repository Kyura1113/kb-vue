import config from './config'
import axios from '@/utils/http'

const { baseUrl } = config

const article = {
    publish(params){
        return axios.post(`${baseUrl}/article/create-article`, params)
    },
    update(params){
        return axios.post(`${baseUrl}/article/update-article`, params)
    },
    findList(params){
        return axios.post(`${baseUrl}/article/find-article-list`, params)
    },
    findDetail(params){
        return axios.post(`${baseUrl}/article/find-article-detail`, params)
    }
}

export default article