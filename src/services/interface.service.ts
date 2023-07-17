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
    filterBy: string
    onAddComment: Function
}

export interface Trend {
    category: string
    title: string
    tweetsCount: number
}

export interface FeedPreviewProps {
    filterBy: string
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
    comments: any[]
    resqueaks: number
    handleIconClicked: Function
    isPostLoading: boolean
    onAddComment: Function
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
    filterBy: string
}

export interface ImgModalProps {
    imgUrl: string
}

// * comments

export interface CommentsProps {
    comments: any
}

// * users
