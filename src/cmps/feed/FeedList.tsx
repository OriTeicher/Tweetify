import React from 'react'
import FeedPreview from './FeedPreview'

interface FeedPostsProps {
    displayName: string
    username: string
    txt: string
    imgUrl: string
    avatar: string
    verified: boolean
    createdAt: string
    likes: number
}

interface FeedListProps {
    feedPosts: FeedPostsProps[]
}

const FeedList: React.FC<FeedListProps> = ({ feedPosts }) => {
    return (
        <section className="posts-list">
            {feedPosts.map((post, index) => (
                <FeedPreview
                    key={index}
                    displayName={post.displayName}
                    username={post.username}
                    txt={post.txt}
                    imgUrl={post.imgUrl}
                    avatar={post.avatar}
                    verified={post.verified}
                    createdAt={post.createdAt}
                    likes={post.likes}
                />
            ))}
        </section>
    )
}

export default FeedList
