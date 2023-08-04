import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { Action } from '@reduxjs/toolkit'
import { feedActions } from '../../app/actions/feed.actions'
import { ThunkDispatch } from 'redux-thunk'
import FeedTopbar from './FeedTopbar'
import FeedList from './FeedList'
import SqueakBox from './SqueakBox'
import MobileTopbar from './MobileTopbar'
import Loader from '../utils/Loader'
import { FeedIndexProps } from '../../services/interface.service'

const FeedIndex: React.FC<FeedIndexProps> = ({ topBarOption }) => {
    const { feedPosts } = useSelector((state: RootState) => {
        return state.feed
    })

    const { isAppLoading } = useSelector((state: RootState) => {
        return state.loader
    })

    const { loggedInUser } = useSelector((state: RootState) => {
        return state.user
    })

    const dispatch: ThunkDispatch<
        RootState,
        undefined,
        Action<string>
    > = useDispatch()

    useEffect(() => {
        dispatch(feedActions.queryFeedPosts())
    }, [dispatch])

    const handleAddPost = async (
        postContent: string,
        file: File | null,
        gifUrl: string
    ) => {
        dispatch(
            feedActions.addFeedPost(loggedInUser, postContent, file, gifUrl)
        )
    }

    return (
        <section className="feed-index">
            <MobileTopbar />
            <FeedTopbar topBarOption={topBarOption} />
            <SqueakBox addPost={handleAddPost} loggedInUser={loggedInUser} />
            {isAppLoading ? <Loader /> : <FeedList feedPosts={feedPosts} />}
        </section>
    )
}

export default FeedIndex
