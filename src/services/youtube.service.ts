import axios from 'axios'
import { YOUTUBE_API_KEY } from './api.service'

declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void
        YT: any
    }
}

let player: any
let isPlayerReady = false
let playerReadyPromiseResolve: () => void

async function _getSongByTitle(title: string) {
    try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                key: YOUTUBE_API_KEY,
                q: title,
                part: 'snippet',
                maxResults: 1,
                type: 'video'
            }
        })
        return response.data.items[0]
    } catch (err) {
        throw err
    }
}

player = new window.YT.Player('player', {
    height: '0',
    width: '0',
    videoId: '',
    events: {
        onReady: () => {
            console.log('Player is ready')
            isPlayerReady = true
            if (playerReadyPromiseResolve) {
                playerReadyPromiseResolve()
            }
        },
        onStateChange: (event: any) => {
            console.log('event.data', event.data)
            if (event.data === window.YT.PlayerState.ENDED) {
                player.stopVideo()
            }
        }
    }
})

const waitForPlayerReady = () => {
    if (isPlayerReady) {
        return Promise.resolve()
    }
    return new Promise<void>((resolve) => {
        playerReadyPromiseResolve = resolve
        console.log('not ready')
    })
}

export const youtubeService = {
    playSong: async (songTitle: string | undefined) => {
        try {
            const video = await _getSongByTitle(songTitle || '')
            console.log('Song Title:', songTitle)
            if (!video) {
                console.error('Song not found')
                return
            }

            await waitForPlayerReady()
            console.log('Player:', player)
            player.loadVideoById(video.id.videoId)
            player.playVideo()

            return video.id.videoId
        } catch (error) {
            console.error('Error playing song:', error)
        }
    }
}
