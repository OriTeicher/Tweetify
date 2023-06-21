import { RootState } from '../../app/feedStore'
import { Action } from '@reduxjs/toolkit'
import { queryFeedPosts, feedReducers } from '../../app/reducers/feedSlice'
import { useSelector, useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { useEffect } from 'react'
import FeedTopbar from './FeedTopbar'
import FeedList from './FeedList'
import SqueakBox from './SqueakBox'
import MobileTopbar from './MobileTopbar'

interface FeedIndexProps {
    selectedOption: string
}

const FeedIndex: React.FC<FeedIndexProps> = ({ selectedOption }) => {
    const { feedPosts } = useSelector((state: RootState) => state.feed)

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
            <FeedTopbar selectedOption={selectedOption} />
            <SqueakBox addPost={addPost} />
            <FeedList
                feedPosts={feedPosts}
                handleIconClicked={onPostIconClicked}
            />
        </section>
    )
}

export default FeedIndex
