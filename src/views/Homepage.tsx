import React, { useState } from 'react'
import Sidebar from '../cmps/sidebar/Sidebar'
import NewsIndex from '../cmps/trending/NewsIndex'
import FeedIndex from '../cmps/feed/FeedIndex'
import { FeedIndexProps } from '../services/interface.service'

interface AppProps {
    cmp?: React.ComponentType<FeedIndexProps>
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
            <NewsIndex />
        </section>
    )
}
