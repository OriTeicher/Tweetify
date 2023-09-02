import React, { useState } from 'react'
import Loop from '@mui/icons-material/Loop'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import { SaveAltRounded } from '@mui/icons-material'

interface FeedPreviewIconProps {
    commentsNum: number
    resqueaksNum: number
    likesNum: number
    onIconClick: Function
    isLiked: boolean
}

export default function FeedPreviewIcons(props: FeedPreviewIconProps) {
    const [isLiked, setIsLiked] = useState(props.isLiked)
    const [likesCounter, setLikesCounter] = useState(props.likesNum)

    // TODO: handle comment click prop function
    const handleCommentClick = () => {
        props.onIconClick('comment')
    }

    // TODO: handle like click prop function
    const handleLikeClick = () => {
        setIsLiked((prev) => !prev)
        setLikesCounter((prevLikesCounter) => (isLiked ? --prevLikesCounter : ++prevLikesCounter))
        props.onIconClick('like', isLiked)
    }

    return (
        <>
            <div className="post-icons">
                <div className="icon-container">
                    <ChatBubbleOutlineIcon fontSize="small" onClick={handleCommentClick} />
                    <p>{props.commentsNum !== 0 && props.commentsNum}</p>
                </div>
                <div className="icon-container">
                    {isLiked ? (
                        // TODO: fix the on click
                        <FavoriteIcon fontSize="small" onClick={handleLikeClick} className="liked" />
                    ) : (
                        // TODO: fix the on click
                        <FavoriteBorderIcon fontSize="small" onClick={handleLikeClick} className="unliked" />
                    )}
                    <p>{likesCounter !== 0 && likesCounter}</p>
                </div>
                <div className="icon-container">
                    <Loop fontSize="small" />
                    <p>{props.resqueaksNum !== 0 && props.resqueaksNum}</p>
                </div>
                <SaveAltRounded />
                <ShareIcon fontSize="small" />
            </div>
        </>
    )
}
