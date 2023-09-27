import { AppThunk } from '../store'
import { initialState, userReducer } from '../reducers/user.slice'
import { cloudinaryService } from '../../services/cloudinary.service'
import { httpService } from '../../services/http.service'
import { utilService } from '../../services/util.service'
import { userService } from '../../services/user.service'
import { User } from '../../services/interface.service'

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

function signUp(user: Partial<User>, profileImgFile: File | null, profileBgFile: File | null, isPost: boolean): AppThunk {
    return async (dispatch) => {
        try {
            let newUser = null
            if (profileImgFile) {
                user.profileImgUrl = await cloudinaryService.uploadImgToCloud(profileImgFile)
            }
            if (profileBgFile) {
                user.profileBgUrl = await cloudinaryService.uploadImgToCloud(profileBgFile)
            }

            if (isPost) {
                newUser = (await httpService.post('/auth/sign-up', () => utilService.objectAssignExact(user, userService.getEmptyCreateUserDto()), true)).data
            } else {
                newUser = (await httpService.patch(`/users/${user?.id}`, () => utilService.objectAssignExact(user, userService.getEmptyUpdateUserDto()), true)).data
            }
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
