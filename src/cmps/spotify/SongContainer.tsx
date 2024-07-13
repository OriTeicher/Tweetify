/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import AlbumPhoto from '../../assets/imgs/CurtainCallCover.jpg'

interface SongProps {
    currentSong: any
}

export default function SongContainer(props: SongProps) {
    return (
        <div className="song-container flex align-center">
            <img className="song-img" src={props.currentSong.imgUrl}></img>
            <div className="song-cred flex  column">
                <h3>{props.currentSong.title || 'Choose songs from playlists'}</h3>
                <h4>{props.currentSong.artist || 'its in the navbar...'}</h4>
            </div>
        </div>
    )
}
