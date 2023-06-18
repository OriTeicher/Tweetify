import React, { useState } from 'react'
import Loop from '@mui/icons-material/Loop'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import FeedCredentials from './FeedCredentials'

interface FeedPreviewProps {
    displayName: string
    username: string
    txt: string
    image: string
    avatar: string
    verified: boolean
    createdAt: string
}

const FeedPreview: React.FC<FeedPreviewProps> = ({
    displayName,
    username,
    txt,
    image,
    avatar,
    verified,
    createdAt
}) => {
    const [liked, setLiked] = useState(false)

    const handleLikeToggle = () => setLiked(!liked)

    return (
        <section className="post-preview">
            <FeedCredentials
                displayName={displayName}
                username={username}
                verified={verified}
                createdAt={createdAt}
            />
            <p className="post-txt">{txt}</p>
            <div className="post-icons">
                {liked ? (
                    <FavoriteIcon
                        fontSize="small"
                        onClick={handleLikeToggle}
                        className="liked"
                    />
                ) : (
                    <FavoriteBorderIcon
                        fontSize="small"
                        onClick={handleLikeToggle}
                        className="unliked"
                    />
                )}
                <ChatBubbleOutlineIcon fontSize="small" />
                <Loop fontSize="small" />
                <ShareIcon fontSize="small" />
            </div>
        </section>
    )
}

export default FeedPreview
