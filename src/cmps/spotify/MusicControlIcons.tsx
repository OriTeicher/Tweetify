import React, { useState } from 'react'
import { PlayArrow, Pause, ShuffleOutlined, RepeatTwoTone, SkipNextSharp, SkipPreviousSharp } from '@mui/icons-material'
import { EMPTY_STR } from '../../services/consts.service'

export default function MusicControlIcons() {
    const [isPlay, setIsPlay] = useState(true)
    const [isShuffleOn, setIsShuffleOn] = useState(false)
    const [isRepeatOn, setIsRepeatOn] = useState(false)

    const handlePlayClick = () => {
        setIsPlay((prevState) => !prevState)
    }

    // TODO: next song logic
    const handleNextArrowClick = () => {}

    // TODO: previous song logic
    const handlePrevArrowClick = () => {}

    // TODO: shuffle the playlist logic
    const handleShuffleClick = () => {
        setIsShuffleOn((prevState) => !prevState)
    }

    // TODO: repeat song logic
    const handleRepeatClick = () => {
        setIsRepeatOn((prevState) => !prevState)
    }

    return (
        <>
            <RepeatTwoTone titleAccess="Repeat Once" className={`repeat-icon ${isRepeatOn ? 'logo-color' : EMPTY_STR}`} onClick={handleRepeatClick} />
            <SkipPreviousSharp />
            {isPlay ? <PlayArrow onClick={handlePlayClick} className="play-btn icon-circle" /> : <Pause onClick={handlePlayClick} className="stop-btn icon-circle" />}
            <SkipNextSharp />
            <ShuffleOutlined titleAccess="Everyday im Shuffeling.." className={`shuffle-icon ${isShuffleOn ? 'logo-color' : EMPTY_STR}`} onClick={handleShuffleClick} />
        </>
    )
}
