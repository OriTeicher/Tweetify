import React from 'react'
import { Avatar } from '@mui/material'
import { MoreHoriz } from '@mui/icons-material'

interface UserProps {
    displayName: string
    username: string
    setIsModalOpen: Function
}

const LoggedAccount: React.FC<UserProps> = ({
    displayName,
    username,
    setIsModalOpen
}) => {
    const handleLoginClicked = () => {
        setIsModalOpen(true)
    }

    return (
        <section
            className="logged-account-container"
            onClick={handleLoginClicked}
        >
            <div className="left-cred">
                <Avatar
                    className="user-avatar"
                    src="https://xsgames.co/randomusers/assets/avatars/male/25.jpg"
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
