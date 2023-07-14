import { AppThunk } from '../feedStore'
import { userReducer } from '../reducers/userSlice'

export const userActions = {
    loginUser,
    signUp,
    logOut,
    checkPassword,
}

// TODO: build loginUser function
function loginUser(): AppThunk {
    return async (dispatch) => {
        try {
        } catch (error) {
            console.log('Login Failed.' + error)
        }
    }
}

// TODO: build signUp function
function signUp(): AppThunk {
    return async (dispatch) => {
        try {
        } catch (error) {
            console.log('Login Failed.' + error)
        }
    }
}

// TODO: build password auth function
function checkPassword(): AppThunk {
    return async (dispatch) => {
        try {
        } catch (error) {
            console.log('Login Failed.' + error)
        }
    }
}

// TODO: build logOut function
function logOut(): AppThunk {
    return async (dispatch) => {
        try {
        } catch (error) {
            console.log('Login Failed.' + error)
        }
    }
}