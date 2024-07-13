import axios from 'axios'
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from './api.service'

const clientId = SPOTIFY_CLIENT_ID
const clientSecret = SPOTIFY_CLIENT_SECRET

const getSpotifyToken = async (): Promise<string> => {
    const response = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`
        }
    })
    return response.data.access_token
}

const getAlbumDetails = async (artistId: string | undefined): Promise<any[] | any> => {
    try {
        const accessToken = await getSpotifyToken()
        const response = await axios.get(`https://api.spotify.com/v1/albums/${artistId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        const { artists, images, tracks } = response.data
        return { artists, images, tracks }
    } catch (error) {
        console.log('error', error)
    }
}

const searchAlbum = async (albumName: string, artistName: string): Promise<string> => {
    try {
        const accessToken = await getSpotifyToken()

        const response = await axios.get(`https://api.spotify.com/v1/search`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            params: {
                q: `album:${albumName} artist:${artistName}`,
                type: 'album'
            }
        })

        const album = response.data.albums.items[0]
        return album.id
    } catch (error: any) {
        console.error('Error searching album on Spotify:', error.response ? error.response.data : error.message)
        throw error
    }
}

const getTracks = async (albumId: string | undefined): Promise<any[]> => {
    try {
        if (!albumId) Promise.reject('no id found')
        const accessToken = await getSpotifyToken()

        const response = await axios.get(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        return response.data.items
    } catch (error: any) {
        console.error('Error fetching tracks from Spotify:', error.response ? error.response.data : error.message)
        return []
    }
}

export const spotifyService = {
    getAlbumDetails,
    getTracks,
    searchAlbum
}
