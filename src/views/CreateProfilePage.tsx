import React, { useState } from 'react'
import { Avatar } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { userActions } from '../app/actions/userActions'
import { userService } from '../services/user.service'

export default function CreateProfilePage() {
    const [description, setDescription] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [profileBgImgUrl, setProfileBgUrl] = useState('')
    const [profileImgFile, setProfileImgFile] = useState<File | null>(null)
    const [profileBgImgFile, setProfileBgImgFile] = useState<File | null>(null)

    const location = useLocation()
    const { username, password } = location.state || {}

    const handleParagraphChange = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setDescription(event.target.value)
    }

    const handleDisplayNameChange = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setDisplayName(event.target.value)
    }

    const handleSaveProfile = () => {
        const newUser = userService.getEmptyUser()
        newUser.username = username
        newUser.password = password
        newUser.description = description
        newUser.diplayName = displayName
        userActions.signUp(newUser, profileImgFile, profileBgImgFile)
    }

    const handleBgImgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (!files || files.length === 0) return
        const selectedFile = files[0]!
        setProfileBgImgFile(selectedFile)
        setProfileBgUrl(URL.createObjectURL(selectedFile))
    }

    const handleProfileImgChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = event.target.files
        if (!files || files.length === 0) return
        const selectedFile = files[0]!
        setProfileImgFile(selectedFile)
        setProfileImage(URL.createObjectURL(selectedFile))
    }

    return (
        <section className="feed-index profile-container">
            <label htmlFor="bgc-img-upload">
                <img
                    className="profile-bgc-img"
                    src={
                        profileBgImgUrl ||
                        'https://i0.wp.com/css-tricks.com/wp-content/uploads/2015/11/drag-drop-upload-2.gif'
                    }
                    alt="Profile Background"
                />
            </label>
            <div className="user-cred">
                <div className="profile-img-container">
                    <div className="edit-container">
                        <label htmlFor="img-upload">
                            <Avatar
                                className="new-profile-img"
                                src={profileImage}
                            />
                        </label>
                        <input
                            id="img-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleProfileImgChange}
                            style={{ display: 'none' }}
                        />
                        <input
                            id="bgc-img-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleBgImgChange}
                            style={{ display: 'none' }}
                        />
                        <button
                            onClick={handleSaveProfile}
                            className="save-profile-btn"
                        >
                            Save Profile
                        </button>
                    </div>
                    <input
                        type="text"
                        onChange={handleDisplayNameChange}
                        placeholder="Display name..."
                    />
                    <h2>{'@' + username}</h2>
                </div>
                <div>
                    <textarea
                        onChange={handleParagraphChange}
                        placeholder="Click here to enter your profile description..."
                    />
                </div>
            </div>
        </section>
    )
}
