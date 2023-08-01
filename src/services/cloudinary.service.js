import axios from 'axios';
import { apiService } from './api.service';

export const cloudinaryService = {
    uploadImgToCloud,
};

async function uploadImgToCloud(file) {
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${apiService.CLOUD_NAME}/image/upload`;
    try {
        const formData = new FormData();
        formData.append('upload_preset', apiService.UPLOAD_PRESET);
        formData.append('file', file);

        const res = await axios.post(UPLOAD_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        const imgUrl = res.data;
        return imgUrl.url;
    } catch (err) {
        console.error('Failed to upload', err);
        throw err;
    }
}
