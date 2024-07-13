import { AnyAction } from '@reduxjs/toolkit'
import { spotifyService } from '../../services/spotify.service'
import { musicReducers } from '../reducers/music.slice'
import { AppThunk } from '../store'

export const musicActions = {
    setSelectedSong
}

function setSelectedSong(songDetails: any): AppThunk<any> {
    return async (dispatch) => {
        try {
            dispatch(musicReducers.setSelectedSong(songDetails))
        } catch (error) {
            console.log('Login Failed.' + error)
        }
    }
}
