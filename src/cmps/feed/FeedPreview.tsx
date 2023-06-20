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
    onLikeToggle: Function
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
    onLikeToggle
}) => {
    const [isLiked, toggleIsLiked] = useState(false)
    const [likesNum, changeLikes] = useState(likes)

    const onToggleLike = (isLikedPost: boolean) => {
        toggleIsLiked(!isLiked)
        if (isLikedPost) {
            changeLikes(likesNum + 1)
            onLikeToggle(true)
        } else {
            changeLikes(likesNum - 1)
            onLikeToggle(false)
        }
    }

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
                <div className="likes-container">
                    {isLiked ? (
                        <FavoriteIcon
                            fontSize="small"
                            onClick={() => onToggleLike(false)}
                            className="liked"
                        />
                    ) : (
                        <FavoriteBorderIcon
                            fontSize="small"
                            onClick={() => onToggleLike(true)}
                            className="unliked"
                        />
                    )}
                    <p>{likes !== 0 && likesNum}</p>
                </div>
                <Loop fontSize="small" />
                <ShareIcon fontSize="small" />
            </div>
        </section>
    )
}

export default FeedPreview
