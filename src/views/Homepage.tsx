import React, { useState } from 'react'
import Sidebar from '../cmps/sidebar/Sidebar'
import TrendingIndex from '../cmps/trending/TrendingIndex'
import FeedIndex from '../cmps/feed/FeedIndex'

interface AppProps {
    cmp?: React.ComponentType<any>
}

export function Hompage(props: AppProps) {
    const [topBarOption, setTopBarOption] = useState('Home')

    const DynamicComponent = props.cmp || FeedIndex

    return (
        <section className="app-container">
            <Sidebar
                onOptionChange={(topBarOption: string) =>
                    setTopBarOption(topBarOption)
                }
            />
            <DynamicComponent topBarOption={topBarOption} />
            <TrendingIndex />
        </section>
    )
}
