import { feedReducers } from '../reducers/feedSlice'
import { dbService } from '../../services/db.service'
import { AppThunk } from '../feedStore'
import { feedService } from '../../services/feed.service'
import { cloudinaryService } from '../../services/cloudinary.service'

export const feedActions = {
    queryFeedPosts,
    addFeedPost,
    removeFeedPost,
    toggleStats,
    setFilterBy
}

function queryFeedPosts(): AppThunk {
    return async (dispatch) => {
        try {
            dispatch(feedReducers.setAppLoaderActive())
            let feedPostsDB = await dbService.getCollectionFromDB(
                dbService.POSTS_DB_COLLECTION
            )

            if (feedPostsDB.length < dbService.MIN_POST_NUM) {
                await dbService.setDemoDB(
                    dbService.MIN_POST_NUM - feedPostsDB.length
                )
                feedPostsDB = await dbService.getCollectionFromDB(
                    dbService.POSTS_DB_COLLECTION
                )
            }
            dispatch(feedReducers.queryFeedPostsSuccess(feedPostsDB))
        } catch (error) {
            console.log(error)
        }
    }
}

function addFeedPost(
    postContent: string,
    file: File | null,
    gifUrl: string = ''
): AppThunk {
    return async (dispatch) => {
        try {
            dispatch(feedReducers.setNewPostLoaderActive())
            const newPost = feedService.getEmptyPost(
                'Pukki Blinders',
                'pukki123'
            )
            newPost.txt = postContent
            newPost.imgUrl = file
                ? await cloudinaryService.uploadImgToCloud(file)
                : gifUrl
                ? gifUrl
                : ''
            console.log(
                '🚀 ~ file: feedActions.ts:48 ~ return ~ newPost:',
                newPost.imgUrl
            )

            await dbService.addItemToCollection(
                newPost,
                newPost.id,
                dbService.POSTS_DB_COLLECTION
            )

            dispatch(feedReducers.addFeedPostSuccess(newPost))
        } catch (error) {
            console.log('Cannot add post. ', error)
        }
    }
}

function removeFeedPost(postId: string): AppThunk {
    return async (dispatch) => {
        dispatch(feedReducers.setPostLoaderActive())
        try {
            await dbService.removeItemFromDB(
                postId,
                dbService.POSTS_DB_COLLECTION
            )
            dispatch(feedReducers.removeFeedPostSuccess(postId))
        } catch (error) {
            console.log('Cannot remove post. ', error)
        }
    }
}

function toggleStats(postId: string, isIncrease: boolean): AppThunk {
    return async (dispatch) => {
        try {
            dispatch(
                feedReducers.toggleStatsSuccess({
                    postId,
                    stat: 'likes',
                    isIncrease
                })
            )
            await dbService.updateFieldInCollection(
                postId,
                'likes',
                dbService.POSTS_DB_COLLECTION,
                isIncrease ? 1 : -1
            )
        } catch (error) {
            console.log('Cannot toggle likes. ', error)
        }
    }
}

function setFilterBy(newFilterBy: string): AppThunk {
    return async (dispatch) => {
        try {
            const feedPostsDB = await dbService.getCollectionFromDB(
                dbService.POSTS_DB_COLLECTION,
                newFilterBy
            )
            dispatch(feedReducers.queryFeedPostsSuccess(feedPostsDB))
        } catch (error) {
            console.log('Cannot set filter by. ', error)
        }
    }
}
