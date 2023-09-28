import { AppThunk } from '../store'
import { constsService } from '../../services/consts.service'
import { FeedPost, Trend } from '../../services/interface.service'
import { trendsReducer } from '../reducers/trends.slice'
import { trendsService } from '../../services/trends.service'
export const trendsActions = {
    getEmptyTrend,
    getTrends
}

function getEmptyTrend(): Trend {
    return {} as Trend
}

function getTrends(posts: FeedPost[], trendsNum: number = constsService.TRENDS_NUMBER): AppThunk {
    return async (dispatch) => {
        const text = trendsService.extractTextFromPosts(posts)
        const words = trendsService.tokenizeText(text)
        const filteredWords = trendsService.filterWords(words)
        const wordFrequency = trendsService.countWordFrequency(filteredWords)
        const sortedWords = trendsService.sortWordsByFrequency(wordFrequency)
        const trends = trendsService.getTopWords(sortedWords, trendsNum)
        dispatch(trendsReducer.setTrends(trends))
    }
}
