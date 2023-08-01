import { utilService } from './util.service'
export const userService = {
    getEmptyUser
}

// TODO: login

// TODO: sign up function

// TODO: get empty user function
function getEmptyUser() {
    return {
        isAdmin: false,
        isVerified: false,
        id: 'U-' + utilService.generateId(5),
        username: '',
        password: '',
        displayName: '',
        description: '',
        bgImgUrl: '',
        profileImgUrl: '',
        postsId: [],
        followers: [],
        following: [],
        createdAt: utilService.getJoinedDateFormat()
    }
}
