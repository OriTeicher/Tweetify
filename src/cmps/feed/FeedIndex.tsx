import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/feedStore'
import { Action } from '@reduxjs/toolkit'
import { feedActions } from '../../app/actions/feedActions'
import { ThunkDispatch } from 'redux-thunk'
import FeedTopbar from './FeedTopbar'
import FeedList from './FeedList'
import SqueakBox from './SqueakBox'
import MobileTopbar from './MobileTopbar'
import Loader from '../utils/Loader'
import { FeedIndexProps } from '../../services/interface.service'
import ProfilePage from '../../views/ProfilePage'
import LoginModal from '../utils/LoginModal'

const FeedIndex: React.FC<FeedIndexProps> = ({ topBarOption }) => {
    const { feedPosts, isAppLoading, isPostLoading, isNewPostLoading } =
        useSelector((state: RootState) => {
            return state.feed
        })

    const dispatch: ThunkDispatch<
        RootState,
        undefined,
        Action<string>
    > = useDispatch()

    useEffect(() => {
        dispatch(feedActions.queryFeedPosts())
    }, [dispatch])

    const addPost = async (postContent: string) => {
        dispatch(feedActions.addFeedPost(postContent))
    }

    const onPostIconClicked = (action: {
        type: string
        postId: string
        stat: string
        isStatIncrease: boolean
    }) => {
        switch (action.type) {
            case 'removeFeedPost':
                dispatch(feedActions.removeFeedPost(action.postId))
                break
            case 'toggleStats':
                dispatch(
                    feedActions.toggleStats(
                        action.postId,
                        action.isStatIncrease
                    )
                )
                break
        }
    }

    return (
        <section className="feed-index">
            <MobileTopbar />
            <FeedTopbar topBarOption={topBarOption} />
            {topBarOption === 'Profile' ? (
                <>
                    <ProfilePage />
                </>
            ) : (
                <>
                    <SqueakBox
                        addPost={addPost}
                        isNewPostLoading={isNewPostLoading}
                    />
                    {isAppLoading ? (
                        <Loader />
                    ) : (
                        <FeedList
                            feedPosts={feedPosts}
                            handleIconClicked={(action: {
                                type: string
                                postId: string
                                stat: string
                                isStatIncrease: boolean
                            }) => onPostIconClicked(action)}
                            isPostLoading={isPostLoading}
                        />
                    )}
                </>
            )}
        </section>
    )
}

export default FeedIndex
