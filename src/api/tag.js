import config from './config'
import axios from '@/utils/http'

const { baseUrl } = config

const tag = {
    add(params){
        return axios.post(`${baseUrl}/tag/add-tag`, params)
    },
    find(params){
        return axios.post(`${baseUrl}/tag/find-tag`, params)
    }
}

export default tag