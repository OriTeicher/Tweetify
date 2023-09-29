/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { PlaylistCard } from '../../services/interface.service'

export default function PlaylistPreview(props: PlaylistCard) {
    return (
        <section className="playlist-preview">
            <img src={props.imgUrl} />
            <h2>{props.title}</h2>
            <h3>{props.artist}</h3>
        </section>
    )
}
