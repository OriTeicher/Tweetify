import React, { useState } from 'react'
import './assets/styles/main.scss'
import { Hompage } from './views/Homepage'
import LoginPage from './views/LoginPage'
import EditSqueakPage from './views/EditSqueakPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Hompage />} />
                <Route path="/Squeaker-Twitter-clone" element={<Hompage />} />
                <Route path="/edit" element={<EditSqueakPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
