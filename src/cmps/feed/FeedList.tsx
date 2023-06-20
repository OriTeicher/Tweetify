import React from 'react'
import FeedPreview from './FeedPreview'

interface FeedListProps {
    feedPosts: FeedPostsProps[]
    // onLikeToggle: (isLiked: boolean, idx: number) => void
}
interface FeedPostsProps {
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
    // onLikeToggle: (isLiked: boolean, idx: number) => void
}

const FeedList: React.FC<FeedListProps> = ({ feedPosts }) => {
    return (
        <section className="posts-list">
            {feedPosts.map((post, idx) => (
                <FeedPreview
                    key={idx}
                    displayName={post.displayName}
                    username={post.username}
                    txt={post.txt}
                    imgUrl={post.imgUrl}
                    avatar={post.avatar}
                    verified={post.verified}
                    createdAt={post.createdAt}
                    likes={post.likes}
                    comments={post.comments}
                    resqueaks={post.resqueaks}
                    // onLikeToggle={(isLiked: boolean) =>
                        // onLikeToggle(isLiked, idx)
                    // }
                />
            ))}
        </section>
    )
}

export default FeedList
