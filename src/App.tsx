import './assets/styles/main.scss'
import { AppCenterDynamicCmp } from './views/AppCenterDynamicCmp'
import EditSqueakPage from './views/EditSqueakPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FeedIndex from './views/FeedIndex'
import ProfilePage from './views/ProfilePage'
import CreateProfilePage from './views/CreateProfilePage'
import ReplySqueakPage from './views/ReplySqueakPage'
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppCenterDynamicCmp cmp={FeedIndex} />} />
                <Route path="/home" element={<AppCenterDynamicCmp cmp={FeedIndex} />} />
                <Route path="/home/:id" element={<AppCenterDynamicCmp cmp={ReplySqueakPage} />} />
                <Route path="/*" element={<AppCenterDynamicCmp cmp={FeedIndex} />} />
                <Route path="/edit" element={<EditSqueakPage />} />
                <Route path="/profile/:id" element={<AppCenterDynamicCmp cmp={ProfilePage} />} />
                <Route
                    path="/newprofile"
                    element={<AppCenterDynamicCmp cmp={CreateProfilePage} />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App
