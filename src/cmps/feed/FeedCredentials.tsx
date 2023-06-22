import React from 'react'
import { Verified, MoreHoriz } from '@mui/icons-material'
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
}

const FeedCredentials: React.FC<FeedCredentialsProps> = ({
    id: id,
    displayName,
    username,
    verified,
    createdAt,
    txt,
    imgUrl,
    handleRemovePost
}) => {
    const onRemovePostClick = (postId: string) => {
        handleRemovePost(postId)
    }

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
            </div>
            <p className="post-txt">{txt}</p>
            {imgUrl && <img src={imgUrl} className="post-photo"></img>}
        </section>
    )
}

export default FeedCredentials
