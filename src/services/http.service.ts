import axios, { AxiosError } from 'axios'
import { apiService } from './api.service'

export const httpService = {
    get,
    post
}

const axiosInstance = axios.create({
    baseURL: apiService.SQUEAKER_API_URL,
    withCredentials: true
})

async function get(url: string) {}

async function post(url: string, cb: Function) {
    try {
        const res = await axiosInstance.post(url, cb(), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res
    } catch (error) {
        if (error instanceof AxiosError) console.log(error.response?.data)
    }
}
