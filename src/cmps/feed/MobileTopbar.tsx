import React from 'react'
import { useState } from 'react'
import { Avatar } from '@mui/material'
import { Twitter as TwitterIcon } from '@mui/icons-material'
import LoginModal from '../utils/LoginModal'

export default function MobileTopbar() {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    return (
        <section className="mobile-topbar-container">
            <Avatar
                className="user-avatar"
                src="https://xsgames.co/randomusers/assets/avatars/male/25.jpg"
                onClick={() => setIsLoginModalOpen(!isLoginModalOpen)}
            >
                PK
            </Avatar>
            <TwitterIcon className="twitter-icon" />
            <LoginModal
                isOpen={isLoginModalOpen}
                setIsOpen={() => setIsLoginModalOpen(!isLoginModalOpen)}
            />
        </section>
    )
}
