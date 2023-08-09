import React from 'react'
import { DateRange } from '@mui/icons-material'
import ImgModal from '../cmps/utils/ImgModal'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { Avatar } from '@mui/material'
import { constsService } from '../services/consts.service'

export default function ProfilePage() {
    const [selectedImgUrl, setSelectedImgUrl] = useState('')

    // * LOGGED IN USER *
    const { loggedInUser } = useSelector((state: RootState) => {
        return state.user
    })

    return (
        <section className="feed-index profile-container">
            <img
                alt="NOTHING HERE"
                className="profile-bgc-img"
                src={loggedInUser.bgImgUrl || `${constsService.NO_BG_WALLPAPER}`}
                onClick={() => setSelectedImgUrl(loggedInUser.bgImgUrl)}
            />
            <div className="user-cred">
                <div className="profile-img-container">
                    <div className="edit-container">
                        <Avatar
                            className="profile-img"
                            src={loggedInUser.profileImgUrl}
                            alt="profile-pic"
                            onClick={() => setSelectedImgUrl(loggedInUser.profileImgUrl)}
                        />
                        <button>Edit Profile</button>
                    </div>
                    <h1>{loggedInUser.displayName}</h1>
                    <h2>@{loggedInUser.username}</h2>
                </div>
                <div>
                    <p>{loggedInUser.description}</p>
                </div>
                <h2>
                    joined at: {loggedInUser.joinedAt} <DateRange />
                </h2>
                <div className="followers-container">
                    <p>
                        <span>0</span> Following
                    </p>
                    <p>
                        <span>0</span> Followers
                    </p>
                </div>
            </div>
            {selectedImgUrl && (
                <ImgModal imgUrl={selectedImgUrl} onCloseModal={() => setSelectedImgUrl('')} />
            )}
        </section>
    )
}
