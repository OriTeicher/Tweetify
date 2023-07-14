import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FeedPost, FeedState } from '../../services/interface.service'

export const initialState: FeedState = {
    feedPosts: [],
    isAppLoading: true,
    isPostLoading: false,
    isNewPostLoading: false,
    currPage: 'home',
    filterBy: ''
}

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        queryFeedPostsSuccess: (state, action: PayloadAction<FeedPost[]>) => {
            state.feedPosts = action.payload.sort(
                (a, b) => b.createdAt - a.createdAt
            )
            state.isAppLoading = false
        },
        addFeedPostSuccess: (state, action: PayloadAction<FeedPost>) => {
            state.feedPosts = [action.payload, ...state.feedPosts]
            state.isNewPostLoading = false
            console.log(state.feedPosts)
        },
        removeFeedPostSuccess: (state, action: PayloadAction<string>) => {
            state.feedPosts = state.feedPosts.filter(
                (post) => post.id !== action.payload
            )
            state.isPostLoading = false
        },
        toggleStatsSuccess: (
            state,
            action: PayloadAction<{
                postId: string
                stat: string
                isIncrease: boolean
            }>
        ) => {
            const idx = state.feedPosts.findIndex(
                (post) => post.id === action.payload.postId
            )
            const updatedPost = state.feedPosts[idx]
            action.payload.isIncrease
                ? updatedPost.likes++
                : updatedPost.likes--
            console.log(updatedPost.likes)
        },
        setAppLoaderActive: (state) => {
            state.isAppLoading = true
        },
        setPostLoaderActive: (state) => {
            state.isPostLoading = true
        },
        setNewPostLoaderActive: (state) => {
            state.isNewPostLoading = true
        },
        setFilterBy: (state, action: PayloadAction<string>) => {
            state.filterBy = action.payload
        }
    }
})

export const feedReducers = feedSlice.actions
export default feedSlice.reducer
