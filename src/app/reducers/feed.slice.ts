import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FeedPost } from '../../services/interface.service'
import { EMPTY_STR } from '../../services/consts.service'

export interface FeedState {
    feedPosts: FeedPost[]
    currPageName: string
    filterBy: string
    selectedSqueak?: FeedPost
}

export const initialState: FeedState = {
    feedPosts: [],
    currPageName: 'home',
    filterBy: EMPTY_STR,
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
            state.feedPosts.push({ ...action.payload })
            state.feedPosts.sort((a, b) => b.createdAt - a.createdAt)
        },

        removeFeedPostSuccess: (state, action: PayloadAction<string>) => {
            state.feedPosts = state.feedPosts.filter((post) => post.id !== action.payload)
        },

        setFilterBySuccess: (state, action: PayloadAction<string>) => {
            state.filterBy = action.payload
        },
        toggleLikesSuccess: (state, action: PayloadAction<{ isLike: boolean; postId: string }>) => {
            const { isLike, postId } = action.payload
            console.log(isLike, postId)
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
