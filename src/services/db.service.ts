import {
    collection,
    doc,
    updateDoc,
    getDocs,
    deleteDoc,
    setDoc,
    increment
} from 'firebase/firestore'
import { feedService } from './feed.service'
import { db } from '../firsebase'

export const dbService = {
    // functions
    addItemToCollection,
    getCollectionFromDB,
    removeItemFromDB,
    updateItemInCollection,
    updateFieldInCollection,
    setDemoDB,

    // consts
    POSTS_DB_COLLECTION: 'posts',
    USER_DB_COLLECTION: 'users',
    MIN_POST_NUM: 10
}

async function addItemToCollection(item: object, itemId: string, col: string) {
    try {
        await setDoc(doc(db, col, itemId), item)
    } catch (error) {
        console.error('Error adding document: ', error)
    }
}

async function getCollectionFromDB(col: string, filterBy: string = '') {
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
            createdAt: doc.data().createdAt || Date.now(),
            likes: doc.data().likes || 0,
            comments: doc.data().comments || [],
            resqueaks: doc.data().resqueaks || 0
        }))
        if (filterBy) {
            const resArr = collectionArr.filter((post) =>
                post.txt.includes(filterBy)
            )
            return resArr
        } else return collectionArr
    } catch (error) {
        console.error('Error getting collection: ', error)
        return []
    }
}

async function removeItemFromDB(itemId: string, col: string) {
    try {
        await deleteDoc(doc(db, col, itemId))
    } catch (error) {
        console.error('Error removing item from collection: ', error)
        return []
    }
}

async function setDemoDB(postsNum: number) {
    const randomPosts = feedService.getRandomPosts(postsNum)
    for (let i = 0; i < 1; i++) {
        try {
            await addItemToCollection(
                randomPosts[i],
                randomPosts[i].id,
                dbService.POSTS_DB_COLLECTION
            )
        } catch (error) {
            console.log('cant add demo data', error)
        }
    }
}

async function updateItemInCollection(
    updatedItem: object,
    itemId: string,
    col: string
) {
    try {
        await setDoc(doc(db, col, itemId), { ...updatedItem })
    } catch (error) {
        console.log('Cannot update item - ', error)
    }
}

async function updateFieldInCollection(
    itemId: string,
    field: string,
    col: string,
    updatedInfo: any
) {
    try {
        const colRef = doc(db, col, itemId)
        const updatedItem = { [field]: increment(updatedInfo) }
        await updateDoc(colRef, updatedItem)
    } catch (error) {
        console.log(`Cannot update ${field} of item: ${itemId}`, Error)
    }
}
