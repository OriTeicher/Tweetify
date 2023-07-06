import axios from 'axios'
export const uploadService = {
    uploadImg
}

async function uploadImg(image: File): Promise<string> {
    const formData = new FormData()
    formData.append('image', image)

    try {
        const response = await axios.post('/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        return response.data.imageUrl
    } catch (error) {
        console.error('Error uploading image:', error)
        throw error
    }
}
