import { Avatar } from '@mui/material'
import React from 'react'
import FeedContentPreview from './FeedContentPreview'
import { utilService } from '../../services/util.service'
import Loader from '../utils/Loader'
import { FeedPost } from '../../services/interface.service'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import FeedPreviewIcons from './FeedPreviewIcons'
import { constsService } from '../../services/consts.service'

const FeedPreview: React.FC<FeedPost> = (props: FeedPost) => {
    // TODO: use logged in user in front
    
    const { loggedInUser } = useSelector((state: RootState) => {
        return state.user
    })
    const { isPostLoading } = useSelector((state: RootState) => {
        return state.loader
    })

    // TODO: handle icon click function - switch function
    const handleIconClick = (selectedIcon: string) => {
        switch (selectedIcon) {
            case constsService.LIKES_FIELD:
                console.log(constsService.LIKES_FIELD)
                break
        }
    }

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
        </>
    )
}

export default FeedPreview
