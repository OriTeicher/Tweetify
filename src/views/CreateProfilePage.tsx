import React, { useState } from 'react'
import { Avatar } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { userActions } from '../app/actions/userActions'
import { userService } from '../services/user.service'
import { useDispatch } from 'react-redux'
import Loader from '../cmps/utils/Loader'

export default function CreateProfilePage() {
    const [description, setDescription] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [profileBgImgUrl, setProfileBgUrl] = useState('')
    const [profileImgFile, setProfileImgFile] = useState<File | null>(null)
    const [profileBgImgFile, setProfileBgImgFile] = useState<File | null>(null)
    const [isLoaderOn, setIsLoaderOn] = useState(false)

    const dispatch: any = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
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

    const handleSaveProfile = async () => {
        setIsLoaderOn(true)
        const newUser = userService.getEmptyUser()
        newUser.username = username
        newUser.password = password
        newUser.description = description
        newUser.displayName = displayName
        await dispatch(
            userActions.signUp(newUser, profileImgFile, profileBgImgFile)
        )
        setIsLoaderOn(false)
        navigate('/home')
    }

    const handleBgImgChange = (event: any) => {
        setProfileBgImgFile(event.target.files[0])
        setProfileBgUrl(URL.createObjectURL(event.target.files[0]))
    }

    const handleProfileImgChange = (event: any) => {
        setProfileImgFile(event.target.files[0])
        setProfileImage(URL.createObjectURL(event.target.files[0]))
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
                {isLoaderOn ? (
                    <div className="new-profile-loader-container">
                        <p>Creating new profile...</p>
                        <Loader />
                    </div>
                ) : null}
            </div>
        </section>
    )
}
