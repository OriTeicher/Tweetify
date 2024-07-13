import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'

interface MusicState {
    selectedSongId: ''
}

export const initialState: MusicState = {
    selectedSongId: ''
}

const musicSlice = createSlice({
    name: 'music',
    initialState,
    reducers: {
        setSelectedSong: (state, action: PayloadAction<any>) => {
            state.selectedSongId = action.payload
        }
    }
})

export const musicReducers = musicSlice.actions
export default musicSlice.reducer
