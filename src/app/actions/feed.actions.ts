import { feedReducers } from '../reducers/feed.slice'
import { dbService } from '../../services/db.service'
import { AppThunk } from '../store'
import { feedService } from '../../services/feed.service'
import { cloudinaryService } from '../../services/cloudinary.service'
import { loaderReducers } from '../reducers/loader.slice'
import { constsService } from '../../services/consts.service'

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
            dispatch(loaderReducers.toggleAppLoader())
            let feedPostsDB = await dbService.getCollectionFromDB(
                dbService.POSTS_DB_COLLECTION
            )
            if (feedPostsDB.length < dbService.MIN_POST_NUM) {
                await dbService.setDemoDB(constsService.DEMO_POSTS_NUM)
                feedPostsDB = await dbService.getCollectionFromDB(
                    dbService.POSTS_DB_COLLECTION
                )
            }
            dispatch(loaderReducers.toggleAppLoader())
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
            dispatch(loaderReducers.toggleNewPostLoader())
            const newPost = feedService.getEmptyPost(loggedInUser, postContent)

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
            await dbService.pushStringToArrayField(
                loggedInUser.id,
                dbService.USER_DB_COLLECTION,
                'postsId',
                newPost.id
            )

            dispatch(feedReducers.addFeedPostSuccess(newPost))
        } catch (error) {
            console.log('Cannot add post. ', error)
        }
    }
}

function removeFeedPost(postId: string): AppThunk {
    return async (dispatch) => {
        dispatch(loaderReducers.toggleNewPostLoader())
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
            dispatch(feedReducers.toggleStatsSuccess())
            await dbService.updateFieldInCollection(
                postId,
                constsService.LIKES_FIELD,
                dbService.POSTS_DB_COLLECTION,
                isIncrease ? constsService.LIKE : constsService.UNLIKE
            )
        } catch (error) {
            console.log('Cannot toggle likes. ', error)
        }
    }
}

function setFilterBy(newFilterBy: string): AppThunk {
    return async (dispatch) => {
        try {
            dispatch(loaderReducers.toggleAppLoader())
            dispatch(feedReducers.setFilterBySuccess(newFilterBy))
            const feedPostsDB = await dbService.getCollectionFromDB(
                dbService.POSTS_DB_COLLECTION,
                newFilterBy
            )
            dispatch(feedReducers.queryFeedPostsSuccess(feedPostsDB))
            dispatch(loaderReducers.toggleAppLoader())
        } catch (error) {
            console.log('Cannot set filter by. ', error)
        }
    }
}

// TODO: fix add comment functions
// function addFeedComment(
//     postContent: string,
//     file: File | null,
//     gifUrl: string = '',
//     postId: string
// ): AppThunk {
//     return async (dispatch) => {
//         try {
//             dispatch(feedReducers.setAppLoaderActive)
//             const newComment = feedService.getEmptyPost(
//                 'Pukki Blinders',
//                 'pukki123',
//                 '',
//                 ''
//             )
//             newComment.content = postContent
//             newComment.imgUrl = file
//                 -? await cloudinaryService.uploadImgToCloud(file)
//                 : gifUrl
//                 -? gifUrl
//                 : ''

//             const updatedPost = await dbService.getPostByIdFromDb(
//                 postId,
//                 dbService.POSTS_DB_COLLECTION,
//                 newComment
//             )
//             // dispatch(feedReducers.addCommentSuccess(updatedPost))
//         } catch (error) {
//             console.log('Cannot add post. ', error)
//         }
//     }
// }
