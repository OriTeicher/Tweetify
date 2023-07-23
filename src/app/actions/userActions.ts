import { dbService } from '../../services/db.service'
import { AppThunk } from '../feedStore'
import { userReducer } from '../reducers/userSlice'
import { cloudinaryService } from '../../services/cloudinary.service'

export const userActions = {
    loginUser,
    signUp,

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
function signUp(
    user: any,
    profileImgFile: File | null,
    profileBgFile: File | null
): AppThunk {
    return async (dispatch) => {
        try {
            const profileImgUrl = await cloudinaryService.uploadImgToCloud(
                profileImgFile
            )
            const profileBgUrl = await cloudinaryService.uploadImgToCloud(
                profileBgFile
            )
            user.bgImgUrl = profileImgUrl
            user.profileBgUrl = profileBgUrl
            await dbService.addItemToCollection(
                user,
                user.id,
                dbService.POSTS_DB_COLLECTION
            )
            dispatch(userReducer.onSignUp(user))
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
