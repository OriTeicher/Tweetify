import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import userReducers from './reducers/user.slice'
import feedReducers from './reducers/feed.slice'
import loaderReducers from './reducers/loader.slice'
import trendsReducer from './reducers/trends.slice'
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

export type RootState = ReturnType<typeof store.getState>

const store = configureStore({
    reducer: {
        feed: feedReducers,
        trends: trendsReducer,
        user: userReducers,
        loader: loaderReducers
    }
})

export default store
