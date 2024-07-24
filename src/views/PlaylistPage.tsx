import React, { useState, useEffect } from 'react'
import { spotifyService } from '../services/spotify.service'
import { useParams } from 'react-router-dom'
import MusicControlIndex from '../cmps/spotify/MusicControlIndex'
import { Pause, PlayArrow } from '@mui/icons-material'
import { musicActions } from '../app/actions/music.actions'
import { useDispatch, useSelector } from 'react-redux'
import { Action, ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { EMPTY_STR } from '../services/consts.service'
import { YOUTUBE_API_KEY } from '../services/api.service'
import axios from 'axios'
import { eventBus } from '../services/event.bus.service'
import Loader from '../cmps/utils/Loader'

export default function PlaylistPage() {
    const dispatch: ThunkDispatch<RootState, undefined, Action<string>> = useDispatch()
    const [player, setPlayer] = useState<any>(null)
    const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false)
    const { albumId } = useParams()
    const [tracks, setTracks] = useState<[] | null | any[]>(null)
    const [trackImg, setTrackImg] = useState<any>('')
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const { selectedSong } = useSelector((state: RootState) => {
        return state.music
    })
    let playerReadyPromiseResolve = () => {}

    useEffect(() => {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        const firstScriptTag = document.getElementsByTagName('script')[0]
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
        setPlayer(
            new window.YT.Player('player', {
                height: '0',
                width: '0',
                videoId: '',
                events: {
                    onReady: async () => {
                        setIsPlayerReady(true)
                        playerReadyPromiseResolve()
                    },
                    onStateChange: (event: any) => {
                        if (event.data === window.YT.PlayerState.ENDED) {
                            player.stopVideo()
                        }
                    }
                }
            })
        )
        console.log('player useeffect', player)
    }, [selectedSong])

    useEffect(() => {
        eventBus.subscribeToEvent('stopMusic', async () => {
            waitForPlayerReady()

            console.log('player', player)
            if (!player?.pauseVideo()) return
            console.log('stoping music')
            await player?.pauseVideo()
        })
        eventBus.subscribeToEvent('playMusic', async (id: string | null) => {
            waitForPlayerReady()

            console.log('continue playing ' + selectedSong.title)
            const video = await getSongByTitle(selectedSong.title || '')
            player?.loadVideoById(id ? id : video.id)
        })
        setAlbumTracks()

        return () => {
            eventBus.unsubscribeFromEvent('stopMusic', () => {})
            eventBus.unsubscribeFromEvent('playMusic', () => {})
        }
    }, [albumId])

    const waitForPlayerReady = () => {
        if (isPlayerReady) {
            console.log('player is ready')
            return Promise.resolve()
        }
        return new Promise<void>((resolve) => {
            playerReadyPromiseResolve = resolve
        })
    }
    const playSong = async (songTitle: string | undefined) => {
        try {
            console.log('songTitle', songTitle)
            const video = await getSongByTitle(songTitle || '')
            if (!video) {
                console.error('Song not found')
                return
            }
            await waitForPlayerReady()
            player.loadVideoById(video.id.videoId)
            player.playVideo()

            return video.id.videoId
        } catch (error) {
            console.error('Error playing song:', error)
        }
    }

    async function getSongByTitle(title: string) {
        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    key: YOUTUBE_API_KEY,
                    q: title,
                    part: 'snippet',
                    maxResults: 1,
                    type: 'video'
                }
            })
            return response.data.items[0]
        } catch (err) {
            throw err
        }
    }

    async function handlePauseSong() {}

    async function setAlbumTracks() {
        try {
            const tracks = await spotifyService.getTracks(albumId)
            const album = await spotifyService.getAlbumDetails(albumId)
            setTrackImg(album.images[2].url)
            setTracks(tracks)
            setIsLoading(false)
        } catch (error) {
            throw error
        }
    }

    async function handlePlaySong(title: string, artist: string, imgUrl: string) {
        const songDetails = { title, artist, imgUrl }
        await musicActions.setIsPlaying(false)
        await dispatch(musicActions.setSelectedSong(songDetails))
        await musicActions.setIsPlaying(true)
        await playSong(title + ' ' + artist)
    }

    return (
        <section className="feed-index">
            {isLoading ? (
                <Loader />
            ) : (
                tracks && (
                    <section className="track-list">
                        {tracks.map((track) => (
                            <div className="track-preview" key={track.name} onClick={() => handlePlaySong(track.name, track.artists[0].name, trackImg)}>
                                <img src={trackImg} alt={track.artists[0].name} />
                                <div>
                                    <h1 className="track-header">{track.name}</h1>
                                    <p>{track.artists[0].name}</p>
                                </div>
                                {selectedSong.title === track.name ? <Pause onClick={handlePauseSong} /> : <PlayArrow />}
                            </div>
                        ))}
                    </section>
                )
            )}
            <MusicControlIndex isOpen={true} currentSong={selectedSong} />
        </section>
    )
}
