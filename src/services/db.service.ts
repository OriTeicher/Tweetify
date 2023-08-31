import {
    collection,
    doc,
    updateDoc,
    getDocs,
    deleteDoc,
    setDoc,
    increment,
    arrayUnion
} from 'firebase/firestore'
import { feedService } from './feed.service'
import { db } from '../firebase'

export const dbService = {
    // functions
    addItemToCollection,
    getCollectionFromDB,
    removeItemFromDB,
    updateItemInCollection,
    updateFieldInCollection,
    setDemoDB,
    pushStringToArrayField,
    getPostByIdFromDb,

    // consts
    POSTS_DB_COLLECTION: 'posts',
    USER_DB_COLLECTION: 'users',
    MIN_POST_NUM: 20,
    POSTS_ID_FIELD: 'postsId'
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
            owner: doc.data().owner,
            username: doc.data().username,
            content: doc.data().content,
            imgUrl: doc.data().imgUrl || '',
            createdAt: doc.data().createdAt || Date.now(),
            likes: doc.data().likes || 0,
            comments: doc.data().comments || [],
            resqueaks: doc.data().resqueaks || 0,
            filterBy
        }))
        if (filterBy) {
            const resArr = collectionArr.filter(
                (post) =>
                    post.content.toLowerCase().includes(filterBy.toLowerCase()) ||
                    post.owner.username.toLowerCase().includes(filterBy.toLowerCase()) ||
                    post.owner.displayName.toLowerCase().includes(filterBy.toLowerCase())
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
    for (let i = 0; i < postsNum; i++) {
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

async function updateItemInCollection(updatedItem: object, itemId: string, col: string) {
    try {
        await setDoc(doc(db, col, itemId), { ...updatedItem })
    } catch (error) {
        console.log('Cannot update item - ', error)
    }
}

async function pushStringToArrayField(itemId: string, col: string, field: string, val: string) {
    try {
        const colRef = doc(db, col, itemId)
        const updatedItem = {
            [field]: arrayUnion(val)
        }
        await updateDoc(colRef, updatedItem)
    } catch (error) {
        console.log(`Error pushing string to array field: ${error}`)
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

async function getPostByIdFromDb(itemId: string, col: string) {
    try {
        const querySnapshot = await getDocs(collection(db, col))
        const collectionArr = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            owner: doc.data().owner,
            username: doc.data().username,
            content: doc.data().content,
            imgUrl: doc.data().imgUrl || '',
            createdAt: doc.data().createdAt || Date.now(),
            likes: doc.data().likes || 0,
            comments: doc.data().comments || [],
            resqueaks: doc.data().resqueaks || 0
        }))
        const resArr = collectionArr.filter((post) => post.id === itemId)
        return resArr[0]
    } catch (error) {
        console.error('Error getting collection: ', error)
        return []
    }
}
