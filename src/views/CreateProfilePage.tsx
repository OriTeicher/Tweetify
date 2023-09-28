import React, { useState, useEffect } from 'react'
import Loader from '../cmps/utils/Loader'
import { Avatar } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { userActions } from '../app/actions/user.actions'
import { userService } from '../services/user.service'
import { feedService } from '../services/feed.service'
import { EMPTY_STR, constsService } from '../services/consts.service'

export default function CreateProfilePage() {
    // email & password needs to
    const [editedDescription, setEditedDescription] = useState(EMPTY_STR)
    const [editedDisplayName, setEditedDisplayName] = useState(EMPTY_STR)
    const [profileImage, setProfileImage] = useState(EMPTY_STR)
    const [profileBgImgUrl, setProfileBgUrl] = useState(EMPTY_STR)
    const [profileImgFile, setProfileImgFile] = useState<File | null>(null)
    const [profileBgImgFile, setProfileBgImgFile] = useState<File | null>(null)
    const [isLoaderOn, setIsLoaderOn] = useState(false)

    const dispatch: any = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const { loggedInUser } = useSelector((state: RootState) => state.user)
    const isGuestUser = loggedInUser.email ? false : true
    const { username, password, email } = location?.state ? location.state : feedService.getEmptyUserCred()

    useEffect(() => {
        if (!loggedInUser) return
        setEditedDescription(loggedInUser.description || EMPTY_STR)
        setEditedDisplayName(loggedInUser.displayName || EMPTY_STR)
        setProfileBgUrl(loggedInUser.profileBgUrl || constsService.NO_BG_WALLPAPER_URL)
        setProfileImage(loggedInUser.profileImgUrl || constsService.NO_PROFILE_IMG_URL)
    }, [loggedInUser])

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setEditedDescription(event.target.value)
    }

    const handleDisplayNameChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setEditedDisplayName(event.target.value)
    }

    const handleCreateNewProfile = async () => {
        setIsLoaderOn(true)
        const newUser = userService.getEmptyCreateUserDto()
        newUser.username = username
        newUser.password = password
        newUser.description = editedDescription
        newUser.displayName = editedDisplayName
        newUser.profileBgUrl = constsService.NO_BG_WALLPAPER_URL
        newUser.profileImgUrl = constsService.NO_PROFILE_IMG_URL
        newUser.email = email
        await dispatch(userActions.signUp(newUser, profileImgFile, profileBgImgFile, true))
        setIsLoaderOn(false)
        navigate('/home')
    }

    // TODO: continue from here
    const handleUpdateProfile = async () => {
        setIsLoaderOn(true)
        const updatedUser = userService.getEmptyUser()
        updatedUser.username = username
        updatedUser.displayName = editedDisplayName
        updatedUser.description = editedDescription
        updatedUser.profileBgUrl = loggedInUser.profileBgUrl
        updatedUser.profileImgUrl = loggedInUser.profileImgUrl
        updatedUser.id = loggedInUser.id
        await dispatch(userActions.signUp(updatedUser, profileImgFile, profileBgImgFile, false))
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
                <img className="profile-bgc-img" src={profileBgImgUrl} alt="Profile Background" />
            </label>
            <div className="user-cred">
                <div className="profile-img-container">
                    <div className="edit-container">
                        <label htmlFor="img-upload">
                            <Avatar className="new-profile-img" src={profileImage} />
                        </label>
                        <input id="img-upload" type="file" accept="image/*" onChange={handleProfileImgChange} style={{ display: 'none' }} />
                        <input id="bgc-img-upload" type="file" accept="image/*" onChange={handleBgImgChange} style={{ display: 'none' }} />
                        {isGuestUser && (
                            <button onClick={loggedInUser.email !== EMPTY_STR ? handleUpdateProfile : handleCreateNewProfile} className="save-profile-btn">
                                Save Profile
                            </button>
                        )}
                    </div>
                    <input type="text" onChange={handleDisplayNameChange} value={editedDisplayName} placeholder="Display name..." />
                    <h2>{'@' + username}</h2>
                </div>
                <div>
                    <textarea onChange={handleDescriptionChange} value={editedDescription} placeholder="Click here to enter your profile description..." />
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
