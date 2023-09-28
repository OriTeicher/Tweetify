import { Trend } from '../../services/interface.service'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TrendsState {
    trends: Trend[]
}

export const initialState: TrendsState = {
    trends: []
}

const trendsSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        setTrends: (state, action: PayloadAction<Trend[]>) => {
            state.trends = [...action.payload]
        }
    }
})

export const trendsReducer = trendsSlice.actions
export default trendsSlice.reducer
