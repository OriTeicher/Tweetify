import React, { useState } from 'react'
import Sidebar from '../cmps/sidebar/Sidebar'
import TrendingIndex from '../cmps/trending/TrendsIndex'
import FeedIndex from './FeedIndex'
import FrequentSongsModal from '../cmps/spotify/FrequentSongsModal'
import MusicControlIndex from '../cmps/spotify/MusicControlIndex'

interface AppProps {
    cmp?: React.ComponentType<any>
}

export function AppCenterDynamicCmp(props: AppProps) {
    const [topBarOption, setTopBarOption] = useState('Home')
    const DynamicComponent = props.cmp || FeedIndex
    const handleOptionChange = (option: string) => setTopBarOption(option)

    return (
        <section className="app-container">
            <Sidebar onOptionChange={handleOptionChange} />
            <DynamicComponent topBarOption={topBarOption} />
            {topBarOption !== 'Playlists' ? <TrendingIndex /> : <FrequentSongsModal />}
        </section>
    )
}
