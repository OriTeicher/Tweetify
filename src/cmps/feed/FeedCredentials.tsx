import React from 'react'
import { Verified, MoreHoriz } from '@mui/icons-material'

interface FeedCredentialsProps {
    displayName: string
    username: string
    verified: boolean
    createdAt: string
    txt?: string
    imgUrl?: string
    handleRemovePost: Function
}

const FeedCredentials: React.FC<FeedCredentialsProps> = ({
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

    return (
        <section className="post-info-container">
            <div className="top-cred">
                <h1>{displayName}</h1>
                {verified && <Verified className="verified-logo" />}
                <h2>@{username}</h2>
                <h3>.</h3>
                <p className="post-date">{createdAt}</p>
                <MoreHoriz
                    className="more-icon"
                    // onClick={() => onRemovePostClick(id)}
                />
            </div>
            <p className="post-txt">{txt}</p>
            {imgUrl && <img src={imgUrl} className="post-photo"></img>}
        </section>
    )
}

export default FeedCredentials
