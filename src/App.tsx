import React from 'react'
import './assets/styles/main.scss'
import Sidebar from './cmps/sidebar/Sidebar'
import FeedIndex from './cmps/feed/FeedIndex'
import NewsIndex from './cmps/news/NewsIndex'
function App() {
    return (
        <div className="app-container">
            <Sidebar />
            <FeedIndex />
            <NewsIndex />
        </div>
    )
}

export default App
