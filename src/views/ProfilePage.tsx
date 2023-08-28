import React, { useState } from 'react'
import { DateRange } from '@mui/icons-material'
import ImgModal from '../cmps/utils/ImgModal'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { Avatar } from '@mui/material'
import { constsService } from '../services/consts.service'
import { utilService } from '../services/util.service'
import { useNavigate } from 'react-router-dom'

export default function ProfilePage() {
    const navigate = useNavigate()
    const [selectedImgUrl, setSelectedImgUrl] = useState('')
    const { loggedInUser } = useSelector((state: RootState) => state.user)

    const handleEditProfile = () => {
        if (!loggedInUser.id) return
        navigate(`/newprofile/${loggedInUser.id}`)
    }

    const formattedDate: string = typeof loggedInUser.createdAt === 'number' ? utilService.getJoinedDateFormat(loggedInUser.createdAt) : loggedInUser.createdAt

    return (
        <section className="feed-index profile-container">
            <img alt="NOTHING HERE" className="profile-bgc-img" src={loggedInUser.profileBgUrl || `${constsService.NO_BG_WALLPAPER_URL}`} onClick={() => setSelectedImgUrl(loggedInUser.profileBgUrl)} />
            <div className="user-cred">
                <div className="profile-img-container">
                    <div className="edit-container">
                        <Avatar className="profile-img" src={loggedInUser.profileImgUrl} alt="profile-pic" onClick={() => setSelectedImgUrl(loggedInUser.profileImgUrl)} />
                        <button onClick={handleEditProfile}>Edit Profile</button>
                    </div>
                    <h1>{loggedInUser.displayName}</h1>
                    <h2>@{loggedInUser.username}</h2>
                </div>
                <div>
                    <p>{loggedInUser.description}</p>
                </div>
                <h2>
                    joined at: {formattedDate} <DateRange />
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
            {selectedImgUrl && <ImgModal imgUrl={selectedImgUrl} onCloseModal={() => setSelectedImgUrl('')} />}
        </section>
    )
}
