import React from 'react'
import { Avatar } from '@mui/material'
import { Verified, MoreHoriz } from '@mui/icons-material'
import { getRandomColor } from '../../services/util.service'

interface FeedCredentialsProps {
    displayName: string
    username: string
    verified: boolean
    createdAt: string
}

const FeedCredentials: React.FC<FeedCredentialsProps> = ({
    displayName,
    username,
    verified,
    createdAt
}) => {
    return (
        <section className="top-cred">
            <Avatar className='user-avatar'
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
            <h3>.</h3>
            <p className="post-date">{createdAt}</p>
            <MoreHoriz className="more-icon" />
        </section>
    )
}

export default FeedCredentials
