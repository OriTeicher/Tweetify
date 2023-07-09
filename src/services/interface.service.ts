// * FEED INTERFACES

export interface FeedIndexProps {
    topBarOption: string
}

export interface FeedPost {
    id: string
    displayName: string
    username: string
    txt: string
    imgUrl?: string
    avatar: {
        bgColor: string
        imgUrl?: string
    }
    verified: boolean
    createdAt: number
    likes: number
    comments: object[]
    resqueaks: number
}

export interface FeedListProps {
    feedPosts: FeedPost[]
    handleIconClicked: Function
    isPostLoading: boolean
}

export interface FeedPreviewProps {
    id: string
    displayName: string
    username: string
    txt: string
    imgUrl?: string
    avatar: {
        imgUrl?: string
        bgColor: string
    }
    verified: boolean
    createdAt: number
    likes: number
    comments: object[]
    resqueaks: number
    handleIconClicked: Function
    isPostLoading: boolean
}

export interface FeedPostAction {
    type: string
    postId: string
    stat: string
    isStatIncrease: boolean
}

export interface FeedState {
    feedPosts: FeedPost[]
    isAppLoading: boolean
    isPostLoading: boolean
    isNewPostLoading: boolean
    currPage: string
}

export interface ImgModalProps {
    imgUrl: string
}
