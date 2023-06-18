import React from 'react'
import { Avatar } from '@mui/material'
import { Verified, MoreHoriz } from '@mui/icons-material'
import { getRandomColor } from '../../services/util.service'

interface FeedCredentialsProps {
    displayName: string
    username: string
    verified: boolean
    createdAt: string
    txt?: string
    imgUrl?: string
}

const FeedCredentials: React.FC<FeedCredentialsProps> = ({
    displayName,
    username,
    verified,
    createdAt,
    txt,
    imgUrl
}) => {
    return (
        <section className="post-info-container">
            <div className="top-cred">
                <h1>{displayName}</h1>
                {verified && <Verified className="verified-logo" />}
                <h2>@{username}</h2>
                <h3>.</h3>
                <p className="post-date">{createdAt}</p>
                <MoreHoriz className="more-icon" />
            </div>
            <p className="post-txt">{txt}</p>
            {imgUrl && <img src={imgUrl} className="post-photo"></img>}
        </section>
    )
}

export default FeedCredentials
