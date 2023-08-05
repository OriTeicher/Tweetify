import './assets/styles/main.scss'
import { Hompage as DynamicHomepage } from './views/Homepage'
import EditSqueakPage from './views/EditSqueakPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FeedIndex from './views/FeedIndex'
import ProfilePage from './views/ProfilePage'
import CreateProfilePage from './views/CreateProfilePage'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DynamicHomepage cmp={FeedIndex} />} />
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
                <Route
                    path="/newprofile"
                    element={<DynamicHomepage cmp={CreateProfilePage} />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App
