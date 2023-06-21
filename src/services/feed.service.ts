import {
    generateId,
    getCurrentDate,
    getRandomColor,
    getRandomIntInclusive
} from './util.service'
import { addItemToCollection } from '../firsebase'

export const feedService = {
    getEmptyPost(
        displayName: string = 'Guest',
        username: string = 'guestUser01',
        txt: string = '...'
    ) {
        return {
            _id: generateId(),
            displayName,
            username,
            txt,
            imgUrl: '',
            avatar: {
                imgUrl: '',
                bgColor: ''
            },
            verified: false,
            createdAt: getCurrentDate(),
            likes: 0,
            resqueaks: 0,
            comments: [],
            handleIconClicked: () => {}
        }
    },
    getRandomPosts(postsCount: number) {
        const names = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Emily Brown']
        const posts = []

        for (let i = 0; i < postsCount; i++) {
            const displayName =
                names[getRandomIntInclusive(0, names.length - 1)]
            const username = displayName.toLowerCase().replace(/\s/g, '')
            const txt = this.generateRandomSentences(
                getRandomIntInclusive(10, 80)
            )
            const imgUrl =
                demoPhotos[getRandomIntInclusive(0, demoPhotos.length - 1)]
            const avatar = { bgColor: getRandomColor(), imgUrl: '' }
            const verified = Math.random() < 0.5
            const createdAt = getCurrentDate()

            const post = {
                _id: generateId(),
                displayName,
                username,
                txt,
                imgUrl,
                avatar,
                verified,
                createdAt,
                likes: getRandomIntInclusive(0, 500),
                comments: this.getRandomComments(getRandomIntInclusive(0, 3)),
                resqueaks: getRandomIntInclusive(0, 50),
                handleIconClicked: () => {}
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
            _id: generateId(),
            displayName: names[getRandomIntInclusive(0, names.length - 1)],
            username: displayName.toLowerCase().replace(/\s/g, ''),
            txt: this.generateRandomSentences(getRandomIntInclusive(10, 35)),
            imgUrl: '',
            avatar: '',
            verified: false,
            createdAt: getCurrentDate(),
            likes: 0,
            resqueaks: 0,
            comments: []
        }
        return comment
    },

    generateRandomSentences(wordsCount: number) {
        const words = [
            'Lorem',
            'ipsum',
            'dolor',
            'sit',
            'amet',
            'consectetur',
            'adipiscing',
            'elit',
            'sed',
            'do',
            'eiusmod',
            'tempor',
            'incididunt',
            'ut',
            'labore',
            'et',
            'dolore',
            'magna',
            'aliqua',
            'Ut',
            'enim',
            'ad',
            'minim',
            'veniam'
        ]

        let sentence = ''

        for (let i = 0; i < wordsCount; i++) {
            const randomIndex = Math.floor(Math.random() * words.length)
            const randomWord = words[randomIndex]

            if (i === 0) {
                sentence +=
                    randomWord.charAt(0).toUpperCase() + randomWord.slice(1)
            } else {
                sentence += ' ' + randomWord
            }
        }
        return sentence + '.'
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
