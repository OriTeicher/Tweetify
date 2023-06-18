import { getCurrentDate, getRandomIntInclusive } from './util.service'

export const feedService = {
    getEmptyPost() {
        return {
            displayName: '',
            username: '',
            txt: '',
            imgUrl: '',
            avatar: '',
            verified: false,
            createdAt: ''
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
            const imgUrl = demoPhotos[getRandomIntInclusive(0, 9)]
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
    'https://fastly.picsum.photos/id/981/200/300.jpg?hmac=H3LDLzNJiLGQYdx_Q7g_Us-x8VxR-aK5TglLyGlQHDk',
    'https://fastly.picsum.photos/id/794/200/300.jpg?hmac=uZge4lPPf2bQz7AS6pyH7_nwhFp9IQ3OPKOpQ33Zypk',
    'https://fastly.picsum.photos/id/894/200/200.jpg?hmac=h3PvihhxRrUznPuW-OPbq7zxa0On5jLsyYbWwI6nW6w',
    'https://fastly.picsum.photos/id/504/200/300.jpg?hmac=mycti8qYrnGcag5zUhsVOq7hQwb__R-Zf--aBJAH_ec',
    '',
    '',
    '',
    '',
    '',
    ''
]
