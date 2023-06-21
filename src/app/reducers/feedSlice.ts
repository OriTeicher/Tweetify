import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { feedService } from '../../services/feed.service'

interface FeedState {
    feedPosts: FeedPost[]
    isLoading: boolean
}

interface FeedPost {
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
            state.isLoading = false
        },
        queryFeedPostsFailure: (state) => {
            state.isLoading = false
            const demoPosts = feedService.getRandomPosts(2)
            state.feedPosts = demoPosts
        },
        addFeedPost: (state, action: PayloadAction<string>) => {
            state.isLoading = true
            const newPost = feedService.getEmptyPost(
                'Pukki Blinders',
                'oriteicher',
                action.payload
            )
            state.feedPosts = [newPost, ...state.feedPosts]
            state.isLoading = false
        },
        removeFeedPost: (state, action: PayloadAction<string>) => {
            state.isLoading = true
            state.feedPosts = state.feedPosts.filter(
                (post) => post.txt !== action.payload
            )
            state.isLoading = false
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
