import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyDVbyExXQOFMdZDnOjk1FDRrJpvpxo-ctc',
    authDomain: 'squeaker-twitter-clone.firebaseapp.com',
    projectId: 'squeaker-twitter-clone',
    storageBucket: 'squeaker-twitter-clone.appspot.com',
    messagingSenderId: '235687518835',
    appId: '1:235687518835:web:6db9a3c0f272ce1e5a0006',
    measurementId: 'G-CC4GWBLDFW'
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
