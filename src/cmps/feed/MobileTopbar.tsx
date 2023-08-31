import React from 'react'
import { useState } from 'react'
import { Avatar } from '@mui/material'
import { Twitter as TwitterIcon } from '@mui/icons-material'
import LoginModal from '../utils/LoginModal'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../app/store'

export default function MobileTopbar() {
    const { loggedInUser } = useSelector((state: RootState) => {
        return state.user
    })
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    return (
        <section className="mobile-topbar-container">
            <Avatar className="user-avatar" src={loggedInUser.profileImgUrl} onClick={() => setIsLoginModalOpen(!isLoginModalOpen)}></Avatar>
            <TwitterIcon className="twitter-icon" />
            <LoginModal isOpen={isLoginModalOpen} setIsOpen={() => setIsLoginModalOpen(!isLoginModalOpen)} />
        </section>
    )
}
