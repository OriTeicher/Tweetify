import {
    generateId,
    getCurrentDate,
    getRandomIntInclusive
} from './util.service'

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
            avatar: '',
            verified: false,
            createdAt: getCurrentDate(),
            likes: 0
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
                getRandomIntInclusive(20, 80)
            )
            const imgUrl =
                demoPhotos[getRandomIntInclusive(0, demoPhotos.length - 1)]
            const avatar = `https://example.com/avatar${i + 1}.jpg`
            const verified = Math.random() < 0.5
            const createdAt = getCurrentDate()

            const post = {
                displayName,
                username,
                txt,
                imgUrl,
                avatar,
                verified,
                createdAt
            }

            posts.push(post)
        }

        return posts
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
    ''
]
