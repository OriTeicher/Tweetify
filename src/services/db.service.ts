import {
    collection,
    doc,
    addDoc,
    getDocs,
    deleteDoc,
    setDoc
} from 'firebase/firestore'
import { feedService } from './feed.service'
import { db } from '../firsebase'

export const dbService = {
    // functions
    addItemToCollection,
    addItemsArrToCollection,
    getCollectionFromDB,
    removeItemFromDB,
    setDemoDB,

    // consts
    POSTS_DB_COLLECTION: 'posts',
    USER_DB_COLLECTION: 'users',
    MIN_POST_NUM: 10
}

async function addItemToCollection(item: object, col: string) {
    try {
        await addDoc(collection(db, dbService.POSTS_DB_COLLECTION), {
            ...item
        })
    } catch (error) {
        console.error('Error adding document: ', error)
    }
}

async function addItemsArrToCollection(items: object[], col: string) {
    try {
        for (let i = 0; i < items.length; i++) {
            await addItemToCollection(items[i], col)
        }
    } catch (error) {
        console.error('Error adding document: ', error)
    }
}

async function getCollectionFromDB(col: string) {
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

async function removeItemFromDB(itemId: string, col: string) {
    try {
        await deleteDoc(doc(db, col, itemId))
    } catch (error) {
        console.error('Error getting collection: ', error)
        return []
    }
}

async function setDemoDB(postsNum: number) {
    const randomPosts = feedService.getRandomPosts(postsNum)
    for (let i = 0; i < postsNum; i++) {
        await addItemToCollection(randomPosts[i], dbService.POSTS_DB_COLLECTION)
    }
}
