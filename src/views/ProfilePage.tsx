import React from 'react'
import { DateRange } from '@mui/icons-material'

export default function ProfilePage() {
    return (
        <section className=" profile-container">
            <img
                className="profile-bgc-img"
                src={`https://c4.wallpaperflare.com/wallpaper/169/139/716/twitter-logo-twitter-logo-wallpaper-preview.jpg`}
                alt="bgc-picture"
            ></img>
            <div className="user-cred">
                <div className="profile-img-container">
                    <div className="edit-container">
                        <img
                            className="profile-img"
                            src="https://xsgames.co/randomusers/assets/avatars/male/25.jpg"
                            alt="profile-pic"
                        />
                        <button>Edit Profile</button>
                    </div>
                    <h1>Pukki Blinders</h1>
                    <h2>@oriteicher</h2>
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
        </section>
    )
}
