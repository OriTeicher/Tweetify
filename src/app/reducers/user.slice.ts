import { createSlice } from '@reduxjs/toolkit'
import { utilService } from '../../services/util.service'
import { PayloadAction } from '@reduxjs/toolkit'

interface UserState {
    loggedInUser: {
        isAdmin: boolean
        isVerified: boolean
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
        isVerified: false,
        username: 'G-' + utilService.generateId(5),
        displayName: 'Guest',
        password: '!@#$',
        description: 'This is a guest account, you should create your own user...',
        followers: [],
        following: [],
        profileImgUrl: '',
        bgImgUrl: '',
        joinedAt: '06/23'
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        onLoginUser: (state, action: PayloadAction<any>) => {
            state.loggedInUser = action.payload
        }
    }
})

export const userReducer = userSlice.actions
export default userSlice.reducer
