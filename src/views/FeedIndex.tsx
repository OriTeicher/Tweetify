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
import { useNavigate } from 'react-router-dom'
import { eventBus } from '../services/event.bus.service'

export interface FeedIndexProps {
    // TODO: fix top bar option -> set it in store
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

    const handleSelectedSqueak = (selectedId: string) => {
        if (!selectedId) return
        navigate(`/home/${selectedId}`)
    }

    const dispatch: ThunkDispatch<RootState, undefined, Action<string>> = useDispatch()

    useEffect(() => {
        dispatch(feedActions.queryFeedPosts())
        const cb = (selectedId: string) => {
            feedActions.setSelectedSqueak(selectedId)
            handleSelectedSqueak(selectedId)
        }
        eventBus.subscribeToEvent('setSelectedSqueakId', cb)
        return () => eventBus.unsubscribeFromEvent('setSelectedSqueakId', cb)
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
