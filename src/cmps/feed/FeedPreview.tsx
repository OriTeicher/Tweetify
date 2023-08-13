/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import FeedContentPreview from './FeedContentPreview'
import Loader from '../utils/Loader'
import { Avatar } from '@mui/material'
import { FeedPost } from '../../services/interface.service'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { constsService } from '../../services/consts.service'
import { eventBus } from '../../services/event.bus.service'

export const FeedPreview: React.FC<FeedPost> = (props: FeedPost) => {
    const { isPostLoading } = useSelector((state: RootState) => {
        return state.loader
    })

    // TODO: handle icon click function - switch function
    const handleIconClick = (selectedIcon: string) => {
        switch (selectedIcon) {
            case constsService.LIKES_FIELD:
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
        <>
            <section className="post-preview">
                {isPostLoading ? (
                    <Loader />
                ) : (
                    <div className="top-preview">
                        <div className="avatar-container">
                            <Avatar src={props.owner?.profileImgUrl} className="user-avatar" />
                            <div className="link-line"></div>
                        </div>
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
                    </div>
                )}
            </section>
        </>
    )
}
