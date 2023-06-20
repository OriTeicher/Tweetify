import React, { useState, useEffect } from 'react'
import FeedTopbar from './FeedTopbar'
import FeedList from './FeedList'
import SqueakBox from './SqueakBox'
import MobileTopbar from './MobileTopbar'
import { getCollectionFromDB, addItemToCollection } from '../../firsebase'
import { POSTS_DB_COLLECTION } from '../../services/db.service'
import { feedService } from '../../services/feed.service'

interface FeedIndexProps {
    selectedOption: string
}

const FeedIndex: React.FC<FeedIndexProps> = ({ selectedOption }) => {
    const [feedPosts, setFeedPosts] = useState<any[]>([])

    useEffect(() => {
        const fetchData = async () => {
            let postsToDisplay = await getCollectionFromDB(POSTS_DB_COLLECTION)
            setFeedPosts(postsToDisplay)
        }
        fetchData()
    }, [])

    const handleLikeToggle = (isLiked: boolean, idx: number) => {
        isLiked ? feedPosts[idx].likes++ : feedPosts[idx].likes--

    }

    const addPost = async (postContent: string) => {
        const newPost = feedService.getEmptyPost('Guest', 'guest', postContent)
        await addItemToCollection(newPost, POSTS_DB_COLLECTION)
        setFeedPosts([...feedPosts, newPost])
    }

    const removePost = async (postId: string) => {
        
    }

    return (
        <section className="feed-index">
            <MobileTopbar />
            <FeedTopbar selectedOption={selectedOption} />
            <SqueakBox addPost={addPost} />
            <FeedList
                feedPosts={feedPosts}
                onLikeToggle={(isLiked: boolean, idx: number) =>
                    handleLikeToggle(isLiked, idx)
                }
            />
        </section>
    )
}

export default FeedIndex
