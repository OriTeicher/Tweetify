import { Avatar } from '@mui/material'
import React, { useState } from 'react'
import Loop from '@mui/icons-material/Loop'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import FeedCredentials from './FeedCredentials'
import { utilService } from '../../services/util.service'
import Loader from '../utils/Loader'

interface FeedPreviewProps {
    id: string
    displayName: string
    username: string
    txt: string
    imgUrl?: string
    avatar: {
        imgUrl?: string
        bgColor: string
    }
    verified: boolean
    createdAt: number
    likes: number
    comments: object[]
    resqueaks: number
    handleIconClicked: Function
    isPostLoading: boolean
}

const FeedPreview: React.FC<FeedPreviewProps> = ({
    id,
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
    handleIconClicked,
    isPostLoading
}) => {
    const [isLiked] = useState(false)
    const [likesNum] = useState(likes)
    const [commentsNum] = useState(comments?.length || 0)
    const [resqueaksNum] = useState(resqueaks)
    const [selectedPostId, setSelectedPostId] = useState('')

    const onPostIconClicked = (action: {
        type: string
        postId: string
        isStatIncrease: boolean
    }) => {
        setSelectedPostId(action.postId)
        handleIconClicked(action)
    }

    return (
        <section className="post-preview">
            {isPostLoading && id === selectedPostId ? (
                <Loader />
            ) : (
                <div className="top-preview">
                    <Avatar
                        src={avatar.imgUrl}
                        className="user-avatar"
                        sx={{ bgcolor: avatar.bgColor }}
                    >
                        {utilService.getInitials(displayName)}
                    </Avatar>

                    <FeedCredentials
                        id={id}
                        displayName={displayName}
                        username={username}
                        verified={verified}
                        createdAt={createdAt}
                        txt={txt}
                        imgUrl={imgUrl}
                        handleRemovePost={(postId: string) =>
                            onPostIconClicked({
                                type: 'removeFeedPost',
                                postId,
                                isStatIncrease: false
                            })
                        }
                    />
                </div>
            )}

            <div className="post-icons">
                <div className="icon-container">
                    <ChatBubbleOutlineIcon fontSize="small" />
                    <p>{comments.length !== 0 && commentsNum}</p>
                </div>
                <div className="icon-container">
                    {isLiked ? (
                        <FavoriteIcon
                            fontSize="small"
                            onClick={() =>
                                onPostIconClicked({
                                    type: 'toggleLikes',
                                    postId: id,
                                    isStatIncrease: false
                                })
                            }
                            className="liked"
                        />
                    ) : (
                        <FavoriteBorderIcon
                            fontSize="small"
                            onClick={() =>
                                onPostIconClicked({
                                    type: 'toggleLikes',
                                    postId: id,
                                    isStatIncrease: true
                                })
                            }
                            className="unliked"
                        />
                    )}
                    <p>{likes !== 0 && likesNum}</p>
                </div>
                <div className="icon-container">
                    <Loop fontSize="small" />
                    <p>{resqueaks !== 0 && resqueaksNum}</p>
                </div>
                <ShareIcon fontSize="small" />
            </div>
        </section>
    )
}

export default FeedPreview
