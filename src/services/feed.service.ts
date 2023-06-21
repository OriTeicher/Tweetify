import {
    getCurrentDate,
    getRandomColor,
    getRandomIntInclusive
} from './util.service'

export const feedService = {
    getEmptyPost(
        displayName: string = 'Guest',
        username: string = 'guestUser01',
        txt: string = '...'
    ) {
        return {
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
            comments: []
        }
    },
    getRandomPosts(postsCount: number) {
        const names = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Emily Brown']
        const posts = []

        for (let i = 0; i < postsCount; i++) {
            const displayName =
                names[getRandomIntInclusive(0, names.length - 1)]
            const username = displayName.toLowerCase().replace(/\s/g, '')
            const txt = this.generateRandomSentences(1)
            const imgUrl =
                demoPhotos[getRandomIntInclusive(0, demoPhotos.length - 1)]
            const avatar = { bgColor: getRandomColor(), imgUrl: '' }
            const verified = Math.random() < 0.5
            const createdAt = getCurrentDate()

            const post = {
                displayName,
                username,
                txt,
                imgUrl,
                avatar,
                verified,
                createdAt,
                likes: getRandomIntInclusive(0, 500),
                comments: this.getRandomComments(getRandomIntInclusive(0, 3)),
                resqueaks: getRandomIntInclusive(0, 50)
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
            displayName: names[getRandomIntInclusive(0, names.length - 1)],
            username: displayName.toLowerCase().replace(/\s/g, ''),
            txt: this.generateRandomSentences(1),
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

    generateRandomSentences(sentencesCount: number) {
        const sentences = [
            'Just witnessed the most breathtaking sunset. Nature never fails to amaze me! 🌅 #sunsetlovers',
            'New blog post alert! Check out my latest article on productivity hacks. 💪 #productivitytips',
            "Finally tried that new restaurant everyone's been raving about. The food was absolutely delicious! 🍽️ #foodie",
            'Feeling grateful for the little things in life that bring joy. #gratitude',
            "Currently binge-watching my favorite TV series. Can't get enough of these characters! 📺 #binge",
            'Excited to announce my upcoming book release. Stay tuned for more details! 📚 #authorlife',
            'Just finished an intense workout. Feeling the burn but also feeling accomplished! 💪 #fitnessmotivation',
            'Nothing beats a cozy evening with a good book and a hot cup of tea. 📖☕ #bookworm',
            'Had a great time catching up with old friends. Cherishing these moments! 👥 #friendship',
            'Sunday vibes: lazy mornings, pajamas, and a cup of coffee. ☕️ #SundayMorning',
            'Just booked my dream vacation! Counting down the days. ✈️🌴 #travel',
            'Trying out a new recipe today. Fingers crossed it turns out delicious! 🍳 #cooking',
            'Feeling inspired after attending an incredible TED talk. #inspiration',
            'Just saw the most amazing art exhibition. The talent and creativity were mind-blowing! 🎨 #artlover',
            "Celebrating a milestone today. It's been an incredible journey so far! 🎉 #milestone",
            'Nothing like a good laugh with friends to brighten up the day. 😂 #laughter',
            "Feeling motivated to crush my goals this week. Let's do this! 💥 #goalsetter",
            'Woke up to a beautiful sunrise. Grateful for another day! 🌄 #grateful',
            'Attended an insightful workshop that expanded my knowledge. #learning',
            'Just discovered a hidden gem of a cafe. The ambiance and coffee are top-notch! ☕️ #coffeelover',
            'Feeling nostalgic listening to my favorite childhood songs. 🎶 #throwback',
            'Enjoying a peaceful evening walk. Clearing my mind and finding inner peace. 🚶‍♀️ #mindfulness',
            "Started a new hobby, and it's bringing so much joy into my life. 🎨 #hobby",
            'Having a movie marathon with popcorn and blankets. Perfect way to unwind! 🍿🎥 #movienight',
            'Feeling accomplished after completing a challenging project. Hard work pays off! 💼 #achievement',
            'Reflecting on the past year and feeling grateful for the lessons learned. 📆 #selfreflection',
            'Just adopted the cutest puppy. My heart is full of love! 🐶❤️ #puppylove',
            'Attended a live concert last night. The energy and music were electrifying! 🎶🎤 #musiclover',
            "Enjoying a scenic hike surrounded by nature's beauty. 🌳 #hikingadventures",
            'Indulging in a guilty pleasure: a slice of decadent chocolate cake. 🍰 #sweettooth',
            'Feeling inspired by the amazing community of passionate individuals. Together, we can make a difference! 🤝 #community',
            'Just finished reading the worst book ever, i wanna punch someone :( '
        ]
        return sentences[getRandomIntInclusive(0, sentences.length - 1)]
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
