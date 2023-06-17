import React, { useState } from 'react'
import { Avatar } from '@mui/material'
import { Verified, MoreHoriz, Favorite, Loop } from '@mui/icons-material'
import { getRandomColor } from '../../services/util.service'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'

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

    const handleLikeToggle = () => {
        setLiked(!liked)
    }

    return (
        <section className="post-preview">
            <div className="top-cred">
                <Avatar
                    sx={{
                        bgcolor: getRandomColor,
                        textShadow: '1px 1px 1px black'
                    }}
                >
                    {displayName.charAt(0) +
                        displayName.charAt(1).toLocaleUpperCase()}
                </Avatar>
                <h1>{displayName}</h1>
                {verified && <Verified className="verified-logo" />}
                <h2>@{username}</h2>
                <p className="post-date">{createdAt}</p>
                <MoreHoriz className="more-icon" />
            </div>
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
