import { EMPTY_STR } from './consts.service'
import { CreateUserDto, UpdateUserDto, User } from './interface.service'
import { utilService } from './util.service'
export const userService = {
    getEmptyUser,
    getEmptyCreateUserDto,
    getEmptyUpdateUserDto
}

const ID_LENGTH = 5

// TODO: get empty user function
function getEmptyUser(): User {
    return {
        isAdmin: false,
        isVerified: false,
        id: 'U-' + utilService.generateId(ID_LENGTH),
        username: EMPTY_STR,
        displayName: EMPTY_STR,
        description: EMPTY_STR,
        email: EMPTY_STR,
        profileImgUrl: EMPTY_STR,
        profileBgUrl: EMPTY_STR,
        postsId: [],
        followers: [],
        following: [],
        createdAt: utilService.getJoinedDateFormat()
    }
}

function getEmptyCreateUserDto(): CreateUserDto {
    return {
        username: EMPTY_STR,
        password: EMPTY_STR,
        displayName: EMPTY_STR,
        description: EMPTY_STR,
        email: EMPTY_STR,
        profileImgUrl: EMPTY_STR,
        profileBgUrl: EMPTY_STR
    }
}

function getEmptyUpdateUserDto(): UpdateUserDto {
    return {
        displayName: EMPTY_STR,
        description: EMPTY_STR,
        profileImgUrl: EMPTY_STR,
        profileBgUrl: EMPTY_STR
    }
}
