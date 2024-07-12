import React, { useState, useEffect } from 'react'
import { spotifyService } from '../services/spotify.service'
import { useParams } from 'react-router-dom'

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
        tracks && (
            <section className="track-list">
                {tracks.map((track) => (
                    <div className="track-preview" key={track.name}>
                        {track.name}
                    </div>
                ))}
            </section>
        )
    )
}
