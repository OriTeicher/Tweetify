import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import feedReducer from './reducers/feedSlice'
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>

export type RootState = ReturnType<typeof store.getState>

const store = configureStore({
    reducer: {
        feed: feedReducer
    }
})

export default store
