// * FEED INTERFACES

export interface FeedIndexProps {
    topBarOption: string
}

export interface FeedPost {
    filterBy: string
    id: string
    owner: Owner
    content: string
    imgUrl?: string
    createdAt: number
    likes: number
    comments: FeedPost[]
    resqueaks: number
    handleIconClicked: Function
    onAddComment: Function
    isPostLoading: boolean
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

export interface Owner {
    userId: string
    displayName: string
    username: string
    profileImgUrl?: string
    isVerified: boolean
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

// * users

export interface User {}
