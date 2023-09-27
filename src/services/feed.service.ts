import { utilService } from './util.service'
import { constsService } from './consts.service'
import { CreatePostDto, FeedPost, User, UserForPost } from './interface.service'

export const feedService = {
    getEmptyPost,
    getRandomProfilePhoto,
    getRandomPosts,
    getEmptyUser,
    getRandomComments,
    getRandomComment,
    getEmptyUserCred,
    getEmptyCreatePostDto
}

function getEmptyPost(user: UserForPost, content: string = '...'): FeedPost {
    return {
        id: 'P-' + utilService.generateId(constsService.ID_LENGTH),
        owner: {
            id: user?.id ? user.id : constsService.GUEST_ID,
            isVerified: user.isVerified,
            displayName: user.displayName,
            username: user.username,
            profileImgUrl: user.profileImgUrl
        },
        content,
        imgUrl: '',
        createdAt: Date.now(),
        likes: 0,
        resqueaks: 0,
        comments: []
    }
}

function getRandomProfilePhoto(): string {
    const randomNum = utilService.getRandomIntInclusive(1, 25)
    const randomGender = utilService.getRandomIntInclusive(1, 2) % 2 === 0 ? 'male' : 'female'
    const avatarUrl = `https://xsgames.co/randomusers/assets/avatars/${randomGender}/${randomNum}.jpg`
    if (randomNum % 2 === 0) return avatarUrl
    else return ''
}

function getRandomPosts(postsCount: number) {
    const posts = []
    for (let i = 0; i < postsCount; i++) {
        posts.push(getRandomPost())
    }
    return posts
}

function getRandomPost() {
    const randomDisplayName = constsService.RANDOM_NAMES[utilService.getRandomIntInclusive(0, 9)]
    const imgUrl = constsService.DEMO_PHOTOS[utilService.getRandomIntInclusive(0, constsService.DEMO_PHOTOS.length - 1)]
    const newRandomPost: FeedPost = {
        id: 'P-' + utilService.generateId(5),
        imgUrl,
        content: utilService.generateRandomSentences(utilService.getRandomIntInclusive(1, 4)),
        owner: {
            displayName: randomDisplayName,
            username: randomDisplayName.toLowerCase(),
            profileImgUrl: getRandomProfilePhoto(),
            isVerified: utilService.getRandomBool(),
            id: 'DEMO-P-' + utilService.generateId(5)
        },
        likedId: [],
        likes: utilService.getRandomIntInclusive(0, 500),
        comments: getRandomComments(utilService.getRandomIntInclusive(0, 7)),
        resqueaks: utilService.getRandomIntInclusive(0, 50),
        createdAt: Date.now()
    }
    return newRandomPost
}

function getEmptyUser() {
    return {} as User
}

function getRandomComments(length: number) {
    let comments = []
    for (let i = 0; i < length; i++) {
        let randomComment = getRandomComment()
        comments.push(randomComment)
    }
    return comments
}

function getRandomComment(displayName: string = 'Guest'): FeedPost {
    // const randomColor = utilService.getRandomColor()
    const owner: UserForPost = {
        id: 'U' + utilService.generateId(5),
        displayName: constsService.RANDOM_NAMES[utilService.getRandomIntInclusive(0, 3)],
        profileImgUrl: `https://source.boringavatars.com/`,
        username: 'demo-user',
        isVerified: utilService.getRandomBool()
    }
    const comment = getEmptyPost(owner, utilService.generateRandomSentences(utilService.getRandomIntInclusive(1, 3)))
    return comment
}

function getEmptyUserCred() {
    return {
        username: '',
        password: '',
        email: ''
    }
}
function getEmptyCreatePostDto(): CreatePostDto {
    return {
        userId: '',
        content: '',
        imgUrl: null
    }
}
