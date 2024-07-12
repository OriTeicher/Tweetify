import React from 'react'
import SqueakBox from '../cmps/feed/SqueakBox'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { useNavigate } from 'react-router-dom'
import { FeedPreview } from '../cmps/feed/FeedPreview'
import { ArrowBackRounded } from '@mui/icons-material'

export default function ReplySqueakPage() {
    const { selectedSqueak } = useSelector((state: RootState) => {
        return state.feed
    })
    const { loggedInUser } = useSelector((state: RootState) => {
        return state.user
    })

    const navigate = useNavigate()
    const handleGoBack = () => navigate('/home')

    return (
        <>
            <section className="feed-index reply-page-container">
                <ArrowBackRounded onClick={handleGoBack} className="arrow-back" />

                <div className="selected-post-container">
                    {selectedSqueak && (
                        <FeedPreview
                            id={selectedSqueak.id}
                            owner={selectedSqueak.owner}
                            content={selectedSqueak.content}
                            imgUrl={selectedSqueak.imgUrl}
                            createdAt={selectedSqueak.createdAt}
                            likes={selectedSqueak?.likes}
                            comments={selectedSqueak?.comments}
                            resqueaks={selectedSqueak?.resqueaks}
                        />
                    )}
                </div>
                <div className="squeakbox-container">
                    <SqueakBox loggedInUser={loggedInUser} addPost={() => {}} />
                </div>

                <div className="comments-list">
                    {selectedSqueak?.comments &&
                        selectedSqueak.comments.map((comment, idx) => (
                            <>
                                <FeedPreview
                                    key={comment.id}
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
