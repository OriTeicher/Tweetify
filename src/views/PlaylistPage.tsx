import React, { useState, useEffect } from 'react'
import { spotifyService } from '../services/spotify.service'
import { useParams } from 'react-router-dom'
import MusicControlIndex from '../cmps/spotify/MusicControlIndex'
import { PlayArrow } from '@mui/icons-material'
import { youtubeService } from '../services/youtube.service'

export default function PlaylistPage() {
    const { albumId } = useParams()
    const [tracks, setTracks] = useState<[] | null | any[]>(null)
    const [trackImg, setTrackImg] = useState<any>('')

    useEffect(() => {
        setAlbumTracks()
    }, [albumId])

    async function setAlbumTracks() {
        try {
            const tracks = await spotifyService.getTracks(albumId)
            const album = await spotifyService.getAlbumDetails(albumId)
            setTrackImg(album.images[2].url)
            setTracks(tracks)
        } catch (error) {
            throw error
        }
    }

    async function handlePlaySong(songTitle: string) {
        await youtubeService.playSong(songTitle)
    }

    return (
        <section className="feed-index">
            {tracks && (
                <section className="track-list">
                    {tracks.map((track) => (
                        <div className="track-preview" key={track.name} onClick={() => handlePlaySong(track.name + ' ' + track.artists[0].name)}>
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
