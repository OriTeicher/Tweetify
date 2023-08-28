import { CreateUserDto, User } from './interface.service'
import { utilService } from './util.service'
export const userService = {
    getEmptyUser,
    getEmptyCreateUserDto
}


// TODO: get empty user function
function getEmptyUser(): User {
    return {
        isAdmin: false,
        isVerified: false,
        id: 'U-' + utilService.generateId(5),
        username: '',
        displayName: '',
        description: '',
        email: '',
        profileImgUrl: '',
        profileBgUrl: '',
        postsId: [],
        followers: [],
        following: [],
        createdAt: utilService.getJoinedDateFormat()
    }
}

function getEmptyCreateUserDto(): CreateUserDto {
    return {
        username: '',
        password: '',
        displayName: '',
        description: '',
        email: '',
        profileImgUrl: '',
        profileBgUrl: '',
    }
}