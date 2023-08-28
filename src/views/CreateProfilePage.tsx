import React, { useState, useEffect } from 'react'
import { Avatar } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/store'
import Loader from '../cmps/utils/Loader'
import { userActions } from '../app/actions/user.actions'
import { userService } from '../services/user.service'
import { feedService } from '../services/feed.service'

export default function CreateProfilePage() {
    const [description] = useState('')
    const [displayName] = useState('')
    const [editedDescription, setEditedDescription] = useState('')
    const [editedDisplayName, setEditedDisplayName] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [profileBgImgUrl, setProfileBgUrl] = useState('')
    const [profileImgFile, setProfileImgFile] = useState<File | null>(null)
    const [profileBgImgFile, setProfileBgImgFile] = useState<File | null>(null)
    const [isLoaderOn, setIsLoaderOn] = useState(false)

    const { loggedInUser } = useSelector((state: RootState) => state.user)

    const dispatch: any = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const { username, password, email } = location?.state ? location.state : feedService.getEmptyUserCred()

    useEffect(() => {
        if (!loggedInUser) return
        setEditedDescription(loggedInUser.description || '')
        setEditedDisplayName(loggedInUser.displayName || '')
    }, [loggedInUser])

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setEditedDescription(event.target.value)
    }

    const handleDisplayNameChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setEditedDisplayName(event.target.value)
    }

    const handleSaveProfile = async (isPost: boolean) => {
        setIsLoaderOn(true)
        const newUser = userService.getEmptyCreateUserDto()
        newUser.username = username
        newUser.password = password
        newUser.description = description
        newUser.displayName = displayName
        newUser.email = email
        await dispatch(userActions.signUp(newUser, profileImgFile, profileBgImgFile, isPost))
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
                <img className="profile-bgc-img" src={loggedInUser ? loggedInUser.profileBgUrl : profileBgImgUrl || 'https://i0.wp.com/css-tricks.com/wp-content/uploads/2015/11/drag-drop-upload-2.gif'} alt="Profile Background" />
            </label>
            <div className="user-cred">
                <div className="profile-img-container">
                    <div className="edit-container">
                        <label htmlFor="img-upload">
                            <Avatar className="new-profile-img" src={loggedInUser ? loggedInUser.profileImgUrl : profileImage} />
                        </label>
                        <input id="img-upload" type="file" accept="image/*" onChange={handleProfileImgChange} style={{ display: 'none' }} />
                        <input id="bgc-img-upload" type="file" accept="image/*" onChange={handleBgImgChange} style={{ display: 'none' }} />
                        <button onClick={() => handleSaveProfile(false)} className="save-profile-btn">
                            Save Profile
                        </button>
                    </div>
                    <input type="text" onChange={handleDisplayNameChange} value={editedDisplayName} placeholder="Display name..." />
                    <h2>{'@' + (loggedInUser ? loggedInUser.username : username)}</h2>
                </div>
                <div>
                    <textarea onChange={handleDescriptionChange} placeholder="Click here to enter your profile description..." value={editedDescription} />{' '}
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
