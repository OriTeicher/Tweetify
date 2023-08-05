// ? CONTAINS RE-USABLE INTERFACES

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

export interface Owner {
    userId: string
    displayName: string
    username: string
    profileImgUrl?: string
    isVerified: boolean
}

export interface CreateUserDto {
    email: string
    username: string
    password: string
    displayName: string
}
