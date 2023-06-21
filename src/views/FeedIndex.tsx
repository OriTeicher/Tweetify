import { RootState } from '../app/feedStore'
import { Action } from '@reduxjs/toolkit'
import { feedActions } from '../app/actions/feedActions'
import { useSelector, useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { useEffect } from 'react'
import FeedTopbar from '../cmps/feed/FeedTopbar'
import FeedList from '../cmps/feed/FeedList'
import SqueakBox from '../cmps/feed/SqueakBox'
import MobileTopbar from '../cmps/feed/MobileTopbar'
import Loader from '../cmps/utils/Loader'

interface FeedIndexProps {
    topBarOption: string
}

const FeedIndex: React.FC<FeedIndexProps> = ({ topBarOption }) => {
    const { feedPosts, isLoading } = useSelector((state: RootState) => {
        return state.feed
    })

    const dispatch: ThunkDispatch<
        RootState,
        undefined,
        Action<string>
    > = useDispatch()
    useDispatch()

    useEffect(() => {
        dispatch(feedActions.queryFeedPosts())
    }, [dispatch])

    const addPost = async (postContent: string) => {
        dispatch(feedActions.addFeedPost(postContent))
    }

    const onPostIconClicked = (action: { type: string; postId: string }) => {
        console.log(action, 'feedindex')
        switch (action.type) {
            case 'removeFeedPost':
                dispatch(feedActions.removeFeedPost(action.postId))
        }
    }

    return (
        <section className="feed-index">
            <MobileTopbar />
            <FeedTopbar topBarOption={topBarOption} />
            <SqueakBox addPost={addPost} />
            {isLoading ? (
                <Loader />
            ) : (
                feedPosts && (
                    <FeedList
                        feedPosts={feedPosts}
                        handleIconClicked={(action: {
                            type: string
                            postId: string
                        }) => onPostIconClicked(action)}
                    />
                )
            )}
        </section>
    )
}

export default FeedIndex
