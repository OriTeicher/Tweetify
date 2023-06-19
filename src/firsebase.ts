import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyDVbyExXQOFMdZDnOjk1FDRrJpvpxo-ctc',
    authDomain: 'squeaker-twitter-clone.firebaseapp.com',
    projectId: 'squeaker-twitter-clone',
    storageBucket: 'squeaker-twitter-clone.appspot.com',
    messagingSenderId: '235687518835',
    appId: '1:235687518835:web:6db9a3c0f272ce1e5a0006',
    measurementId: 'G-CC4GWBLDFW'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)


export async function addItemToCollection(item: object, col: string) {
    try {
        const docRef = await addDoc(collection(db, col), {
            ...item
        })
        console.log('Document written with ID: ', docRef.id)
    } catch (e) {
        console.error('Error adding document: ', e)
    }
}

export async function getCollectionFromDB(col: string) {
    try {
        const querySnapshot = await getDocs(collection(db, col))
        const collectionArr = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))
        return collectionArr
    } catch (e) {
        console.error('Error getting collection: ', e)
        return []
    }
}
