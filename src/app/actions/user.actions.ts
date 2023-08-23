import { AppThunk } from '../store'
import { userReducer } from '../reducers/user.slice'
import { cloudinaryService } from '../../services/cloudinary.service'
import { httpService } from '../../services/http.service'
import { CreateUserDto } from '../../services/interface.service'

export const userActions = {
    loginUser,
    signUp
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
            dispatch(userReducer.onLoginUser(loggedInUser?.data))
        } catch (error) {
            console.log('Login Failed.' + error)
        }
    }
}

function signUp(user: any, profileImgFile: File | null, profileBgFile: File | null): AppThunk {
    return async (dispatch) => {
        try {
            if (profileBgFile && profileImgFile) {
                var profileImgUrl = await cloudinaryService.uploadImgToCloud(profileImgFile)
                var profileBgUrl = await cloudinaryService.uploadImgToCloud(profileBgFile)
            }
            // TODO: change to consts
            user.bgImgUrl = 'https://applicants.mta.ac.il/wp-content/uploads/2019/11/rominazi.png'
            user.profileImgUrl = 'https://applicants.mta.ac.il/wp-content/uploads/2019/11/yossi.png'
            await httpService.post('users', () => {
                const newUser: CreateUserDto = {
                    email: user.email,
                    password: user.password,
                    username: user.username,
                    displayName: user.displayName
                }
                return newUser
            })
            dispatch(userReducer.onLoginUser(user))
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

// TODO: build logOut function
// function logOut(): AppThunk {
//     return async (dispatch) => {
//         try {
//         } catch (error) {
//             console.log('Login Failed.' + error)
//         }
//     }
// }
