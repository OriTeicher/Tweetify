import React, { useState } from 'react'
import Loop from '@mui/icons-material/Loop'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import MsgModal from '../utils/MsgModal'

import { BookmarkBorder } from '@mui/icons-material'
import { Bookmark } from '@mui/icons-material'

interface FeedPreviewIconProps {
    commentsNum: number
    resqueaksNum: number
    likesNum: number
    onIconClick: Function
    isLiked: boolean
    isBookmarked: boolean
}

export default function FeedPreviewIcons(props: FeedPreviewIconProps) {
    const [isLiked, setIsLiked] = useState(props.isLiked)
    const [isBookmarked, setIsBookmarked] = useState(props.isBookmarked)
    const [likesCounter, setLikesCounter] = useState(props.likesNum)
    const logoColor = '#1ed760'

    // TODO: handle comment click prop function
    const handleCommentClick = () => {
        props.onIconClick('comment')
    }

    // TODO: handle like click prop function
    const handleLikeClick = () => {
        setIsLiked((prevState) => !prevState)
        setLikesCounter((prevLikesCounter) => (isLiked ? --prevLikesCounter : ++prevLikesCounter))
        props.onIconClick('likes', isLiked)
    }

    const handleBookmarkClick = () => {
        setIsBookmarked((prevState) => !prevState)
        props.onIconClick('bookmark', isBookmarked)
    }

    return (
        <>
            <div className="post-icons">
                <div className="icon-container">
                    <ChatBubbleOutlineIcon fontSize="small" onClick={handleCommentClick} />
                    <p>{props.commentsNum !== 0 && props.commentsNum}</p>
                </div>
                <div className="icon-container">
                    {isLiked ? <FavoriteIcon fontSize="small" onClick={handleLikeClick} className="liked" /> : <FavoriteBorderIcon fontSize="small" onClick={handleLikeClick} className="unliked" />}
                    <p>{likesCounter !== 0 && likesCounter}</p>
                </div>
                <div className="icon-container">
                    <Loop fontSize="small" />
                    <p>{props.resqueaksNum !== 0 && props.resqueaksNum}</p>
                </div>
                {!isBookmarked ? (
                    <BookmarkBorder onClick={handleBookmarkClick} />
                ) : (
                    <>
                        <Bookmark style={{ color: logoColor }} onClick={handleBookmarkClick} />
                        <MsgModal msg="Saved in Bookmarks!" />
                    </>
                )}

                <ShareIcon fontSize="small" />
            </div>
        </>
    )
}
