import React, { Component, useState } from 'react'
import Sidebar from '../cmps/sidebar/Sidebar'
import FeedIndex from '../cmps/feed/FeedIndex'
import NewsIndex from '../cmps/trending/NewsIndex'

export function Hompage() {
    const [topBarOption, setTopBarOption] = useState('Home')
    const handleSidebarOptionClick = (topBarOption: string) => {
        setTopBarOption(topBarOption)
    }
    return (
        <section className="app-container">
            <Sidebar onOptionChange={handleSidebarOptionClick} />
            <FeedIndex topBarOption={topBarOption} />
            <NewsIndex />
        </section>
    )
}
