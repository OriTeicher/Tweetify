 // ? CONTAINS RE-USABLE INTERFACES

// * FEED INTERFACES 
export interface FeedPost {
    id: string
    owner: Owner
    content: string
    imgUrl?: string
    createdAt: number
    likes: number
    comments: FeedPost[]
    resqueaks: number
}


export interface Trend {
    category: string
    title: string
    tweetsCount: number
}

export interface FeedPostAction {
    type: string
    postId: string
    stat: string
    isStatIncrease: boolean
}




// * comments *

// * users *

export interface Owner {
    userId: string
    displayName: string
    username: string
    profileImgUrl?: string
    isVerified: boolean
}
