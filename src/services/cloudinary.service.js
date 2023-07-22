import { apiService } from "./api.service"

export const cloudinaryService = {
    uploadImgToCloud
}

async function uploadImgToCloud(file) {
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${apiService.CLOUD_NAME}/image/upload`
    try {
        const formData = new FormData()
        formData.append('UPLOAD_PRESET', apiService.UPLOAD_PRESET)
        formData.append('file', file)

        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const imgUrl = await res.json()
        return imgUrl.url
    } catch (err) {
        console.error('Failed to upload', err)
        throw err
    }
}
