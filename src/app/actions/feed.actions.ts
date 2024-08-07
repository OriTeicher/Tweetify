import { AppThunk } from '../store'
import { feedReducers } from '../reducers/feed.slice'
import { dbService } from '../../services/db.service'
import { feedService } from '../../services/feed.service'
import { cloudinaryService } from '../../services/cloudinary.service'
import { loaderReducers } from '../reducers/loader.slice'
import { FeedPost, User } from '../../services/interface.service'
import { EMPTY_STR, constsService } from '../../services/consts.service'
import { trendsActions } from './trends.actions'
// import { httpService } from '../../services/http.service'
// import { utilService } from '../../services/util.service'

export const feedActions = {
    queryFeedPosts,
    addFeedPost,
    removeFeedPost,
    toggleStats,
    setFilterBy,
    setSelectedSqueak
}

function queryFeedPosts(feedPosts: FeedPost[]): AppThunk {
    return async (dispatch) => {
        try {
            dispatch(loaderReducers.toggleAppLoader())
            // ! backend DONT DELETE!
            // const paginationQuery = feedPosts.length > 0 ? `?limit=${25}&startAt=${feedPosts?.at(feedPosts?.length - 1)?.id}` : `?limit=${25}`
            // let { data: feedPostsDB } = await httpService.get(`/posts${paginationQuery}`, true)
            // if (feedPostsDB.length === 0) {
            //     await dbService.setDemoDB(3)
            // }

            // ! frontend only  DONT DELETE!
            let feedPostsDB = await dbService.getCollectionFromDB(dbService.POSTS_DB_COLLECTION)
            if (feedPostsDB.length < dbService.MIN_POST_NUM) {
                await dbService.setDemoDB(constsService.DEMO_POSTS_NUM)
                feedPostsDB = await dbService.getCollectionFromDB(dbService.POSTS_DB_COLLECTION)
            }

            dispatch(trendsActions.getTrends(feedPostsDB))
            dispatch(feedReducers.queryFeedPostsSuccess(feedPostsDB))
            dispatch(loaderReducers.toggleAppLoader())
        } catch (error) {
            console.log(error)
        }
    }
}

function addFeedPost(loggedInUser: User, postContent: string, file: File | null, gifUrl: string = EMPTY_STR): AppThunk {
    return async (dispatch) => {
        try {
            dispatch(loaderReducers.toggleNewPostLoader())
            const newPost = feedService.getEmptyPost(loggedInUser, postContent)
            newPost.imgUrl = file ? await cloudinaryService.uploadImgToCloud(file) : gifUrl !== EMPTY_STR ? gifUrl : null
            await dbService.addItemToCollection(newPost, newPost.id, dbService.POSTS_DB_COLLECTION)
            dispatch(feedReducers.addFeedPostSuccess(newPost))
            dispatch(loaderReducers.toggleNewPostLoader())
        } catch (error) {
            console.log('Cannot add post. ', error)
        }
    }
}

function removeFeedPost(postId: string): AppThunk {
    return async (dispatch) => {
        dispatch(loaderReducers.toggleAppLoader())
        try {
            await dbService.removeItemFromDB(postId, dbService.POSTS_DB_COLLECTION)
            dispatch(feedReducers.removeFeedPostSuccess(postId))
            dispatch(loaderReducers.toggleAppLoader())
        } catch (error) {
            console.log('Cannot remove post. ', error)
        }
    }
}

function toggleStats(postId: string, isLike: boolean): AppThunk {
    return async () => {
        const diff = isLike ? constsService.LIKE : constsService.UNLIKE
        await dbService.updateFieldInCollection(postId, constsService.LIKES_FIELD, dbService.POSTS_DB_COLLECTION, diff)
    }
}

function setFilterBy(newFilterBy: string): AppThunk {
    return async (dispatch) => {
        try {
            dispatch(loaderReducers.toggleAppLoader())
            dispatch(feedReducers.setFilterBySuccess(newFilterBy))
            const feedPostsDB = await dbService.getCollectionFromDB(dbService.POSTS_DB_COLLECTION, newFilterBy)
            dispatch(feedReducers.queryFeedPostsSuccess(feedPostsDB))
            dispatch(loaderReducers.toggleAppLoader())
        } catch (error) {
            console.log('Cannot set filter by. ', error)
        }
    }
}

function setSelectedSqueak(selectedSqueak: FeedPost): AppThunk {
    return async (dispatch) => {
        try {
            dispatch(feedReducers.setSelectedSqueak(selectedSqueak))
        } catch (error) {
            console.log('Cannot set filter by.', error)
        }
    }
}

// TODO: fix add comment functions
// function addFeedComment(
//     postContent: string,
//     file: File | null,
//     gifUrl: string = EMPTY_STR,
//     postId: string
// ): AppThunk {
//     return async (dispatch) => {
//         try {
//             dispatch(feedReducers.setAppLoaderActive)
//             const newComment = feedService.getEmptyPost(
//                 'Pukki Blinders',
//                 'pukki123',
//                 EMPTY_STR,
//                 EMPTY_STR
//             )
//             newComment.content = postContent
//             newComment.imgUrl = file
//                 -? await cloudinaryService.uploadImgToCloud(file)
//                 : gifUrl
//                 -? gifUrl
//                 : EMPTY_STR

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
