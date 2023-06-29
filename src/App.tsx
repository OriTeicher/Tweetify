import './assets/styles/main.scss'
import { Hompage } from './views/Homepage'
import EditSqueakPage from './views/EditSqueakPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProfilePage from './views/ProfilePage'
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Hompage />} />
                <Route path="/Squeaker-Twitter-clone" element={<Hompage />} />
                <Route path="/edit" element={<EditSqueakPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
