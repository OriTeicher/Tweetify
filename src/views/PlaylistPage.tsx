import React, { useState, useEffect } from 'react'
import { spotifyService } from '../services/spotify.service'
import { useParams } from 'react-router-dom'
import MusicControlIndex from '../cmps/spotify/MusicControlIndex'

export default function PlaylistPage() {
    const { albumId } = useParams()
    const [tracks, setTracks] = useState<[] | null | any[]>(null)

    useEffect(() => {
        setAlbumTracks()
    }, [])

    async function setAlbumTracks() {
        try {
            const tracks = await spotifyService.getTracks(albumId)
            setTracks(tracks)
        } catch (error) {
            throw error
        }
    }
    return (
        <section className="feed-index">
            {tracks && (
                <section className="track-list">
                    {tracks.map((track) => (
                        <div className="track-preview" key={track.name}>
                            <h1 className="track-header">{track.name}</h1>
                        </div>
                    ))}
                </section>
            )}
            <MusicControlIndex isOpen={true} />
        </section>
    )
}
