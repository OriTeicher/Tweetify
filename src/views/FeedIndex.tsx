import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { Action } from '@reduxjs/toolkit'
import { feedActions } from '../app/actions/feed.actions'
import { ThunkDispatch } from '@reduxjs/toolkit'
import FeedTopbar from '../cmps/feed/FeedTopbar'
import FeedList from '../cmps/feed/FeedList'
import SqueakBox from '../cmps/feed/SqueakBox'
import MobileTopbar from '../cmps/feed/MobileTopbar'
import Loader from '../cmps/utils/Loader'

export interface FeedIndexProps {
    topBarOption: string
}

const FeedIndex: React.FC<FeedIndexProps> = (props: FeedIndexProps) => {
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
            <FeedTopbar topBarOption={props.topBarOption} />
            <SqueakBox addPost={handleAddPost} loggedInUser={loggedInUser} />
            {isAppLoading ? <Loader /> : <FeedList feedPosts={feedPosts} />}
        </section>
    )
}

export default FeedIndex
