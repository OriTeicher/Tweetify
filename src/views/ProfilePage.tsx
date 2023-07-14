import React from 'react'
import { DateRange } from '@mui/icons-material'
import ImgModal from '../cmps/utils/ImgModal'
import { useState } from 'react'

export default function ProfilePage() {
    const [selectedImgUrl, setSelectedImgUrl] = useState('')

    return (
        <section className="feed-index profile-container">
            <img
                className="profile-bgc-img"
                src={`https://c4.wallpaperflare.com/wallpaper/169/139/716/twitter-logo-twitter-logo-wallpaper-preview.jpg`}
                alt="bgc-picture"
                onClick={() =>
                    setSelectedImgUrl(
                        'https://c4.wallpaperflare.com/wallpaper/169/139/716/twitter-logo-twitter-logo-wallpaper-preview.jpg'
                    )
                }
            ></img>
            <div className="user-cred">
                <div className="profile-img-container">
                    <div className="edit-container">
                        <img
                            className="profile-img"
                            src="https://xsgames.co/randomusers/assets/avatars/male/25.jpg"
                            alt="profile-pic"
                            onClick={() =>
                                setSelectedImgUrl(
                                    'https://xsgames.co/randomusers/assets/avatars/male/25.jpg'
                                )
                            }
                        />
                        <button>Edit Profile</button>
                    </div>
                    <h1>Pukki Blinders</h1>
                    <h2>@pukki123</h2>
                </div>
                <div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Molestias in eligendi cumque quasi temporibus doloremque
                        rem ipsa tenetur, itaque, magnam corporis nemo eaque
                        quia saepe. 📱
                    </p>
                </div>
                <h2>
                    <DateRange /> joined at: 05/2023
                </h2>
                <div className="followers-container">
                    <p>
                        <span>450</span> Following
                    </p>
                    <p>
                        <span>423</span> Followers
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
