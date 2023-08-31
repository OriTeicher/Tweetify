/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import FeedTopbar from '../cmps/feed/FeedTopbar'
import FeedList from '../cmps/feed/FeedList'
import SqueakBox from '../cmps/feed/SqueakBox'
import MobileTopbar from '../cmps/feed/MobileTopbar'
import Loader from '../cmps/utils/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { Action, ThunkDispatch } from '@reduxjs/toolkit'
import { feedActions } from '../app/actions/feed.actions'
import { useNavigate } from 'react-router-dom'
import { eventBus } from '../services/event.bus.service'
import { FeedPost } from '../services/interface.service'

export interface FeedIndexProps {
    topBarOption: string
}

const FeedIndex: React.FC<FeedIndexProps> = (props: FeedIndexProps) => {
    const navigate = useNavigate()

    const { feedPosts } = useSelector((state: RootState) => {
        return state.feed
    })

    const { isAppLoading } = useSelector((state: RootState) => {
        return state.loader
    })

    const { loggedInUser } = useSelector((state: RootState) => {
        return state.user
    })

    const handleSelectedSqueak = (selectedSqueak: FeedPost) => {
        if (!selectedSqueak) return
        navigate(`/home/${selectedSqueak.id}`)
    }

    const dispatch: ThunkDispatch<RootState, undefined, Action<string>> = useDispatch()

    useEffect(() => {
        dispatch(feedActions.queryFeedPosts(feedPosts))
        const cb = (selectedSqueak: [FeedPost]) => {
            dispatch(feedActions.setSelectedSqueak(...selectedSqueak))
            handleSelectedSqueak(...selectedSqueak)
        }
        eventBus.subscribeToEvent('setSelectedSqueak', cb)
        return () => eventBus.unsubscribeFromEvent('setSelectedSqueak', cb)
    }, [])

    const handleAddPost = async (postContent: string, file: File | null, gifUrl: string) => {
        dispatch(feedActions.addFeedPost(loggedInUser, postContent, file, gifUrl))
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
