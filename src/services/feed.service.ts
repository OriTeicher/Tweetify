import { getRandomIntInclusive } from './util.service'

export const feedService = {
    getEmptyPost() {
        return {
            displayName: '',
            username: '',
            txt: '',
            image: '',
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
                getRandomIntInclusive(10, 50)
            )
            const image = `https://example.com/image${i + 1}.jpg`
            const avatar = `https://example.com/avatar${i + 1}.jpg`
            const verified = Math.random() < 0.5
            const createdAt = new Date().toISOString()

            const post = {
                displayName,
                username,
                txt,
                image,
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
