import { utilService } from './util.service'
import { FeedPost, Owner } from './interface.service'
import { constsService } from './consts.service'

export const feedService = {
    getEmptyPost(user: Owner, content: string = '...'): FeedPost {
        return {
            id: 'P-' + utilService.generateId(constsService.ID_LENGTH),
            owner: {
                userId: user.userId ? user.userId : constsService.GUEST_ID,
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
    },

    getRandomProfilePhoto() {
        const randomNum = utilService.getRandomIntInclusive(1, 25)
        const randomGender = utilService.getRandomIntInclusive(1, 2) % 2 === 0 ? 'male' : 'female'
        if (randomNum % 2 === 0) return `https://xsgames.co/randomusers/assets/avatars/${randomGender}/${randomNum}.jpg`
    },
    getRandomPosts(postsCount: number) {
        const names = ['Jermia Defoe', 'Gabriel Jesus Christ', 'Mike Johnson', 'Kevin Davies', 'Barry Kane', 'Gareth Snale', 'Cristi Ronalda', 'Lya Messica', 'Luka Nordic', 'Timmo Cookie']
        const posts = []

        for (let i = 0; i < postsCount; i++) {
            const randomColor = utilService.getRandomColor()
            const id = 'P-' + utilService.generateId(5)
            const displayName = names[utilService.getRandomIntInclusive(0, names.length - 1)]
            const username = displayName.toLowerCase().replace(/\s/g, '')
            const content = utilService.generateRandomSentences(utilService.getRandomIntInclusive(1, 4))
            const owner = {
                displayName,
                username,
                profileImgUrl: this.getRandomProfilePhoto() || `https://source.boringavatars.com/beam/120/Stefan?colors=${randomColor}`,
                isVerified: Math.random() < 0.5
            }

            const imgUrl = demoPhotos[utilService.getRandomIntInclusive(0, demoPhotos.length - 1)]
            const createdAt = Date.now()
            const post = {
                id,
                owner,
                content,
                imgUrl,
                createdAt,
                likes: utilService.getRandomIntInclusive(0, 500),
                comments: this.getRandomComments(utilService.getRandomIntInclusive(0, 7)),
                resqueaks: utilService.getRandomIntInclusive(0, 50)
            }
            posts.push(post)
        }
        return posts
    },

    getEmptyUser() {
        return {} as Owner
    },

    getRandomComments(length: number) {
        let comments = []
        for (let i = 0; i < length; i++) {
            let randomComment: object = this.getRandomComment()
            comments.push(randomComment)
        }
        return comments
    },

    getRandomComment(displayName: string = 'Guest'): object {
        const names = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Emily Brown']
        const randomColor = utilService.getRandomColor()
        const owner: Owner = {
            userId: 'U' + utilService.generateId(5),
            displayName: names[utilService.getRandomIntInclusive(0, 3)],
            profileImgUrl: `https://source.boringavatars.com/beam/120/Stefan?colors=${randomColor}`,
            username: 'demo-user',
            isVerified: true
        }
        const comment = this.getEmptyPost(owner, utilService.generateRandomSentences(utilService.getRandomIntInclusive(1, 3)))
        return comment
    },
    getEmptyUserCred() {
        return {
            username: '',
            password: '',
            email: ''
        }
    }
}

const demoPhotos = [
    'https://picsum.photos/518/288',
    'https://picsum.photos/522/292',
    'https://picsum.photos/516/298',
    'https://picsum.photos/516/258',
    'http://i.stack.imgur.com/SBv4T.gif',
    'https://static.scientificamerican.com/sciam/assets/Image/2019/spinningblackhole.gif',
    'https://media1.giphy.com/media/3oEjI4sFlp73fvEYgw/giphy.gif',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    ''
]
