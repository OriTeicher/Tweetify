import './assets/styles/main.scss'
import FeedIndex from './views/FeedIndex'
import ProfilePage from './views/ProfilePage'
import CreateProfilePage from './views/CreateProfilePage'
import ReplySqueakPage from './views/ReplySqueakPage'
import PlaylistsIndex from './views/PlaylistsIndex'
import { AppCenterDynamicCmp } from './views/AppCenterDynamicCmp'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SilentLogin } from './services/http.service'

function App() {
    return (
        <BrowserRouter>
            <SilentLogin />
            <Routes>
                <Route path="/*" element={<AppCenterDynamicCmp cmp={FeedIndex} />} />
                <Route path="/home" element={<AppCenterDynamicCmp cmp={FeedIndex} />} />
                <Route path="/home/:id" element={<AppCenterDynamicCmp cmp={ReplySqueakPage} />} />
                <Route path="/profile" element={<AppCenterDynamicCmp cmp={ProfilePage} />} />
                <Route path="/newprofile" element={<AppCenterDynamicCmp cmp={CreateProfilePage} />} />
                <Route path="/newprofile/:id" element={<AppCenterDynamicCmp cmp={CreateProfilePage} />} />
                <Route path="/playlists" element={<AppCenterDynamicCmp cmp={PlaylistsIndex} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
