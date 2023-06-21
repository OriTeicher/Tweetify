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

const onIconClicked = (action: string) => {}

const FeedIndex: React.FC<FeedIndexProps> = ({ selectedOption }) => {
    const { feedPosts } = useSelector((state: RootState) => state.feed)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(feedReducers.queryFeedPosts())
    }, [dispatch])

    const addPost = async (postContent: string) => {
        // const newPost = feedService.getEmptyPost('Guest', 'guest', postContent)
        // await addItemToCollection(newPost, POSTS_DB_COLLECTION)
        // setFeedPosts([...feedPosts, newPost])
    }

    return (
        <section className="feed-index">
            <MobileTopbar />
            <FeedTopbar selectedOption={selectedOption} />
            <SqueakBox addPost={addPost} />
            <FeedList feedPosts={feedPosts} handleIconClicked={onIconClicked} />
        </section>
    )
}

export default FeedIndex
