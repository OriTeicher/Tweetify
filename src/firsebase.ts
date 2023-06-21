import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDocs,
    deleteDoc,
    setDoc
} from 'firebase/firestore'
import { feedService } from './services/feed.service'
import { POSTS_DB_COLLECTION } from './services/db.service'

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
        await addDoc(collection(db, POSTS_DB_COLLECTION), {
            ...item
        })
    } catch (error) {
        console.error('Error adding document: ', error)
    }
}

export async function addItemsToCollection(items: object[], col: string) {
    try {
        for (let i = 0; i < items.length; i++) {
            await addItemToCollection(items[i], col)
        }
    } catch (error) {
        console.error('Error adding document: ', error)
    }
}

export async function getCollectionFromDB(col: string) {
    try {
        const querySnapshot = await getDocs(collection(db, col))
        const collectionArr = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            displayName: doc.data().displayName,
            username: doc.data().username,
            txt: doc.data().txt,
            avatar: doc.data().avatar,
            imgUrl: doc.data().imgUrl || '',
            verified: doc.data().verified || false,
            createdAt: doc.data().createdAt || '',
            likes: doc.data().likes || 0,
            comments: doc.data().comments || [],
            resqueaks: doc.data().resqueaks || 0
        }))
        return collectionArr
    } catch (error) {
        console.error('Error getting collection: ', error)
        return []
    }
}

export async function removeItemFromDB(itemId: string, col: string) {
    try {
        await deleteDoc(doc(db, col, itemId))
    } catch (error) {
        console.error('Error getting collection: ', error)
        return []
    }
}

export async function setDemoDB(postsNum: number) {
    const randomPosts = feedService.getRandomPosts(postsNum)
    for (let i = 0; i < postsNum; i++) {
        await addItemToCollection(randomPosts[i], POSTS_DB_COLLECTION)
    }
}
