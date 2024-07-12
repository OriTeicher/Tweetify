import React, { useState, useEffect } from 'react'
import { spotifyService } from '../services/spotify.service'
import { useParams } from 'react-router-dom'
import MusicControlIndex from '../cmps/spotify/MusicControlIndex'
import { PlayArrow } from '@mui/icons-material'

export default function PlaylistPage() {
    const { albumId } = useParams()
    const [tracks, setTracks] = useState<[] | null | any[]>(null)
    const [trackImg, setTrackImg] = useState<any>('')
    useEffect(() => {
        setAlbumTracks()
        console.log('tracks', tracks)
    }, [])

    async function setAlbumTracks() {
        try {
            const tracks = await spotifyService.getTracks(albumId)
            const album = await spotifyService.getAlbumDetails(albumId)
            console.log('album', album)
            setTrackImg(album.images[2].url)
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
                            <img src={trackImg} alt={track.artists[0].name} />
                            <div>
                                <h1 className="track-header">{track.name}</h1>
                                <p>{track.artists[0].name}</p>
                            </div>
                            <PlayArrow />
                        </div>
                    ))}
                </section>
            )}
            <MusicControlIndex isOpen={true} />
        </section>
    )
}
