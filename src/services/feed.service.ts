import { generateKey } from 'crypto'
import { utilService } from './util.service'

export const feedService = {
    getEmptyPost(
        displayName: string = 'Guest',
        username: string = 'guestUser01',
        txt: string = '...'
    ) {
        return {
            id: utilService.generateId(5),
            displayName,
            username,
            txt,
            imgUrl: '',
            avatar: {
                imgUrl: '',
                bgColor: ''
            },
            verified: false,
            createdAt: utilService.getCurrentDate(),
            likes: 0,
            resqueaks: 0,
            comments: []
        }
    },
    getRandomPosts(postsCount: number) {
        const names = [
            'Jermia Defoe',
            'Gabriel Jesus Christ',
            'Mike Johnson',
            'Kevin Davies',
            'Barry Kane',
            'Gareth Snale',
            'Cristi Ronalda',
            'Lya Messica',
            'Luka Nordic',
            'Timmo Cookie'
        ]
        const posts = []

        for (let i = 0; i < postsCount; i++) {
            const displayName =
                names[utilService.getRandomIntInclusive(0, names.length - 1)]
            const username = displayName.toLowerCase().replace(/\s/g, '')
            const txt = utilService.generateRandomSentences(
                utilService.getRandomIntInclusive(1, 4)
            )
            const imgUrl =
                demoPhotos[
                    utilService.getRandomIntInclusive(0, demoPhotos.length - 1)
                ]
            const avatar = { bgColor: utilService.getRandomColor(), imgUrl: '' }
            const verified = Math.random() < 0.5
            const createdAt = utilService.getCurrentDate()

            const post = {
                displayName,
                username,
                txt,
                imgUrl,
                avatar,
                verified,
                createdAt,
                likes: utilService.getRandomIntInclusive(0, 500),
                comments: this.getRandomComments(
                    utilService.getRandomIntInclusive(0, 3)
                ),
                resqueaks: utilService.getRandomIntInclusive(0, 50)
            }
            posts.push(post)
        }
        return posts
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
        const comment = {
            displayName:
                names[utilService.getRandomIntInclusive(0, names.length - 1)],
            username: displayName.toLowerCase().replace(/\s/g, ''),
            txt: utilService.generateRandomSentences(
                utilService.getRandomIntInclusive(1, 10)
            ),
            imgUrl: '',
            avatar: '',
            verified: false,
            createdAt: utilService.getCurrentDate(),
            likes: 0,
            resqueaks: 0,
            comments: []
        }
        return comment
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
