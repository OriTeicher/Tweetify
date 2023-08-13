/* eslint-disable @typescript-eslint/no-redeclare */
import React, { useState } from 'react'
import { Verified, MoreHoriz, MoreVert } from '@mui/icons-material'
import { utilService } from '../../services/util.service'
import { RootState } from '../../app/store'
import { Action } from '@reduxjs/toolkit'
import { feedActions } from '../../app/actions/feed.actions'
import { ThunkDispatch } from 'redux-thunk'
import { useSelector, useDispatch } from 'react-redux'
import ImgModal from '../utils/ImgModal'
import OptionsDropdown from '../utils/OptionsDropdown'
import FeedPreviewIcons from './FeedPreviewIcons'
interface FeedContentPreview {
    id: string
    displayName: string
    username: string
    verified: boolean
    createdAt: number
    content?: string
    imgUrl?: string
    onReadPost: Function
}

const FeedContentPreview: React.FC<FeedContentPreview> = (props: FeedContentPreview) => {
    const [isImgModalOpen, setIsImgModalOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const dispatch: ThunkDispatch<RootState, undefined, Action<string>> = useDispatch()

    const { filterBy } = useSelector((state: RootState) => {
        return state.feed
    })

    const dropdownOptions = ['Read Post', 'Delete Post']

    const handleRemovePost = async (selectedId: string) => {
        dispatch(feedActions.removeFeedPost(selectedId))
    }

    const handleDropdownSelect = (option: string) => {
        if (option === 'Delete Post') handleRemovePost(props.id)
        else props.onReadPost(props.id)
    }

    const handleImageClick = (isOpen: boolean) => {
        setIsImgModalOpen(isOpen)
    }

    const truncatedUsername =
        props.username.length > 15 ? props.username.slice(0, 3) + '...' : props.username

    const highlightMatchedTxt = (text: string, filterBy: string) => {
        const regex = new RegExp(`(${filterBy})`, 'gi')
        return text.replace(regex, '<mark>$1</mark>')
    }

    const markedDisplayName = truncatedUsername.includes(filterBy) ? (
        <span
            dangerouslySetInnerHTML={{
                __html: highlightMatchedTxt(props.displayName, filterBy)
            }}
        ></span>
    ) : (
        props.displayName
    )

    const markedUsername = truncatedUsername.includes(filterBy) ? (
        <span
            dangerouslySetInnerHTML={{
                __html: highlightMatchedTxt(truncatedUsername, filterBy)
            }}
        ></span>
    ) : (
        props.username
    )

    const markedTxt = props.content ? (
        <pre
            className="post-txt"
            dangerouslySetInnerHTML={{
                __html: highlightMatchedTxt(props.content, filterBy)
            }}
        ></pre>
    ) : null

    return (
        <section className="post-info-container">
            <div className="top-cred">
                <h1>{markedDisplayName}</h1>
                {props.verified && <Verified className="verified-logo" />}
                <h2>@{markedUsername}</h2>
                <h3>.</h3>
                <p className="post-date">{utilService.getCurrentDate(props.createdAt)}</p>
                <MoreHoriz
                    className="more-icon"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                />
                <MoreVert
                    className="more-icon mobile"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                />
                {isDropdownOpen && (
                    <OptionsDropdown
                        setDropdownOption={handleDropdownSelect}
                        options={dropdownOptions}
                    />
                )}
            </div>
            {markedTxt}
            {props.imgUrl && (
                <img
                    src={props.imgUrl}
                    className="post-photo"
                    alt="🖼️"
                    onClick={() => handleImageClick(true)}
                ></img>
            )}
            {isImgModalOpen && (
                <ImgModal imgUrl={props.imgUrl} onCloseModal={() => handleImageClick(false)} />
            )}
            <FeedPreviewIcons
                likesNum={100}
                commentsNum={2}
                resqueaksNum={2}
                onIconClick={()=>{}}
            />
        </section>
    )
}

export default FeedContentPreview
