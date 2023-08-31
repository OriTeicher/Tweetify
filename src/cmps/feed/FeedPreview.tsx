import React from 'react'
import FeedContentPreview from './FeedContentPreview'
import Loader from '../utils/Loader'
import { Avatar } from '@mui/material'
import { FeedPost } from '../../services/interface.service'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { constsService } from '../../services/consts.service'
import { eventBus } from '../../services/event.bus.service'
import FeedPreviewIcons from './FeedPreviewIcons'
import { Action, ThunkDispatch } from '@reduxjs/toolkit'
import { feedActions } from '../../app/actions/feed.actions'

export const FeedPreview: React.FC<FeedPost> = (props: FeedPost) => {
    const { isPostLoading } = useSelector((state: RootState) => {
        return state.loader
    })

    const { loggedInUser } = useSelector((state: RootState) => {
        return state.user
    })
    const dispatch: ThunkDispatch<RootState, undefined, Action<string>> = useDispatch()
    const isLiked = props.likedId?.includes(loggedInUser.id) || false

    // TODO: handle icon click function - switch function
    const handleIconClick = (selectedIcon: string) => {
        switch (selectedIcon) {
            case constsService.LIKES_FIELD:
                dispatch(feedActions.toggleStats(props.id, isLiked))
                break
            case constsService.COMMENTS_FIELD:
                handleSelectedSqueak(props)
                break
        }
    }

    const handleSelectedSqueak = (selectedSqueak: FeedPost) => {
        eventBus.emitEvent('setSelectedSqueak', selectedSqueak)
    }

    return (
        <section className="post-preview">
            {isPostLoading ? (
                <Loader />
            ) : (
                <div className="top-preview">
                    <div className="avatar-container">
                        <Avatar src={props.owner?.profileImgUrl} className="user-avatar" />
                        <div className="link-line"></div>
                    </div>
                    <div className="  ">
                        <FeedContentPreview
                            id={props.id}
                            displayName={props.owner.displayName}
                            username={props.owner.username}
                            verified={props.owner.isVerified}
                            createdAt={props.createdAt}
                            content={props.content}
                            imgUrl={props.imgUrl}
                            onReadPost={() => handleSelectedSqueak(props)}
                        />
                        <FeedPreviewIcons isLiked={isLiked} likesNum={props.likes} commentsNum={props.comments.length} resqueaksNum={props.resqueaks} onIconClick={handleIconClick} />
                    </div>
                </div>
            )}
        </section>
    )
}
