import { VolumeOff, VolumeUp } from '@mui/icons-material'
import { Slider, Stack } from '@mui/material'
import React, { useState } from 'react'
import { LOGO_COLOR } from '../../services/consts.service'

const VolumeBar: React.FC = () => {
    const [volume, setVolume] = useState(50)
    const [isMuted, setIsMuted] = useState(false)

    const handleMuteClick = () => {
        setIsMuted((prevState) => !prevState)
        isMuted ? setVolume(50) : setVolume(0)
    }

    const handleVolChange = (event: Event, newValue: number | number[]) => {
        event.preventDefault()
        setVolume(newValue as number)
    }

    return (
        <div className="volume-bar-container flex align-center">
            {!isMuted ? <VolumeUp onClick={handleMuteClick} /> : <VolumeOff onClick={handleMuteClick} />}
            <Stack spacing={2} sx={{ width: 120 }}>
                <Slider className="volume-slider" sx={{ color: 'white' }} value={volume} onChange={handleVolChange} />
            </Stack>
        </div>
    )
}

export default VolumeBar
