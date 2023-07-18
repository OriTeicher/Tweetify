
export const cloudinaryService = {
    uploadImgToCloud
}

async function uploadImgToCloud(file) {
    const UPLOAD_PRESET = import.meta.VITE_UPLOAD_PRESET
    const CLOUD_NAME = import.meta.VITE_CLOUD_NAME
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    console.log('UPLOAD_URL,UPLOAD_PRESET', UPLOAD_URL, UPLOAD_PRESET)
    try {
        const formData = new FormData()
        formData.append('upload_preset', UPLOAD_PRESET)
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
