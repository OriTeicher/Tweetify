import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import reportWebVitals from './reportWebVitals'
import feedStore from './app/store'
import { youtubeService } from './services/youtube.service'

const rootElement = document.getElementById('root') as Element

createRoot(rootElement).render(
    <Provider store={feedStore}>
        <App />
    </Provider>
)

reportWebVitals()
