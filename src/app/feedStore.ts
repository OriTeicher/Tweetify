import { configureStore } from '@reduxjs/toolkit'
import feedReducer from './reducers/feedSlice'

// Define RootState type
export type RootState = ReturnType<typeof store.getState>

// Create the Redux store using configureStore
const store = configureStore({
    reducer: {
        feed: feedReducer
    }
})

export default store
