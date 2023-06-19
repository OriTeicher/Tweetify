import React, { useState, useEffect } from 'react'
import FeedTopbar from './FeedTopbar'
import FeedList from './FeedList'
import SqueakBox from './SqueakBox'
import MobileTopbar from './MobileTopbar'
import { getCollectionFromDB, addItemToCollection } from '../../firsebase'
interface FeedIndexProps {
    selectedOption: string
}

const FeedIndex: React.FC<FeedIndexProps> = ({ selectedOption }) => {
    const [feedPosts, setFeedPosts] = useState<any[]>([])

    useEffect(() => {
        const fetchData = async () => {
            let postsToDisplay = await getCollectionFromDB('posts')
            setFeedPosts(postsToDisplay)
        }
        fetchData()
    }, [])

    return (
        <section className="feed-index">
            <MobileTopbar />
            <FeedTopbar selectedOption={selectedOption} />
            <SqueakBox />
            <FeedList feedPosts={feedPosts} />
        </section>
    )
}

export default FeedIndex
