import React from 'react'
import PlaylistPreview from './PlaylistPreview'
import { constsService } from '../../services/consts.service'

export default function PlaylistssList() {
    const playlists = constsService.DEMO_PLAYLISTS

    return (
        <section className="playlists-list">
            {playlists.map((playlist, idx) => (
                <PlaylistPreview key={idx} title={playlist.title} artist={playlist.artist} imgUrl={playlist.imgUrl} songs={[]} />
            ))}
        </section>
    )
}
