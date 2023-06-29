import React, { useState } from 'react'
import { Avatar } from '@mui/material'
import { MoreHoriz } from '@mui/icons-material'
import OptionsDropdown from '../utils/OptionsDropdown'

interface UserProps {
    displayName: string
    username: string
    setIsLoginModalOpen: Function
}

const LoggedAccount: React.FC<UserProps> = ({
    displayName,
    username,
    setIsLoginModalOpen
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownOptions = ['Login to account', `Log out from @${username}`]

    const handleDropdownClick = (option: string) => {
        console.log(option)
        switch (option) {
            case 'Login to account':
                setIsLoginModalOpen(true)
                break
        }
    }

    const handleAccountClicked = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    return (
        <section className="dropdown-cred-container">
            {isDropdownOpen && (
                <OptionsDropdown
                    options={dropdownOptions}
                    setDropdownOption={(option: string) =>
                        handleDropdownClick(option)
                    }
                />
            )}
            <section
                className="logged-account-container"
                onClick={handleAccountClicked}
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
        </section>
    )
}

export default LoggedAccount
