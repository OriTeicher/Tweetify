/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import FeedTopbar from '../cmps/feed/FeedTopbar'
import FeedList from '../cmps/feed/FeedList'
import SqueakBox from '../cmps/feed/SqueakBox'
import MobileTopbar from '../cmps/feed/MobileTopbar'
import Loader from '../cmps/utils/Loader'
import MusicControlIndex from '../cmps/spotify/MusicControlIndex'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { Action, ThunkDispatch } from '@reduxjs/toolkit'
import { feedActions } from '../app/actions/feed.actions'
import { useNavigate } from 'react-router-dom'
import { eventBus } from '../services/event.bus.service'
import { FeedPost } from '../services/interface.service'
import MsgModal from '../cmps/utils/MsgModal'

export interface FeedIndexProps {
    topBarOption: string
}

const FeedIndex: React.FC<FeedIndexProps> = (props: FeedIndexProps) => {
    const navigate = useNavigate()

    const [isMusicPlayerOpen, setIsMusicPlayerOpen] = useState(false)

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
        setTimeout(() => {
            setIsMusicPlayerOpen(true)
        }, 1500)
        const selectedSqueakCb = (selectedSqueak: [FeedPost]) => {
            dispatch(feedActions.setSelectedSqueak(...selectedSqueak))
            handleSelectedSqueak(...selectedSqueak)
        }
        const toggleMusicPlayerCb = () => {
            setIsMusicPlayerOpen((prevState) => !prevState)
        }
        eventBus.subscribeToEvent('setSelectedSqueak', selectedSqueakCb)
        eventBus.subscribeToEvent('toggleMusicPlayer', toggleMusicPlayerCb)
        return () => {
            eventBus.unsubscribeFromEvent('setSelectedSqueak', selectedSqueakCb)
            eventBus.unsubscribeFromEvent('toggleMusicPlayer', toggleMusicPlayerCb)
        }
    }, [])

    const handleAddPost = async (postContent: string, file: File | null, gifUrl: string) => {
        dispatch(feedActions.addFeedPost(loggedInUser, postContent, file, gifUrl))
    }

    return (
        <section className="feed-index">
            <MobileTopbar />
            <FeedTopbar topBarOption={props.topBarOption} />
            <SqueakBox addPost={handleAddPost} loggedInUser={loggedInUser} />
            {isAppLoading ? (
                <Loader />
            ) : (
                <>
                    <FeedList feedPosts={feedPosts} />
                    <MusicControlIndex isOpen={isMusicPlayerOpen} />
                </>
            )}
        </section>
    )
}

export default FeedIndex
