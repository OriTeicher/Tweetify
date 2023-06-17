import React, { useState } from 'react'
import './assets/styles/main.scss'
import Sidebar from './cmps/sidebar/Sidebar'
import FeedIndex from './cmps/feed/FeedIndex'
import NewsIndex from './cmps/news/NewsIndex'

function App() {
    const [selectedOption, setSelectedOption] = useState('Home')

    const handleSidebarOptionClick = (selectedOption: string) => {
        setSelectedOption(selectedOption)
    }

    return (
        <div className="app-container">
            <Sidebar onOptionChange={handleSidebarOptionClick} />
            <FeedIndex selectedOption={selectedOption} />
            <NewsIndex />
        </div>
    )
}

export default App
