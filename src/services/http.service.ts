import axios, { AxiosError } from 'axios'
import { apiService } from './api.service'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initialState, userReducer } from '../app/reducers/user.slice'

export const httpService = {
    get,
    post
}

const axiosInstance = axios.create({
    baseURL: apiService.SQUEAKER_API_URL,
    withCredentials: true
})

async function get(url: string, shouldRefresh?: boolean): Promise<unknown> {
    try {
        if (shouldRefresh) {
            refresh()
        }
        return await axiosInstance.get(url)
    } catch (error) {
        throw error
    }
}

async function refresh() {
    try {
        await post('/auth/ping', () => {})
    } catch (err) {
        if (err instanceof AxiosError && err.response?.status === 401) {
            try {
                await post('/auth/refresh', () => {})
            } catch (refreshError) {
                if (err instanceof AxiosError) console.log(err.message)
                else console.log(err)
            }
        }
    }
}

async function post(url: string, cb: () => unknown, shouldRefresh?: boolean) {
    try {
        if (shouldRefresh) {
            refresh()
        }
        const res = await axiosInstance.post(url, cb(), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res
    } catch (error) {
        if (error instanceof AxiosError) console.log(error.response?.data)
        throw error
    }
}

export function SilentLogin() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        ;(async () => {
            let user = undefined

            try {
                user = await post('/auth/ping', () => {})
            } catch (err) {
                if (err instanceof AxiosError && err.response?.status === 401) {
                    try {
                        user = await post('/auth/refresh', () => {})
                    } catch (refreshError) {
                        if (err instanceof AxiosError) console.log(err.message)
                        else console.log(err)
                    }
                }
            } finally {
                dispatch(userReducer.onLoginUser(user?.data || initialState.loggedInUser))
                navigate('/home')
            }
        })()
    }, [])

    return null
}
