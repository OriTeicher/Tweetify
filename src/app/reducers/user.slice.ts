import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../services/interface.service'
import { userService } from '../../services/user.service'

interface UserState {
    loggedInUser: User
}

export const initialState: UserState = {
    loggedInUser: userService.getEmptyUser()
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        onLoginUser: (state, action: PayloadAction<any>) => {
            console.log(action.payload)
            state.loggedInUser = action.payload
        },
        onLogoutUser: (state, action: PayloadAction<any>) => {
            state.loggedInUser = action.payload
        }
    }
})

export const userReducer = userSlice.actions
export default userSlice.reducer
