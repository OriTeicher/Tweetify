/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react'
import { PlaylistCard } from '../../services/interface.service'
import { spotifyService } from '../../services/spotify.service'
import { useNavigate } from 'react-router-dom'

export default function PlaylistPreview(props: PlaylistCard) {
    const navigate = useNavigate()

    async function handlePlaylistClick() {
        try {
            const albumId = await spotifyService.searchAlbum(props.title, props.artist)
            navigate(`/playlists/${albumId}`)
        } catch (err) {
            throw err
        }
    }
    return (
        <section className="playlist-preview" onClick={handlePlaylistClick}>
            <img src={props.imgUrl} />
            <h2>{props.title}</h2>
            <h3>{props.artist}</h3>
        </section>
    )
}
