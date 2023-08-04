import React from 'react'
import FeedPreview from './FeedPreview'
import { FeedListProps } from '../../services/interface.service'

const FeedList: React.FC<FeedListProps> = ({ feedPosts }) => {
    return (
        <section className="posts-list">
            {feedPosts.length ? (
                feedPosts.map((post, idx) => (
                    <FeedPreview
                        key={idx}
                        id={post.id}
                        owner={post.owner}
                        content={post.content}
                        imgUrl={post.imgUrl}
                        createdAt={post.createdAt}
                        likes={post.likes}
                        comments={post.comments}
                        resqueaks={post.resqueaks}
                    />
                ))
            ) : (
                <p className='no-squeaks-para'>
                    No Squeaks for you 🥲
                </p>
            )}
        </section>
    )
}

export default FeedList
