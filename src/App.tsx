import './assets/styles/main.scss'
import FeedIndex from './views/FeedIndex'
import ProfilePage from './views/ProfilePage'
import CreateProfilePage from './views/CreateProfilePage'
import ReplySqueakPage from './views/ReplySqueakPage'
import PlaylistsIndex from './views/PlaylistsIndex'
import { AppCenterDynamicCmp } from './views/AppCenterDynamicCmp'
import { HashRouter, Routes, Route } from 'react-router-dom'
import PlaylistPage from './views/PlaylistPage'

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/*" element={<AppCenterDynamicCmp cmp={FeedIndex} />} />
                <Route path="/home" element={<AppCenterDynamicCmp cmp={FeedIndex} />} />
                <Route path="/home/:id" element={<AppCenterDynamicCmp cmp={ReplySqueakPage} />} />
                <Route path="/profile" element={<AppCenterDynamicCmp cmp={ProfilePage} />} />
                <Route path="/newprofile" element={<AppCenterDynamicCmp cmp={CreateProfilePage} />} />
                <Route path="/newprofile/:id" element={<AppCenterDynamicCmp cmp={CreateProfilePage} />} />
                <Route path="/playlists" element={<AppCenterDynamicCmp cmp={PlaylistsIndex} />} />
                <Route path="/playlists/:albumId" element={<AppCenterDynamicCmp cmp={PlaylistPage} />} />
            </Routes>
        </HashRouter>
    )
}

export default App
