import React, { useState } from 'react'
import { PlayArrow, Pause, ShuffleOutlined, RepeatTwoTone, SkipNextSharp, SkipPreviousSharp } from '@mui/icons-material'
import { EMPTY_STR } from '../../services/consts.service'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { musicActions } from '../../app/actions/music.actions'
import { eventBus } from '../../services/event.bus.service'

export default function MusicControlIcons() {
    const { isPlaying } = useSelector((state: RootState) => {
        return state.music.selectedSong
    })
    const [isShuffleOn, setIsShuffleOn] = useState(false)
    const [isRepeatOn, setIsRepeatOn] = useState(false)
    const dispatch = useDispatch()
    const handlePlayClick = async () => {
        await dispatch(musicActions.setIsPlaying(!isPlaying))
        if (isPlaying) eventBus.emitEvent('stopMusic', null)
        else eventBus.emitEvent('playMusic', null)
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
            {!isPlaying ? <PlayArrow onClick={handlePlayClick} className="play-btn icon-circle" /> : <Pause onClick={handlePlayClick} className="stop-btn icon-circle" />}
            <SkipNextSharp />
            <ShuffleOutlined titleAccess="Everyday im Shuffeling.." className={`shuffle-icon ${isShuffleOn ? 'logo-color' : EMPTY_STR}`} onClick={handleShuffleClick} />
        </>
    )
}
