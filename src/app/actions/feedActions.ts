import { feedReducers } from '../reducers/feedSlice'
import { dbService } from '../../services/db.service'
import { AppThunk } from '../feedStore'
import { feedService } from '../../services/feed.service'
import { cloudinaryService } from '../../services/cloudinary.service'

export const feedActions = {
    queryFeedPosts,
    addFeedPost,
    addFeedComment,
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
    loggedInUser: any,
    postContent: string,
    file: File | null,
    gifUrl: string = ''
): AppThunk {
    return async (dispatch) => {
        try {
            dispatch(feedReducers.setNewPostLoaderActive())
            console.log('loggedInUser.profileImg', loggedInUser)
            const newPost = feedService.getEmptyPost(
                loggedInUser.displayName,
                loggedInUser.username,
                loggedInUser.profileImgUrl,
                postContent
            )

            newPost.imgUrl = file
                ? await cloudinaryService.uploadImgToCloud(file)
                : gifUrl
                ? gifUrl
                : ''
                
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
            dispatch(feedReducers.setAppLoaderActive())
            dispatch(feedReducers.setFilterBy(newFilterBy))
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

function addFeedComment(
    postContent: string,
    file: File | null,
    gifUrl: string = '',
    postId: string
): AppThunk {
    return async (dispatch) => {
        try {
            dispatch(feedReducers.setAppLoaderActive)
            const newComment = feedService.getEmptyPost(
                'Pukki Blinders',
                'pukki123',
                '',
                ''
            )
            newComment.content = postContent
            newComment.imgUrl = file
                ? await cloudinaryService.uploadImgToCloud(file)
                : gifUrl
                ? gifUrl
                : ''

            const updatedPost = await dbService.getPostByIdFromDb(
                postId,
                dbService.POSTS_DB_COLLECTION,
                newComment
            )
            // dispatch(feedReducers.addCommentSuccess(updatedPost))
        } catch (error) {
            console.log('Cannot add post. ', error)
        }
    }
}
