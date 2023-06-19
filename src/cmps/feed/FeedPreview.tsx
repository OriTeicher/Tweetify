import React, { useState } from 'react'
import Loop from '@mui/icons-material/Loop'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import FeedCredentials from './FeedCredentials'
import { Avatar } from '@mui/material'
import { getInitials } from '../../services/util.service'
// import { getRandomColor } from '../../services/util.service'

interface FeedPreviewProps {
    displayName: string
    username: string
    txt: string
    imgUrl: string
    avatar: string
    verified: boolean
    createdAt: string
    likes: number
}

const FeedPreview: React.FC<FeedPreviewProps> = ({
    displayName,
    username,
    txt,
    imgUrl,
    avatar,
    verified,
    createdAt,
    likes,
}) => {
    const [liked, setLiked] = useState(false)

    const handleLikeToggle = () => setLiked(!liked)

    return (
        <section className="post-preview">
            <div className="top-preview">
                <Avatar src={avatar ? avatar : ''} className="user-avatar">
                    {avatar ? '' : getInitials(displayName)}
                </Avatar>
                <FeedCredentials
                    displayName={displayName}
                    username={username}
                    verified={verified}
                    createdAt={createdAt}
                    txt={txt}
                    imgUrl={imgUrl}
                />
            </div>

            <div className="post-icons">
                <ChatBubbleOutlineIcon fontSize="small" />
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
                <Loop fontSize="small" />
                <ShareIcon fontSize="small" />
            </div>
        </section>
    )
}

export default FeedPreview
