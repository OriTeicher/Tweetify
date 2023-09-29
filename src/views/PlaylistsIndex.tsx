import React from 'react'
import MusicControlIndex from '../cmps/spotify/MusicControlIndex'
import PlaylistsList from '../cmps/spotify/PlaylistsList'

export default function PlaylistsIndex() {
    return (
        <>
            <section className="feed-index playlists-index">
                <p>Enjoy some music while exploring the feed!</p>
                <PlaylistsList />
                <MusicControlIndex isOpen={true} />
            </section>
        </>
    )
}
