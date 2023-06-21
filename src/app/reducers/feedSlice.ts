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
            console.log(feedPosts, ' + + ++ + ++ + + +')
            console.log(state.feedPosts)
            state.isLoading = false
        },
        addFeedPost: (state, action: PayloadAction<FeedPost>) => {
            state.feedPosts = [...state.feedPosts, action.payload]
        },
        toggleLikes: (
            state,
            action: PayloadAction<{ postId: string; isLiked: boolean }>
        ) => {
            const { postId, isLiked } = action.payload
            const post = state.feedPosts.find((post) => post._id === postId)
            if (post) post.likes += isLiked ? 1 : -1
        }
        // addFeedComment: (
        //     state,
        //     action: PayloadAction<{ postId: string; comment: Comment }>
        // ) => {
        //     const { postId, comment } = action.payload
        //     const post = state.feedPosts.find((post) => post._id === postId)
        //     if (post) post.comments.push(comment)
        // }
    }
})

export const feedReducers = feedSlice.actions
export default feedSlice.reducer
