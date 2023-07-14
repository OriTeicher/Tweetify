import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
    username: string
    displayName: string
    password: string
    followers: []
    following: []
}

export const initialState: UserState = {
    username: 'Guest',
    displayName: 'guest',
    password: '!@#$',
    followers: [],
    following: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {}
})

export const userReducer = userSlice.actions
export default userSlice.reducer
