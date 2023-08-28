import { utilService } from './util.service'
export const userService = {
    getEmptyUser
}


function getEmptyUser() {
    return {
        isAdmin: false,
        isVerified: false,
        id: 'U-' + utilService.generateId(5),
        username: '',
        password: '',
        displayName: '',
        description: '',
        email: '',
        bgImgUrl: '',
        profileImgUrl: '',
        postsId: [],
        followers: [],
        following: [],
        createdAt: utilService.getJoinedDateFormat()
    }
}
