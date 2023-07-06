import { feedReducers } from '../reducers/feedSlice'
import { dbService } from '../../services/db.service'
import { AppThunk } from '../feedStore'
import { feedService } from '../../services/feed.service'

export const feedActions = {
    queryFeedPosts,
    addFeedPost,
    removeFeedPost,
    toggleStats
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

function addFeedPost(postContent: string,postImgUrl: string): AppThunk {
    return async (dispatch) => {
        try {
            dispatch(feedReducers.setNewPostLoaderActive())
            const newPost = feedService.getEmptyPost(
                'Pukki Blinders',
                'oriteicher'
            )
            newPost.txt = postContent
            newPost.imgUrl = postImgUrl
            await dbService.addItemToCollection(
                newPost,
                newPost.id,
                dbService.POSTS_DB_COLLECTION
            )
            console.log('newPost', newPost)
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
