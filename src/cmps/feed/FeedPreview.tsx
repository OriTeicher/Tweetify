import { Avatar } from '@mui/material'
import React, { useState } from 'react'
import FeedContentPreview from './FeedContentPreview'
import { utilService } from '../../services/util.service'
import Loader from '../utils/Loader'
import { FeedPost } from '../../services/interface.service'
import SqueakBox from './SqueakBox'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import FeedPreviewIcons from './FeedPreviewIcons'

const FeedPreview: React.FC<FeedPost> = (props: FeedPost) => {
    const [isCommentsClicked, setIsCommentsClicked] = useState(false)

    const { loggedInUser } = useSelector((state: RootState) => {
        return state.user
    })
    const { isPostLoading } = useSelector((state: RootState) => {
        return state.loader
    })

    // TODO: handle icon click function - switch function
    const handleIconClick = (selectedIcon: string) =>
        setIsCommentsClicked(!isCommentsClicked)

    return (
        <>
            <section className="post-preview">
                {isPostLoading ? (
                    <Loader />
                ) : (
                    <div className="top-preview">
                        <Avatar
                            src={props.owner?.profileImgUrl}
                            className="user-avatar"
                        >
                            {utilService.getInitials(props.owner.displayName)}
                        </Avatar>

                        <FeedContentPreview
                            id={props.id}
                            displayName={props.owner.displayName}
                            username={props.owner.username}
                            verified={props.owner.isVerified}
                            createdAt={props.createdAt}
                            content={props.content}
                            imgUrl={props.imgUrl}
                        />
                    </div>
                )}
                <FeedPreviewIcons
                    likesNum={props.likes}
                    commentsNum={props.comments.length}
                    resqueaksNum={props.resqueaks}
                    onIconClick={handleIconClick}
                />
            </section>

            {isCommentsClicked && (
                <div className="post-list comments-list">
                    <SqueakBox
                        loggedInUser={loggedInUser}
                        addPost={() => console.log('you')}
                    />

                    {props.comments.map((comment, idx) => (
                        // * COMMENTS HERE
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
