import store, { AppThunk } from '../store'
import { feedReducers } from '../reducers/feed.slice'
import { dbService } from '../../services/db.service'
import { feedService } from '../../services/feed.service'
import { cloudinaryService } from '../../services/cloudinary.service'
import { loaderReducers } from '../reducers/loader.slice'
import { FeedPost, User } from '../../services/interface.service'
import { httpService } from '../../services/http.service'
import { utilService } from '../../services/util.service'

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
            const paginationQuery = feedPosts.length > 0 ? `?limit=${25}&startAt=${feedPosts?.at(feedPosts?.length - 1)?.id}` : `?limit=${25}`
            let { data: feedPostsDB } = await httpService.get(`/posts${paginationQuery}`, true)
            if (feedPostsDB.length === 0) {
                await dbService.setDemoDB(3)
            }
            dispatch(feedReducers.queryFeedPostsSuccess(feedPostsDB))
            dispatch(loaderReducers.toggleAppLoader())
        } catch (error) {
            console.log(error)
        }
    }
}

function addFeedPost(loggedInUser: User, postContent: string, file: File | null, gifUrl: string = ''): AppThunk {
    return async (dispatch) => {
        try {
            dispatch(loaderReducers.toggleNewPostLoader())
            const newPost = feedService.getEmptyPost(loggedInUser, postContent)
            newPost.imgUrl = file ? await cloudinaryService.uploadImgToCloud(file) : gifUrl !== '' ? gifUrl : null

            const { data } = await httpService.post('/posts', () => utilService.objectAssignExact(newPost, { ...feedService.getEmptyCreatePostDto(), userId: loggedInUser.id }), true)

            dispatch(feedReducers.addFeedPostSuccess(data))
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

function toggleStats(postId: string, isLiked: boolean): AppThunk {
    return async (dispatch) => {
        try {
            dispatch(feedReducers.toggleStatsSuccess())
            let data
            if (!isLiked) data = (await httpService.post(`/posts/${postId}/like`, () => {})).data
            else data = (await httpService.post(`/posts/${postId}/dislike`, () => {})).data
            dispatch(feedReducers.removeFeedPostSuccess(data.id))
            dispatch(feedReducers.addFeedPostSuccess(data))
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
