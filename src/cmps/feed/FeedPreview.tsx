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
import { FeedPost } from '../../services/interface.service'
import ImgModal from '../utils/ImgModal'
import SqueakBox from './SqueakBox'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/feedStore'
import { json } from 'stream/consumers'

const FeedPreview: React.FC<FeedPost> = ({
    id,
    owner,
    content,
    imgUrl,
    createdAt,
    likes,
    comments,
    resqueaks,
    handleIconClicked,
    isPostLoading,
    filterBy,
    onAddComment
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

    const { loggedInUser } = useSelector((state: RootState) => {
        return state.user
    })

    const handleImgModalClosed = () => setIsImgClicked(false)
    const handleImgClick = () => setIsImgClicked(true)
    const handleCommentClick = () => setIsCommentsClicked(!isCommentsClicked)
    const handleAddComment = (
        post: string,
        file: File | null,
        gifUrl: string,
        postId: string
    ) => onAddComment(post, file, gifUrl, postId)
    return (
        <>
            <section className="post-preview">
                {isPostLoading && id === selectedPostId ? (
                    <Loader />
                ) : (
                    <div className="top-preview">
                        <Avatar
                            src={owner?.profileImgUrl}
                            className="user-avatar"
                        >
                            {utilService.getInitials(owner.displayName)}
                        </Avatar>

                        <FeedCredentials
                            filterBy={filterBy}
                            id={id}
                            displayName={owner.displayName}
                            username={owner.username}
                            verified={owner.isVerified}
                            createdAt={createdAt}
                            content={content}
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

                {isImgClicked && (
                    <ImgModal
                        onCloseModal={() => handleImgModalClosed()}
                        imgUrl={imgUrl}
                    />
                )}
            </section>
            {isCommentsClicked && (
                <div className="post-list comments-list">
                    <SqueakBox
                        addPost={(
                            content: string,
                            file: File | null,
                            gifUrl: string
                        ) => handleAddComment(content, file, gifUrl, id)}
                        isNewPostLoading={false}
                        loggedInUser={loggedInUser}
                    />
                    {comments.map((comment, idx) => (
                        <FeedPreview
                            onAddComment={(
                                post: string,
                                file: File | null,
                                gifUrl: string,
                                postId: string
                            ) => handleAddComment(post, file, gifUrl, postId)}
                            filterBy={filterBy}
                            key={idx}
                            id={comment.id}
                            owner={comment.owner}
                            content={comment.content}
                            imgUrl={comment.imgUrl}
                            createdAt={comment.createdAt}
                            likes={comment.likes}
                            comments={comment.comments}
                            resqueaks={comment.resqueaks}
                            isPostLoading={false}
                            handleIconClicked={() => console.log('')}
                        />
                    ))}
                </div>
            )}
        </>
    )
}

export default FeedPreview
