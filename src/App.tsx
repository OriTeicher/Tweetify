import React, { useState } from 'react'
import './assets/styles/main.scss'
import Sidebar from './cmps/sidebar/Sidebar'
import FeedIndex from './views/FeedIndex'
import NewsIndex from './views/NewsIndex'
import LoginPage from './views/LoginPage'
import EditSqueakPage from './views/EditSqueakPage'
import { Route, HashRouter as Router, Switch } from 'react-router-dom'

function App() {
    const [topBarOption, settopBarOption] = useState('Home')

    const handleSidebarOptionClick = (topBarOption: string) => {
        settopBarOption(topBarOption)
    }

    return (
        <Router>
            <section className="app-container">
                    <Sidebar onOptionChange={handleSidebarOptionClick} />
                    <FeedIndex topBarOption={topBarOption} />
                    <NewsIndex />
                <Switch>
                    <Route path="/login" component={LoginPage} />
                    <Route path="/edit" component={EditSqueakPage} />
                </Switch>
            </section>
        </Router>
    )
}

export default App
