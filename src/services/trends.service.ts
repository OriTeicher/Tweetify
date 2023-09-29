import { SPACE } from './consts.service'
import { FeedPost, Trend } from './interface.service'
import { utilService } from './util.service'
export const trendsService = {
    countWordFrequency,
    sortWordsByFrequency,
    filterWords,
    tokenizeText,
    extractTextFromPosts,
    getTopWords
}

function countWordFrequency(words: string[]): { [key: string]: number } {
    const wordFrequency: { [key: string]: number } = {}
    for (const word of words) {
        if (wordFrequency[word]) wordFrequency[word]++
        else wordFrequency[word] = 1
    }
    return wordFrequency
}

function sortWordsByFrequency(wordFrequency: { [key: string]: number }): [string, number][] {
    return Object.entries(wordFrequency).sort(([, freqA], [, freqB]) => freqB - freqA)
}

function filterWords(words: string[]): string[] {
    return words.filter((word) => {
        const trendWord = word[word.length - 1] === ',' ? word.slice(0, word.length - 2) : word
        return _isWordValid(trendWord)
    })
}

function _isWordValid(word: string) {
    return utilService.getIsUppercaseLetter(word.charAt(0)) && !/\d/.test(word) && word.length >= 4
}

function tokenizeText(text: string): string[] {
    return text.split(/\s+/)
}

function extractTextFromPosts(posts: FeedPost[]): string {
    return posts.map((post) => post.content).join(SPACE)
}

function getTopWords(sortedWords: [string, number][], n: number): Trend[] {
    return sortedWords.slice(0, n).map(([title, tweetsCount]) => ({
        title,
        tweetsCount
    }))
}
