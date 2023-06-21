import { feedReducers } from '../reducers/feedSlice'
import { dbService } from '../../services/db.service'
import { AppThunk } from '../feedStore'
import { feedService } from '../../services/feed.service'

export const feedActions = {
    queryFeedPosts,
    addFeedPost,
    removeFeedPost
}

function queryFeedPosts(): AppThunk {
    return async (dispatch) => {
        try {
            dispatch(feedReducers.setLoaderActive())
            debugger
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
            const newPost = feedService.getEmptyPost(
                'Pukki Blinders',
                'oriteicher'
            )
            newPost.txt = postContent
            await dbService.addItemToCollection(
                newPost,
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
