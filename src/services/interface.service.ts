// ? CONTAINS RE-USABLE INTERFACES

export type UserForPost = Pick<User, 'id' | 'displayName' | 'username' | 'profileImgUrl' | 'isVerified'>

export interface FeedPost {
    id: string
    owner: UserForPost
    content: string
    imgUrl?: string
    createdAt: number
    likes: number
    comments: FeedPost[]
    resqueaks: number
    likedId?: string[]
}

export interface Trend {
    category: string
    title: string
    tweetsCount: number
}

export interface User {
    id: string
    email: string
    createdAt: number | string
    followers: string[]
    following: string[]
    isAdmin: boolean
    isVerified: boolean
    username: string
    description: string
    postsId: string[]
    displayName: string
    profileBgUrl: string
    profileImgUrl: string
}

export interface CreateUserDto {
    email: string
    username: string
    password: string
    description: string
    displayName: string
    profileImgUrl?: string
    profileBgUrl?: string
}

export interface UpdateUserDto {
    description: string
    displayName: string
    profileImgUrl?: string
    profileBgUrl?: string
}

export interface CreatePostDto {
    userId: string
    content: string
    imgUrl?: string
}
