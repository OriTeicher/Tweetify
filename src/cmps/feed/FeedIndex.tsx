import { RootState } from '../../app/feedStore'
import { Action } from '@reduxjs/toolkit'
import { feedReducers } from '../../app/reducers/feedSlice'
import { queryFeedPosts } from '../../app/actions/feedActions'
import { useSelector, useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { useEffect } from 'react'
import FeedTopbar from './FeedTopbar'
import FeedList from './FeedList'
import SqueakBox from './SqueakBox'
import MobileTopbar from './MobileTopbar'

interface FeedIndexProps {
    topBarOption: string
}

const FeedIndex: React.FC<FeedIndexProps> = ({ topBarOption }) => {
    const { feedPosts } = useSelector((state: RootState) => {
        return state.feed
    })

    const dispatch: ThunkDispatch<
        RootState,
        undefined,
        Action<string>
    > = useDispatch()
    useDispatch()

    useEffect(() => {
        dispatch(queryFeedPosts())
    }, [dispatch])

    const addPost = async (postContent: string) => {
        dispatch(feedReducers.addFeedPost(postContent))
    }

    const onPostIconClicked = (action: { type: string; postId: string }) => {
        dispatch(feedReducers.removeFeedPost(action.postId))
    }

    return (
        <section className="feed-index">
            <MobileTopbar />
            <FeedTopbar topBarOption={topBarOption} />
            <SqueakBox addPost={addPost} />
            {feedPosts && (
                <FeedList
                    feedPosts={feedPosts}
                    handleIconClicked={onPostIconClicked}
                />
            )}
        </section>
    )
}

export default FeedIndex
