import './assets/styles/main.scss'
import { Hompage as DynamicHomepage } from './views/Homepage'
import EditSqueakPage from './views/EditSqueakPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FeedIndex from './cmps/feed/FeedIndex'
import ProfilePage from './views/ProfilePage'
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DynamicHomepage />} />
                <Route
                    path="/home"
                    element={<DynamicHomepage cmp={FeedIndex} />}
                />
                <Route
                    path="/Squeaker-Twitter-clone"
                    element={<DynamicHomepage cmp={FeedIndex} />}
                />
                <Route
                    path="/*"
                    element={<DynamicHomepage cmp={FeedIndex} />}
                />
                <Route path="/edit" element={<EditSqueakPage />} />
                <Route
                    path="/profile"
                    element={<DynamicHomepage cmp={ProfilePage} />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App
