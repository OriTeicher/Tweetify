import React from 'react'
import { FeedPost } from '../services/interface.service'
import FeedPreview from '../cmps/feed/FeedPreview'

interface ReplySqueakPagepProps {
    SelectedSqueak: React.ComponentType<any>
    comments: FeedPost[]
}

export default function ReplySqueakPage(props: ReplySqueakPagepProps) {
    const SqueakPreview = props.SelectedSqueak

    return (
        <section className="reply-page-container">
            <SqueakPreview />

            {props.comments.map((comment, idx) => (
            ////// * COMMENTS HERE * //////
                <FeedPreview
                    key={idx}
                    id={comment.id}
                    owner={comment.owner}
                    content={comment.content}
                    imgUrl={comment.imgUrl}
                    createdAt={comment.createdAt}
                    likes={comment.likes}
                    comments={comment.comments}
                    resqueaks={comment.resqueaks}
                />
            ))}
        </section>
    )
}
