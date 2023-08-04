import React, { useState } from 'react'
import { Verified, MoreHoriz, MoreVert } from '@mui/icons-material'
import { utilService } from '../../services/util.service'
import { RootState } from '../../app/store'
import { Action } from '@reduxjs/toolkit'
import { feedActions } from '../../app/actions/feed.actions'
import { ThunkDispatch } from 'redux-thunk'
import { useSelector,useDispatch } from 'react-redux'
import ImgModal from '../utils/ImgModal'

interface FeedContentPreview {
    id: string
    displayName: string
    username: string
    verified: boolean
    createdAt: number
    content?: string
    imgUrl?: string
}

const FeedContentPreview: React.FC<FeedContentPreview> = ({
    id,
    displayName,
    username,
    verified,
    createdAt,
    content,
    imgUrl
}) => {
    const [isImgClicked, setIsImgClicked] = useState(false)

    const dispatch: ThunkDispatch<
        RootState,
        undefined,
        Action<string>
    > = useDispatch()

    const { filterBy } = useSelector((state: RootState) => {
        return state.feed
    })

    const handleRemovePost = async (postId: string) => {
        dispatch(feedActions.removeFeedPost(postId))
    }


    // TODO: fix img modal

    const truncatedUsername =
        username.length > 15 ? username.slice(0, 3) + '...' : username

    const highlightMatchedTxt = (text: string, filterBy: string) => {
        const regex = new RegExp(`(${filterBy})`, 'gi')
        return text.replace(regex, '<mark>$1</mark>')
    }

    const markedDisplayName = truncatedUsername.includes(filterBy) ? (
        <span
            dangerouslySetInnerHTML={{
                __html: highlightMatchedTxt(displayName, filterBy)
            }}
        ></span>
    ) : (
        displayName
    )

    const markedUsername = truncatedUsername.includes(filterBy) ? (
        <span
            dangerouslySetInnerHTML={{
                __html: highlightMatchedTxt(truncatedUsername, filterBy)
            }}
        ></span>
    ) : (
        username
    )

    const markedTxt = content ? (
        <pre
            className="post-txt"
            dangerouslySetInnerHTML={{
                __html: highlightMatchedTxt(content, filterBy)
            }}
        ></pre>
    ) : null

    return (
        <section className="post-info-container">
            <div className="top-cred">
                <h1>{markedDisplayName}</h1>
                {verified && <Verified className="verified-logo" />}
                <h2>@{markedUsername}</h2>
                <h3>.</h3>
                <p className="post-date">
                    {utilService.getCurrentDate(createdAt)}
                </p>
                <MoreHoriz
                    className="more-icon"
                    onClick={() => handleRemovePost(id)}
                />
                <MoreVert
                    className="more-icon mobile"
                    onClick={() => handleRemovePost(id)}
                />
            </div>
            {markedTxt}
            {imgUrl && (
                <img
                    src={imgUrl}
                    className="post-photo"
                    alt="NOTHING TO SEE HERE 🖼️"
                    onClick={() => setIsImgClicked(true)}
                ></img>
            )}
            {isImgClicked && (
                <ImgModal
                    imgUrl={imgUrl}
                    onCloseModal={() => setIsImgClicked(false)}
                />
            )}
        </section>
    )
}

export default FeedContentPreview
