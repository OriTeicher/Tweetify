import React from 'react'
import { Verified, MoreHoriz, MoreVert } from '@mui/icons-material'
import { utilService } from '../../services/util.service'

interface FeedCredentialsProps {
    id: string
    displayName: string
    username: string
    verified: boolean
    createdAt: number
    txt?: string
    imgUrl?: string
    handleRemovePost: Function
    onImgClick: Function
}

const FeedCredentials: React.FC<FeedCredentialsProps> = ({
    id,
    displayName,
    username,
    verified,
    createdAt,
    txt,
    imgUrl,
    onImgClick,
    handleRemovePost
}) => {
    const onRemovePostClick = (postId: string) => {
        handleRemovePost(postId)
    }

    const handleImgClick = () => onImgClick()

    const truncatedUsername =
        username.length > 15 ? username.slice(0, 3) + '...' : username

    return (
        <section className="post-info-container">
            <div className="top-cred">
                <h1>{displayName}</h1>
                {verified && <Verified className="verified-logo" />}
                <h2>@{truncatedUsername}</h2>
                <h3>.</h3>
                <p className="post-date">
                    {utilService.getCurrentDate(createdAt)}
                </p>
                <MoreHoriz
                    className="more-icon"
                    onClick={() => onRemovePostClick(id)}
                />
                <MoreVert
                    className="more-icon mobile"
                    onClick={() => onRemovePostClick(id)}
                />
            </div>
            <pre className="post-txt">{txt}</pre>
            {imgUrl && (
                <img
                    src={imgUrl}
                    className="post-photo"
                    alt="NOTHING TO SEE HERE 🖼️"
                    onClick={handleImgClick}
                ></img>
            )}
        </section>
    )
}

export default FeedCredentials
