import React from 'react'
import { Avatar } from '@mui/material'
import { Verified, MoreHoriz } from '@mui/icons-material'
import { getRandomColor } from '../../services/util.service'
interface FeedPreviewProps {
    displayName: string
    username: string
    txt: string
    image: string
    avatar: string
    verified: boolean
    createdAt: string
}

const FeedPreview: React.FC<FeedPreviewProps> = ({
    displayName,
    username,
    txt,
    image,
    avatar,
    verified,
    createdAt
}) => {
    return (
        <section className="post-preview">
            <div className="top-cred">
                <Avatar
                    sx={{
                        bgcolor: getRandomColor,
                        textShadow: '1px 1px 1px black'
                    }}
                >
                    {displayName.charAt(0) +
                        displayName.charAt(1).toLocaleUpperCase()}
                </Avatar>
                <h1>{displayName}</h1>
                {verified && <Verified className="verified-logo" />}
                <h2>@{username}</h2>
                <p className="post-date">{createdAt}</p>
            <MoreHoriz className='more-icon'/>
            </div>
            <p className="post-txt">{txt}</p>
        </section>
    )
}

export default FeedPreview
