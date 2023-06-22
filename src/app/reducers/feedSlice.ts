import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FeedState {
    feedPosts: FeedPost[]
    isAppLoading: boolean
    isPostLoading: boolean
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
    createdAt: number
    likes: number
    comments: object[]
    resqueaks: number
}

const initialState: FeedState = {
    feedPosts: [],
    isAppLoading: true,
    isPostLoading: false
}

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        queryFeedPostsSuccess: (state, action: PayloadAction<FeedPost[]>) => {
            state.feedPosts = action.payload
            state.isAppLoading = false
        },
        addFeedPostSuccess: (state, action: PayloadAction<FeedPost>) => {
            state.feedPosts = [action.payload, ...state.feedPosts]
            state.isPostLoading = false
            console.log(state.feedPosts)
        },
        removeFeedPostSuccess: (state, action: PayloadAction<string>) => {
            state.feedPosts = state.feedPosts.filter(
                (post) => post.id !== action.payload
            )
            state.isPostLoading = false
        },
        toggleLikesSuccess: (
            state,
            action: PayloadAction<{ postId: string; isLiked: boolean }>
        ) => {
            debugger
            const { postId, isLiked } = action.payload
            const postIdx = state.feedPosts.findIndex(
                (post) => post.id === postId
            )
            if (postIdx) state.feedPosts[postIdx].likes += isLiked ? 1 : -1
        },
        setAppLoaderActive: (state) => {
            state.isAppLoading = true
        },
        setPostLoaderActive: (state) => {
            state.isPostLoading = true
        }
    }
})

export const feedReducers = feedSlice.actions
export default feedSlice.reducer
