import React from 'react'
import FeedPreview from './FeedPreview'
import { FeedPost } from '../../services/interface.service'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'

export interface FeedListProps {
    feedPosts: FeedPost[]
}

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
                <section className="no-squeaks-container">
                    <SentimentVeryDissatisfiedIcon />
                    <p className="no-squeaks-para">
                        No Squeaks for you right now
                    </p>
                    <SentimentVeryDissatisfiedIcon />
                </section>
            )}
        </section>
    )
}

export default FeedList
