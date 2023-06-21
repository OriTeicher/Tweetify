// feedSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { feedService } from '../../services/feed.service'
import { generateId } from '../../services/util.service'

interface FeedState {
    feedPosts: FeedPost[]
    isLoading: boolean
}

interface FeedPost {
    _id: string
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
    handleIconClicked: Function
}

const initialState: FeedState = {
    feedPosts: [],
    isLoading: true
}

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        queryFeedPosts: (state) => {
            const feedPosts = feedService.getRandomPosts(5)
            state.feedPosts = feedPosts.map((post) => post as FeedPost)
            state.isLoading = false
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
            console.log(action.payload)
            state.feedPosts = state.feedPosts.filter(
                (post) => post._id !== action.payload
            )
            state.isLoading = false
        },
        toggleLikes: (
            state,
            action: PayloadAction<{ postId: string; isLiked: boolean }>
        ) => {
            const { postId, isLiked } = action.payload
            const post = state.feedPosts.find((post) => post._id === postId)
            if (post) post.likes += isLiked ? 1 : -1
        }

    }
})

export const feedReducers = feedSlice.actions
export default feedSlice.reducer
