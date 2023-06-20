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
    imgUrl?: string
    avatar: {
        imgUrl: string
        bgColor: string
    }
    verified: boolean
    createdAt: string
    likes: number
    comments: object[]
    resqueaks: number
    // onLikeToggle: Function
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
    comments,
    resqueaks,
    // onLikeToggle
}) => {
    const [isLiked, toggleIsLiked] = useState(false)
    const [likesNum, changeLikes] = useState(likes)
    const [commentsNum, changeComments] = useState(comments?.length || 0)
    const [resqueaksNum, changeResqueaks] = useState(resqueaks)

    // const onToggleLike = (isLikedPost: boolean) => {
    //     toggleIsLiked(!isLiked)
    //     if (isLikedPost) {
    //         changeLikes(likesNum + 1)
    //         onLikeToggle(true)
    //     } else {
    //         changeLikes(likesNum - 1)
    //         onLikeToggle(false)
    //     }
    // }

    return (
        <section className="post-preview">
            <div className="top-preview">
                <Avatar
                    src={avatar.imgUrl}
                    className="user-avatar"
                    sx={{ bgcolor: avatar.bgColor }}
                >
                    {getInitials(displayName)}
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
                <div className="comments-container">
                    <ChatBubbleOutlineIcon fontSize="small" />
                    <p>{comments.length !== 0 && commentsNum}</p>
                </div>
                <div className="likes-container">
                    {isLiked ? (
                        <FavoriteIcon
                            fontSize="small"
                            // onClick={() => onToggleLike(false)}
                            className="liked"
                        />
                    ) : (
                        <FavoriteBorderIcon
                            fontSize="small"
                            // onClick={() => onToggleLike(true)}
                            className="unliked"
                        />
                    )}
                    <p>{likes !== 0 && likesNum}</p>
                </div>
                <div className="resqueaks-container">
                    <Loop fontSize="small" />
                    <p>{resqueaks !== 0 && resqueaksNum}</p>
                </div>
                <ShareIcon fontSize="small" />
            </div>
        </section>
    )
}

export default FeedPreview
