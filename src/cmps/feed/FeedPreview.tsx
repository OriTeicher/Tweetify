import { Avatar } from '@mui/material'
import React, { useState } from 'react'
import FeedContentPreview from './FeedContentPreview'
import { utilService } from '../../services/util.service'
import Loader from '../utils/Loader'
import { FeedPost } from '../../services/interface.service'
import SqueakBox from './SqueakBox'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/feedStore'
import FeedPreviewIcons from './FeedPreviewIcons'

const FeedPreview: React.FC<FeedPost> = ({
    id,
    owner,
    content,
    imgUrl,
    createdAt,
    likes,
    comments,
    resqueaks
}) => {
    const [isCommentsClicked, setIsCommentsClicked] = useState(false)

    const { loggedInUser } = useSelector((state: RootState) => {
        return state.user
    })
    const { isPostLoading } = useSelector((state: RootState) => {
        return state.loader
    })

    const handleCommentClick = () => setIsCommentsClicked(!isCommentsClicked)

    return (
        <>
            <section className="post-preview">
                {isPostLoading && id ? (
                    <Loader />
                ) : (
                    <div className="top-preview">
                        <Avatar
                            src={owner?.profileImgUrl}
                            className="user-avatar"
                        >
                            {utilService.getInitials(owner.displayName)}
                        </Avatar>

                        <FeedContentPreview
                            // ? passing id to know which post to change due to ceratin action
                            id={id}
                            displayName={owner.displayName}
                            username={owner.username}
                            verified={owner.isVerified}
                            createdAt={createdAt}
                            content={content}
                            imgUrl={imgUrl}
                        />
                    </div>
                )}
                <FeedPreviewIcons
                    likesNum={likes}
                    commentsNum={comments.length}
                    resqueaksNum={resqueaks}
                    onIconClick={() => {}}
                />
            </section>
            {isCommentsClicked && (
                <div className="post-list comments-list">
                    <SqueakBox
                        loggedInUser={loggedInUser}
                        addPost={() => console.log('you')}
                    />
                    {comments.map((comment, idx) => (
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
                </div>
            )}
        </>
    )
}

export default FeedPreview
