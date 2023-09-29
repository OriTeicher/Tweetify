/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import AlbumPhoto from '../../assets/imgs/CurtainCallCover.jpg'

export default function SongContainer() {
    return (
        <div className="song-container flex align-center">
            <img className="song-img" src={AlbumPhoto}></img>
            <div className="song-cred flex  column">
                <h3>When I'm Gone</h3>
                <h4>Eminem</h4>
            </div>
        </div>
    )
}
