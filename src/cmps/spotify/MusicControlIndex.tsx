import { useEffect } from 'react'
import MusicControlIcons from './MusicControlIcons'
import SongContainer from './SongContainer'
import VolumeBar from './VolumeBar'

interface MusicPlayerProps {
    isOpen: boolean
    currentSong: any
}

export default function MusicControlIndex(props: MusicPlayerProps) {
    return (
        <section className={`tweetify-player-container flex justify-center align-center ${props.isOpen ? 'show' : 'hide'}`}>
            <MusicControlIcons />
            <SongContainer currentSong={props.currentSong} />
            <VolumeBar />
        </section>
    )
}
