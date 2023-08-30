import React, { useEffect, useState } from 'react'
import { FeedPreview } from './FeedPreview'
import { FeedPost } from '../../services/interface.service'
import { apiService } from '../../services/api.service'
import Loader from '../utils/Loader'

export interface FeedListProps {
    feedPosts: FeedPost[]
}

const FeedList: React.FC<FeedListProps> = (props: FeedListProps) => {
    const [randomFact, setRandomFact] = useState('')
    const [isLoadingFact, setIsLoadingFact] = useState(false)

    const fetchRandomFact = async () => {
        try {
            const fact = await apiService.getRandomFact()
            setRandomFact(fact)
            setIsLoadingFact(false)
        } catch (error) {
            console.error(error)
            setRandomFact('You are sad now...')
        }
    }

    useEffect(() => {
        setIsLoadingFact(true)
        if (!props.feedPosts.length) fetchRandomFact()
    }, [props.feedPosts])

    return (
        <section className="posts-list">
            {props.feedPosts.length ? (
                props.feedPosts.map((squeak, idx) => (
                    <FeedPreview
                        key={idx}
                        id={squeak.id}
                        owner={squeak.owner}
                        content={squeak.content}
                        imgUrl={squeak.imgUrl}
                        createdAt={squeak.createdAt}
                        likes={squeak.likes}
                        comments={squeak.comments}
                        resqueaks={squeak.resqueaks}
                        likedId={squeak.likedId}
                    />
                ))
            ) : (
                <section className="no-squeaks-container">
                    <p className="no-squeaks-para">No Squeaks for you right now..</p>
                    <p className="no-squeaks-para">Here's a random fact:</p>
                    {isLoadingFact ? <Loader /> : <p className="no-squeaks-para">{randomFact}</p>}
                </section>
            )}
        </section>
    )
}

export default FeedList
