import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { useNavigate } from 'react-router-dom'
import { FeedPreview } from '../cmps/feed/FeedPreview'
import { ArrowBackRounded } from '@mui/icons-material'
export default function ReplySqueakPage() {
    const { selectedSqueak } = useSelector((state: RootState) => {
        return state.feed
    })

    const navigate = useNavigate()

    const handleGoBack = () => navigate('/home')

    return (
        <>
            <section className="feed-index reply-page-container">
                <ArrowBackRounded onClick={handleGoBack} className="arrow-back" />
                {selectedSqueak && (
                    <FeedPreview
                        id={selectedSqueak.id}
                        owner={selectedSqueak.owner}
                        content={selectedSqueak.content}
                        imgUrl={selectedSqueak.imgUrl}
                        createdAt={selectedSqueak.createdAt}
                        likes={selectedSqueak.likes}
                        comments={selectedSqueak.comments}
                        resqueaks={selectedSqueak?.resqueaks}
                    />
                )}
                <div className="comments-list">
                    {selectedSqueak?.comments &&
                        selectedSqueak.comments.map((comment, idx) => (
                            <>
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
                            </>
                        ))}
                </div>
            </section>
        </>
    )
}
