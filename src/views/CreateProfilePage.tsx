import React, { useState } from 'react'
import { Avatar } from '@mui/material'

interface CreateProfilePageProps {
    username: string 
    password: string
}

export default function CreateProfilePage(props: CreateProfilePageProps) {
    const initialParagraph = 'Click here to enter your profile description...'
    const initialDisplayName = 'Display name goes here...'

    const [description, setDescription] = useState<string>(initialParagraph)
    const [displayName, setDisplayName] = useState<string>(initialDisplayName)
    const [profileImage, setProfileImage] = useState<string>('')
    const [profileBgcImage, setProfileBgcImage] = useState<string>('')

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

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfileImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleBgcImageChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfileBgcImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <section className="feed-index profile-container">
            <label htmlFor="bgc-image-upload">
                <img
                    className="profile-bgc-img"
                    src={
                        profileBgcImage ||
                        'https://i0.wp.com/css-tricks.com/wp-content/uploads/2015/11/drag-drop-upload-2.gif'
                    }
                    alt="Profile Background"
                />
            </label>
            <div className="user-cred">
                <div className="profile-img-container">
                    <div className="edit-container">
                        <label htmlFor="image-upload">
                            <Avatar
                                className="new-profile-img"
                                src={profileImage}
                            />
                        </label>
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                        <input
                            id="bgc-image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleBgcImageChange}
                            style={{ display: 'none' }}
                        />
                        <button>Save Profile</button>
                    </div>
                    <input
                        type="text"
                        onChange={handleDisplayNameChange}
                        placeholder="Display name goes here..."
                    />
                    <h2>@{props.username || 'Guest'}</h2>
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
