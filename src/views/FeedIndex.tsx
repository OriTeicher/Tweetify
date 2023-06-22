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
    const { feedPosts, isAppLoading, isPostLoading } = useSelector(
        (state: RootState) => {
            return state.feed
        }
    )

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
        console.log('postContent', postContent)
        dispatch(feedActions.addFeedPost(postContent))
    }

    const onPostIconClicked = (action: {
        type: string
        postId: string
        isStatIncrease: boolean
    }) => {
        switch (action.type) {
            case 'removeFeedPost':
                dispatch(feedActions.removeFeedPost(action.postId))
                break
            case 'toggleLikes':
                dispatch(
                    feedActions.toggleLikes(
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
            <SqueakBox addPost={addPost} isPostLoading={isPostLoading} />
            {isAppLoading ? (
                <Loader />
            ) : (
                <FeedList
                    feedPosts={feedPosts}
                    handleIconClicked={(action: {
                        type: string
                        postId: string
                        isStatIncrease: boolean
                    }) => onPostIconClicked(action)}
                    isPostLoading={isPostLoading}
                />
            )}
        </section>
    )
}

export default FeedIndex
