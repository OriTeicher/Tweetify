import { Trend } from './interface.service'
export const trendsService = {
    getRandomTrends
}

function getRandomTrends(count: number) {
    const trendsArr = []
    for (let i = 0; i < count; i++) {
        const newTrend: Trend = {
            category: 'Sports',
            title: 'Cristiano',
            tweetsCount: 3
        }
        trendsArr.push(newTrend)
    }
    return trendsArr
}
