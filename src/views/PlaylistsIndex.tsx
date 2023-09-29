import React from 'react'
import MusicControlIndex from '../cmps/spotify/MusicControlIndex'
import PlaylistsList from '../cmps/spotify/PlaylistsList'

export default function PlaylistsIndex() {
    return (
        <>
            <section className="playlists-index">
                <p>Enjoy some music while exploring the feed!</p>
                <PlaylistsList />
                <MusicControlIndex />
            </section>
        </>
    )
}
