import React from 'react'
import { DateRange } from '@mui/icons-material'
import ImgModal from '../cmps/utils/ImgModal'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { Avatar } from '@mui/material'

export default function ProfilePage() {
    const [selectedImgUrl, setSelectedImgUrl] = useState('')

    // * LOGGED IN USER *
    const { loggedInUser } = useSelector((state: RootState) => {
        return state.user
    })
    return (
        <section className="feed-index profile-container">
            <img
                className="profile-bgc-img"
                src={
                    loggedInUser.bgImgUrl ||
                    'https://t3.ftcdn.net/jpg/04/21/50/96/360_F_421509616_AW4LfRfbYST8T2ZT9gFGxGWfrCwr4qm4.jpg'
                }
                alt="bgc-picture"
                onClick={() => setSelectedImgUrl(loggedInUser.bgImgUrl)}
            />
            <div className="user-cred">
                <div className="profile-img-container">
                    <div className="edit-container">
                        <Avatar
                            className="profile-img"
                            src={loggedInUser.profileImgUrl}
                            alt="profile-pic"
                            onClick={() =>
                                setSelectedImgUrl(loggedInUser.profileImgUrl)
                            }
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
                <ImgModal
                    imgUrl={selectedImgUrl}
                    onCloseModal={() => setSelectedImgUrl('')}
                />
            )}
        </section>
    )
}
