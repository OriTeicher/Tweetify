import React, { useState } from 'react'
import { PlayArrow, Pause, Shuffle, RepeatTwoTone, SkipNextSharp, SkipPreviousSharp } from '@mui/icons-material'

export default function PlayBarBottom() {
    const [isPlay, setIsPlay] = useState(true)

    const handlePlayClick = () => {
        setIsPlay((prevState) => !prevState)
    }

    const handleNextArrowClick = () => {}

    const handlePrevArrowClick = () => {}

    return (
        <section className="tweetify-player-container flex justify-center align-center">
            <RepeatTwoTone />
            <SkipPreviousSharp />
            {isPlay ? <PlayArrow onClick={handlePlayClick} className="play-btn icon-circle" /> : <Pause onClick={handlePlayClick} className="stop-btn icon-circle" />}
            <SkipNextSharp />
            <Shuffle />
            <div className="song-container flex align-center">
                <div className="song-img"></div>
                <div className="song-cred flex  column">
                    <h3>When I'm Gone</h3>
                    <h4>Eminem</h4>
                </div>
            </div>
        </section>
    )
}
