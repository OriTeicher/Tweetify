// feedSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { feedService } from '../../services/feed.service'
import { generateId } from '../../services/util.service'

interface FeedState {
    feedPosts: FeedPost[]
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
    resqueaks: number
    comments: Comment[]
}

interface Comment {
    _id: string
    displayName: string
    username: string
    txt: string
    avatar: {
        bgColor: string
        imgUrl: string
    }
    verified: boolean
    createdAt: string
}

const initialState: FeedState = {
    feedPosts: []
}

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        helloWorld: (state) => {
            console.log(state)
            console.log('hello world')
        },
        queryFeedPosts: (state) => {
            debugger
            const randomPosts: FeedPost[] = feedService
                .getRandomPosts(5)
                .map((post) => ({
                    ...post,
                    _id: generateId(),
                    comments: [] as Comment[]
                }))
            state.feedPosts = randomPosts
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
        },
        addFeedComment: (
            state,
            action: PayloadAction<{ postId: string; comment: Comment }>
        ) => {
            const { postId, comment } = action.payload
            const post = state.feedPosts.find((post) => post._id === postId)
            if (post) post.comments.push(comment)
        }
    }
})

export const { addFeedPost, toggleLikes, addFeedComment, queryFeedPosts, helloWorld } =
    feedSlice.actions
export default feedSlice.reducer
