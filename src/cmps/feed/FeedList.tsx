import React from 'react'
import FeedPreview from './FeedPreview'
import { FeedListProps } from '../../services/interface.service'

const FeedList: React.FC<FeedListProps> = ({
    feedPosts,
    handleIconClicked,
    isPostLoading,
    filterBy,
    onAddComment
}) => {
    const onIconClicked = (action: {
        type: string
        postId: string
        isStatIncrease: boolean
    }) => {
        handleIconClicked(action)
    }

    const handleAddComment = (
        post: string,
        file: File | null,
        gifUrl: string,
        postId: string
    ) => {
        onAddComment(post, file, gifUrl, postId)
    }

    return (
        <section className="posts-list">
            {feedPosts.length ? (
                feedPosts.map((post, idx) => (
                    <FeedPreview
                        filterBy={filterBy}
                        key={idx}
                        id={post.id}
                        owner={post.owner}
                        content={post.content}
                        imgUrl={post.imgUrl}
                        createdAt={post.createdAt}
                        likes={post.likes}
                        comments={post.comments}
                        resqueaks={post.resqueaks}
                        isPostLoading={isPostLoading}
                        onAddComment={handleAddComment}
                        handleIconClicked={(action: {
                            type: string
                            postId: string
                            stat: string
                            isStatIncrease: boolean
                        }) => onIconClicked(action)}
                    />
                ))
            ) : (
                <p style={{ textAlign: 'center', margin: '10px 0px' }}>
                    No Squeaks for you 🥲
                </p>
            )}
        </section>
    )
}

export default FeedList
