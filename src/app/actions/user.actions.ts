import { AppThunk } from '../store'
import { initialState, userReducer } from '../reducers/user.slice'
import { cloudinaryService } from '../../services/cloudinary.service'
import { httpService } from '../../services/http.service'
import { constsService } from '../../services/consts.service'
import { utilService } from '../../services/util.service'
import { userService } from '../../services/user.service'

export const userActions = {
    loginUser,
    signUp,
    logOutUser
}

function loginUser(email: string, password: string): AppThunk {
    return async (dispatch) => {
        try {
            const loggedInUser = await httpService.post('auth/sign-in', () => {
                return {
                    email,
                    password
                }
            })
            dispatch(userReducer.onUserChange(loggedInUser?.data))
        } catch (error) {
            console.log('Login Failed.' + error)
        }
    }
}

function signUp(user: any, profileImgFile: File | null, profileBgFile: File | null): AppThunk {
    return async (dispatch) => {
        try {
            if (profileBgFile && profileImgFile) {
                user.profileImgUrl = await cloudinaryService.uploadImgToCloud(profileBgFile)
                user.profileBgUrl = await cloudinaryService.uploadImgToCloud(profileImgFile)
            } else {
                user.profileImgUrl = constsService.NO_PROFILE_IMG_URL
                user.profileBgUrl = constsService.NO_BG_WALLPAPER_URL
            }
            const { data: newUser } = await httpService.post('/auth/sign-up', () => {
                return utilService.objectAssignExact(user, userService.getEmptyCreateUserDto())
            })
            dispatch(userReducer.onUserChange(newUser))
        } catch (error) {
            console.log('Login Failed.' + error)
        }
    }
}

function logOutUser(): AppThunk {
    return async (dispatch) => {
        try {
            await httpService.post('auth/sign-out', () => {})
            dispatch(userReducer.onUserChange(initialState.loggedInUser))
        } catch (error) {
            console.log('Login Failed.' + error)
        }
    }
}

// TODO: build password auth function
// function checkPassword(): AppThunk {
//     return async (dispatch) => {
//         try {
//         } catch (error) {
//             console.log('Login Failed.' + error)
//         }
//     }
// }
