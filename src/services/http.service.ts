import axios, { AxiosError } from 'axios'

export const httpService = {
    get,
    post
}

async function get(url: string) {}

async function post(url: string, cb: Function) {
    try {
        const res = await axios.post(url, cb(), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res
    } catch (error) {
        if (error instanceof AxiosError) console.log(error.response?.data)
    }
}
