import axios from 'axios'
import { YOUTUBE_API_KEY } from './api.service'
import { log } from 'console'

declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void
        YT: any
    }
}

export const youtubeService = {
    stopSong
}

function stopSong() {
    console.log('stopping')
}
