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
        'Premier League',
        'Chelsea',
        'Goal',
        'Mourinho',
        'Pep Guardiola',
        'Lionel Messi',
        'Tottenham',
        'Arsenal'
    ]

    const usedTitles: string[] = []

    for (let i = 0; i < count; i++) {
        const randomCategoryIndex = Math.floor(
            Math.random() * categories.length
        )

        let randomTitleIndex = Math.floor(Math.random() * titles.length)
        while (usedTitles.includes(titles[randomTitleIndex])) {
            randomTitleIndex = Math.floor(Math.random() * titles.length)
        }

        usedTitles.push(titles[randomTitleIndex])

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
