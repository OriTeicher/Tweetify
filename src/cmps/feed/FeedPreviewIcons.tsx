import React, { useState } from 'react'
import Loop from '@mui/icons-material/Loop'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'

interface FeedPreviewIconProps {
    commentsNum: number
    resqueaksNum: number
    likesNum: number
    onIconClick: Function
}

export default function FeedPreviewIcons(props: FeedPreviewIconProps) {
    const [isLiked, setIsLiked] = useState(false)

    // TODO: handle comment click prop function
    const handleCommentClick = () => {}
    // TODO: handle like click prop function
    const handleLikeClick = () => {}

    return (
        <div className="post-icons">
            <div className="icon-container">
                <ChatBubbleOutlineIcon
                    fontSize="small"
                    onClick={handleCommentClick}
                />
                <p>{props.commentsNum !== 0 && props.commentsNum}</p>
            </div>
            <div className="icon-container">
                {isLiked ? (
                    //todo fix the on click
                    <FavoriteIcon
                        fontSize="small"
                        onClick={() => handleLikeClick()}
                        className="liked"
                    />
                ) : (
                    //todo fix the on click
                    <FavoriteBorderIcon
                        fontSize="small"
                        onClick={() => handleLikeClick()}
                        className="unliked"
                    />
                )}
                <p>{props.likesNum !== 0 && props.likesNum}</p>
            </div>
            <div className="icon-container">
                <Loop fontSize="small" />
                <p>{props.resqueaksNum !== 0 && props.resqueaksNum}</p>
            </div>
            <ShareIcon fontSize="small" />
        </div>
    )
}
