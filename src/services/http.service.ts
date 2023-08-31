import axios, { AxiosError } from 'axios'
import { apiService } from './api.service'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initialState, userReducer } from '../app/reducers/user.slice'

export const httpService = {
    get,
    post,
    patch
}

const axiosInstance = axios.create({
    baseURL: apiService.SQUEAKER_API_URL,
    withCredentials: true
})

async function get(url: string, shouldRefresh?: boolean) {
    try {
        if (shouldRefresh) {
            refresh()
        }
        return await axiosInstance.get(url)
    } catch (error) {
        console.log(`GET ERROR for ${url}`)
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
                console.log('REFRESH ERROR')
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
        console.log('POST ERROR')
        if (error instanceof AxiosError) console.log(error.response?.data)
        throw error
    }
}

async function patch(url: string, cb: () => unknown, shouldRefresh?: boolean) {
    try {
        if (shouldRefresh) {
            refresh()
        }
        const res = await axiosInstance.patch(url, cb(), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res
    } catch (error) {
        console.log('PATCH ERROR')
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
                dispatch(userReducer.onUserChange(user?.data || initialState.loggedInUser))
                navigate('/home')
            }
        })()
    }, [])

    return null
}
