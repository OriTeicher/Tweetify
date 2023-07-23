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
        id: 'USER-' + utilService.generateId(5),
        username: '',
        password: '',
        diplayName: '',
        description: '',
        bgImgUrl: '',
        profileImgUrl: '',
        followers: [],
        following: [],
        createdAt: utilService.getJoinedDateFormat()
    }
}
