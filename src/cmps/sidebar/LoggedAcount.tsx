import React from 'react'
import { Avatar } from '@mui/material'
import { MoreHoriz } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

interface UserProps {
    displayName: string
    username: string
}

const LoggedAccount: React.FC<UserProps> = ({ displayName, username }) => {
    return (
        <section className="logged-account-container">
            <div className="left-cred">
                <Avatar
                    className="user-avatar"
                    sx={{
                        bgcolor: 'lightskyblue',
                        textShadow: '1px 1px 1px black'
                    }}
                >
                    {'PK'}
                </Avatar>
                <div className="user-cred">
                    <h1>{displayName}</h1>
                    <h2>@{username}</h2>
                </div>
            </div>
            <MoreHoriz />
        </section>
    )
}

export default LoggedAccount
