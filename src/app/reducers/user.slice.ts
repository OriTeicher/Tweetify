import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../services/interface.service'
import { userService } from '../../services/user.service'
import { utilService } from '../../services/util.service'

interface UserState {
    loggedInUser: User
}

export const initialState: UserState = {
    loggedInUser: {
        ...userService.getEmptyUser(),
        username: 'Guest000',
        displayName: 'Guest',
        createdAt: '06/23',
        description: 'This is a guest account, you should create your own user to edit this page...'
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        onUserChange: (state, action: PayloadAction<any>) => {
            state.loggedInUser = action.payload
        }
    }
})

export const userReducer = userSlice.actions
export default userSlice.reducer
