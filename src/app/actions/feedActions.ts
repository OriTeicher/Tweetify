import { feedReducers } from '../reducers/feedSlice'
import { dbService } from '../../services/db.service'
import { AppThunk } from '../feedStore'
import { feedService } from '../../services/feed.service'

export const feedActions = {
    queryFeedPosts,
    addFeedPost,
    removeFeedPost,
    toggleLikes
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

function addFeedPost(postContent: string): AppThunk {
    return async (dispatch) => {
        try {
            dispatch(feedReducers.setPostLoaderActive())
            const newPost = feedService.getEmptyPost(
                'Pukki Blinders',
                'oriteicher'
            )
            newPost.txt = postContent
            await dbService.addItemToCollection(
                newPost,
                dbService.POSTS_DB_COLLECTION,
                newPost.id
            )
            console.log('newPost',newPost)
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

function toggleLikes(postId: string, isLiked: boolean): AppThunk {
    return async (dispatch) => {
        try {
            dispatch(feedReducers.toggleLikesSuccess({ postId, isLiked }))
        } catch (error) {
            console.log('Cannot toggle likes. ', error)
        }
    }
}
