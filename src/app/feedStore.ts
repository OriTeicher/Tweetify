import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import feedReducer from './reducers/feedSlice'
import userReducer from './reducers/userSlice'
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>

export type RootState = ReturnType<typeof store.getState>

const store = configureStore({
    reducer: {
        feed: feedReducer,
        user: userReducer
    }
})

export default store
