import React, { useState, useEffect } from 'react'
import MusicControlIndex from '../cmps/spotify/MusicControlIndex'
import PlaylistsList from '../cmps/spotify/PlaylistsList'
import { spotifyService } from '../services/spotify.service'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
export default function PlaylistsIndex() {
    const { selectedSong } = useSelector((state: RootState) => {
        return state.music
    })
    return (
        <section className="feed-index playlists-index">
            <p>Enjoy some music while exploring the feed!</p>
            <PlaylistsList />
            <MusicControlIndex currentSong={selectedSong} isOpen={true} />
        </section>
    )
}
