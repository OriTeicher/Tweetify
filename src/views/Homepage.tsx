import React, { useState } from 'react'
import Sidebar from '../cmps/sidebar/Sidebar'
import TrendingIndex from '../cmps/trending/TrendingIndex'
import FeedIndex from '../cmps/feed/FeedIndex'

interface AppProps {
    cmp?: React.ComponentType<any>
}

export function Hompage(props: AppProps) {
    const [topBarOption, setTopBarOption] = useState('Home')
    const [isDarkMode, setIsDarkMode] = useState(true)

    const DynamicComponent = props.cmp || FeedIndex

    return (
        <section
            className={
                `${isDarkMode ? 'app-container' : 'light app-container'}`
            }
        >
            <Sidebar
                onOptionChange={(topBarOption: string) =>
                    setTopBarOption(topBarOption)
                }
            />
            <DynamicComponent topBarOption={topBarOption} />
            <TrendingIndex
                setDarkMode={(isDarkMode: boolean) => {
                    console.log(isDarkMode ? 'dark' : 'light')
                    setIsDarkMode(isDarkMode)
                }}
            />
        </section>
    )
}
