import { createSlice } from '@reduxjs/toolkit'

interface UserState {
    loggedInUser: {
        isAdmin: boolean
        username: string
        displayName: string
        password: string
        description: string
        profileImgUrl: string
        bgImgUrl: string
        followers: []
        following: []
        joinedAt: string
    }
}

export const initialState: UserState = {
    loggedInUser: {
        isAdmin: false,
        username: 'Guest',
        displayName: 'guest',
        password: '!@#$',
        description: '',
        followers: [],
        following: [],
        profileImgUrl: '',
        bgImgUrl: '',
        joinedAt: ''
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        onSignUp: (state, newUser: any) => {
            debugger
            state.loggedInUser = newUser
            console.log('state.loggedInUser', state.loggedInUser)
        }
    }
})

export const userReducer = userSlice.actions
export default userSlice.reducer
