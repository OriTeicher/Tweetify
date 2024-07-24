import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'

interface MusicState {
    selectedSong: {
        title: string
        artist: string
        imgUrl: string
        isPlaying: boolean
    }
}

export const initialState: MusicState = {
    selectedSong: {
        title: '',
        artist: '',
        imgUrl: '',
        isPlaying: false
    }
}

const musicSlice = createSlice({
    name: 'music',
    initialState,
    reducers: {
        setSelectedSong: (state, action: PayloadAction<any>) => {
            state.selectedSong = action.payload
        },
        setIsPlaying: (state, action: PayloadAction<boolean>) => {
            state.selectedSong.isPlaying = action.payload
        }
    }
})

export const musicReducers = musicSlice.actions
export default musicSlice.reducer
