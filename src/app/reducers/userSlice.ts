import { createSlice } from '@reduxjs/toolkit'

interface UserState {
    loggedInUser: {
        username: string
        displayName: string
        password: string
        description: string
        profileImgUrl: string
        bgImgUrl: string
        followers: []
        following: []
    }
}

export const initialState: UserState = {
    loggedInUser: {
        username: 'Guest',
        displayName: 'guest',
        password: '!@#$',
        description: '',
        followers: [],
        following: [],
        profileImgUrl: '',
        bgImgUrl: ''
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        onSignUp: (state, newUser: any) => {
            state.loggedInUser = newUser
        }
    }
})

export const userReducer = userSlice.actions
export default userSlice.reducer
