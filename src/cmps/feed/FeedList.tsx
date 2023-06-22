import React from 'react'
import FeedPreview from './FeedPreview'
import { log } from 'console'

interface FeedListProps {
    feedPosts: FeedPost[]
    handleIconClicked: Function
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
        imgUrl?: string
    }
    verified: boolean
    createdAt: number
    likes: number
    comments: object[]
    resqueaks: number
}

const FeedList: React.FC<FeedListProps> = ({
    feedPosts,
    handleIconClicked,
    isPostLoading
}) => {
    const onIconClicked = (action: {
        type: string
        postId: string
        isStatIncrease: boolean
    }) => {
        handleIconClicked(action)
    }

    return (
        <section className="posts-list">
            {feedPosts.map((post, idx) => (
                <FeedPreview
                    key={idx}
                    id={post.id}
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
                    isPostLoading={isPostLoading}
                    handleIconClicked={(action: {
                        type: string
                        postId: string
                        isStatIncrease: boolean
                    }) => onIconClicked(action)}
                />
            ))}
        </section>
    )
}

export default FeedList
