import { Trend } from './interface.service'

export const trendsService = {
    getRandomTrends
}

function getRandomTrends(count: number): Trend[] {
    const trendsArr: Trend[] = []

    const categories = [
        'Sports',
        'Technology',
        'Entertainment',
        'Politics',
        'Music'
    ]
    const titles = [
        'Cristiano Ronaldo',
        'Blockchain',
        'Movie',
        'Election',
        'Benjamin Netanya'
    ]

    for (let i = 0; i < count; i++) {
        const randomCategoryIndex = Math.floor(
            Math.random() * categories.length
        )
        const randomTitleIndex = Math.floor(Math.random() * titles.length)
        const randomTweetsCount = Math.floor(Math.random() * 10) + 1

        const newTrend: Trend = {
            category: categories[randomCategoryIndex],
            title: titles[randomTitleIndex],
            tweetsCount: randomTweetsCount
        }

        trendsArr.push(newTrend)
    }

    return trendsArr
}
