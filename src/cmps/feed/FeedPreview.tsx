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
import { FeedPreviewProps } from '../../services/interface.service'
import ImgModal from '../utils/ImgModal'

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
    const [isLiked, setIsLiked] = useState(false)
    const [isImgClicked, setIsImgClicked] = useState(false)
    const [isCommentsClicked, setIsCommentsClicked] = useState(false)
    const [commentsNum] = useState(comments?.length || 0)
    const [resqueaksNum] = useState(resqueaks)
    const [selectedPostId, setSelectedPostId] = useState('')

    const onPostIconClicked = (action: {
        type: string
        postId: string
        stat: string
        isStatIncrease: boolean
    }) => {
        switch (action.stat) {
            case 'likes':
                setIsLiked(action.isStatIncrease)
        }
        setSelectedPostId(action.postId)
        handleIconClicked(action)
    }

    const handleImgModalClosed = () => setIsImgClicked(false)
    const handleImgClick = () => setIsImgClicked(true)
    const handleCommentClick = () => setIsCommentsClicked(!isCommentsClicked)

    return (
        <>
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
                                    stat: 'post',
                                    isStatIncrease: false
                                })
                            }
                            onImgClick={handleImgClick}
                        />
                    </div>
                )}

                <div className="post-icons">
                    <div className="icon-container">
                        <ChatBubbleOutlineIcon
                            fontSize="small"
                            onClick={handleCommentClick}
                        />
                        <p>{comments.length !== 0 && commentsNum}</p>
                    </div>
                    <div className="icon-container">
                        {isLiked ? (
                            <FavoriteIcon
                                fontSize="small"
                                onClick={() =>
                                    onPostIconClicked({
                                        type: 'toggleStats',
                                        postId: id,
                                        stat: 'likes',
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
                                        type: 'toggleStats',
                                        postId: id,
                                        stat: 'likes',
                                        isStatIncrease: true
                                    })
                                }
                                className="unliked"
                            />
                        )}
                        <p>{likes !== 0 && likes}</p>
                    </div>
                    <div className="icon-container">
                        <Loop fontSize="small" />
                        <p>{resqueaks !== 0 && resqueaksNum}</p>
                    </div>
                    <ShareIcon fontSize="small" />
                </div>
                {/* comments */}

                {isImgClicked && (
                    <ImgModal
                        onCloseModal={() => handleImgModalClosed()}
                        imgUrl={imgUrl}
                    />
                )}
            </section>
            {isCommentsClicked && comments.length !== 0 && (
                <div className="post-list comments-list">
                    {comments.map((comment, idx) => (
                        <FeedPreview
                            key={idx}
                            id={comment.id}
                            displayName={comment.displayName}
                            username={comment.username}
                            txt={comment.txt}
                            imgUrl={comment.imgUrl}
                            avatar={comment.avatar}
                            verified={comment.verified}
                            createdAt={comment.createdAt}
                            likes={comment.likes}
                            comments={comment.comments}
                            resqueaks={comment.resqueaks}
                            isPostLoading={false}
                            handleIconClicked={() =>
                                console.log('icon clicked')
                            }
                        />
                    ))}
                    <div className="squeak-concat"></div>
                </div>
            )}
        </>
    )
}

export default FeedPreview
