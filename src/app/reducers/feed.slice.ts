import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FeedPost } from '../../services/interface.service'

export interface FeedState {
    feedPosts: FeedPost[]
    currPageName: string
    filterBy: string
    selectedSqueak?: FeedPost
}

export const initialState: FeedState = {
    feedPosts: [],
    currPageName: 'home',
    filterBy: '',
    selectedSqueak: {} as FeedPost
}

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        queryFeedPostsSuccess: (state, action: PayloadAction<FeedPost[]>) => {
            state.feedPosts = [...action.payload]
        },
        
        addFeedPostSuccess: (state, action: PayloadAction<FeedPost>) => {
            state.feedPosts = [action.payload, ...state.feedPosts]
        },

        removeFeedPostSuccess: (state, action: PayloadAction<string>) => {
            state.feedPosts = state.feedPosts.filter((post) => post.id !== action.payload)
        },

        toggleStatsSuccess: () => {},

        setFilterBySuccess: (state, action: PayloadAction<string>) => {
            state.filterBy = action.payload
        },

        addCommentSuccess: (state, action: PayloadAction<FeedPost[]>) => {
            const idx = state.feedPosts.findIndex((post) => post.id === action.payload[0].id)
            const updatedPost = state.feedPosts[idx]
            updatedPost.comments.unshift(action.payload[0].comments[0])
            state.feedPosts = [...state.feedPosts, updatedPost]
        },
        setSelectedSqueak: (state, action: PayloadAction<FeedPost>) => {
            state.selectedSqueak = action.payload
        }
    }
})

export const feedReducers = feedSlice.actions
export default feedSlice.reducer
