import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { feedService } from '../../services/feed.service'

interface FeedState {
    feedPosts: FeedPost[]
    isLoading: boolean
}

interface FeedPost {
    id: string
    displayName: string
    username: string
    txt: string
    imgUrl?: string
    avatar: {
        bgColor: string
        imgUrl: string
    }
    verified: boolean
    createdAt: string
    likes: number
    comments: object[]
    resqueaks: number
}

const initialState: FeedState = {
    feedPosts: [],
    isLoading: true
}

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        queryFeedPostsSuccess: (state, action: PayloadAction<FeedPost[]>) => {
            state.feedPosts = action.payload
        },
        queryFeedPostsFailure: (state) => {},
        addFeedPostSuccess: (state, action: PayloadAction<FeedPost>) => {
            state.feedPosts = [action.payload, ...state.feedPosts]
        },
        removeFeedPostSuccess: (state, action: PayloadAction<string>) => {
            state.feedPosts = state.feedPosts.filter(
                (post) => post.id !== action.payload
            )
        },
        toggleLikes: (
            state,
            action: PayloadAction<{ postId: string; isLiked: boolean }>
        ) => {
            const { postId, isLiked } = action.payload
            const post = state.feedPosts.find((post) => post.txt === postId)
            if (post) post.likes += isLiked ? 1 : -1
        }
    }
})

export const feedReducers = feedSlice.actions
export default feedSlice.reducer
