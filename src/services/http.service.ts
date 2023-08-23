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

async function get(url: string): Promise<unknown> {
    try {
        return await axiosInstance.get(url)
    } catch (error) {
        throw error
    }
}

async function post(url: string, cb: () => unknown) {
    try {
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
            try {
                const user = await post('/auth/ping', () => {})
                if (user) {
                    dispatch(userReducer.onLoginUser(user?.data))
                    navigate('/home')
                }
            } catch (err) {
                if (err instanceof AxiosError && err.response?.status === 401) {
                    try {
                        const user = await post('/auth/refresh', () => {})
                        dispatch(userReducer.onLoginUser(user?.data))
                        navigate('/home')
                    } catch (refreshError) {
                        dispatch(userReducer.onLoginUser(initialState.loggedInUser))
                        navigate('/home')
                    }
                } else {
                    navigate('/home')
                }
            }
        })()
    }, [navigate, dispatch])

    return null
}
