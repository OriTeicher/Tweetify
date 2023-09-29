import MusicControlIcons from './MusicControlIcons'
import SongContainer from './SongContainer'
import VolumeBar from './VolumeBar'

export default function MusicControlIndex() {
    return (
        <section className="tweetify-player-container flex justify-center align-center">
            <MusicControlIcons />
            <SongContainer />
            <VolumeBar />
        </section>
    )
}
