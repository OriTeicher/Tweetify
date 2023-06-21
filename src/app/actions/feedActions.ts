import { feedReducers } from '../reducers/feedSlice'
import { dbService } from '../../services/db.service'
import { AppThunk } from '../feedStore'

export const queryFeedPosts = (): AppThunk => async (dispatch) => {
    try {
        let feedPostsDB = await dbService.getCollectionFromDB(
            dbService.POSTS_DB_COLLECTION
        )
        if (feedPostsDB.length < dbService.MIN_POST_NUM) {
            await dbService.setDemoDB(dbService.MIN_POST_NUM)
            feedPostsDB = await dbService.getCollectionFromDB(
                dbService.POSTS_DB_COLLECTION
            )
        }
        dispatch(feedReducers.queryFeedPostsSuccess(feedPostsDB))
    } catch (error) {
        console.log(error)
        dispatch(feedReducers.queryFeedPostsFailure())
    }
}
