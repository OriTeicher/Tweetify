import { AnyAction } from '@reduxjs/toolkit'

import { musicReducers } from '../reducers/music.slice'
import { AppThunk } from '../store'
import { youtubeService } from '../../services/youtube.service'

export const musicActions = {
    setSelectedSong,
    setIsPlaying,
    stopSong
}

function setSelectedSong(songDetails: any): AppThunk<any> {
    return async (dispatch) => {
        try {
            dispatch(musicReducers.setSelectedSong(songDetails))
            dispatch(musicReducers.setIsPlaying(true))
        } catch (error) {
            console.log('Login Failed.' + error)
        }
    }
}

function setIsPlaying(isPlaying: boolean): AppThunk<any> | AnyAction | any {
    return async (dispatch: any) => {
        try {
            console.log('isPlaying', isPlaying)
            dispatch(musicReducers.setIsPlaying(isPlaying))
        } catch (error) {
            console.log('Login Failed.' + error)
        }
    }
}

function stopSong(): any {
    return async () => {
        try {
            await youtubeService.stopSong()
        } catch (error) {
            console.log('Login Failed.' + error)
        }
    }
}
