import FeedTopbar from './FeedTopbar'
import FeedList from './FeedList'
import SqueakBox from './SqueakBox'
import MobileTopbar from './MobileTopbar'
import { RootState } from '../../app/feedStore'
import { useEffect } from 'react'
import { feedReducers } from '../../app/reducers/feedSlice'
import { useSelector, useDispatch } from 'react-redux'

interface FeedIndexProps {
    selectedOption: string
}

const FeedIndex: React.FC<FeedIndexProps> = ({ selectedOption }) => {
    const { feedPosts } = useSelector((state: RootState) => state.feed)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(feedReducers.queryFeedPosts())
        console.log(feedPosts)
    }, [dispatch])

    const addPost = async (postContent: string) => {
        dispatch(feedReducers.addFeedPost(postContent))
    }

    const onPostIconClicked = (action: { type: string; postId: string }) => {
        console.log(action)
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
