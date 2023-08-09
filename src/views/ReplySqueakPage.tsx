import React from 'react'
import { FeedPost } from '../services/interface.service'
import { FeedPreview } from '../cmps/feed/FeedPreview'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch, Action } from '@reduxjs/toolkit'
import { RootState } from '../app/store'

export default function ReplySqueakPage() {
    const { selectedSqueakId } = useSelector((state: RootState) => {
        return state.feed
    })

    return <section className="reply-page-container"></section>
}

// {
// <SqueakPreview />
// }

// {props.comments.map((comment, idx) => (
// ////// *** COMMENTS HERE ***  //////
//     <FeedPreview
//         key={idx}
//         id={comment.id}
//         owner={comment.owner}
//         content={comment.content}
//         imgUrl={comment.imgUrl}
//         createdAt={comment.createdAt}
//         likes={comment.likes}
//         comments={comment.comments}
//         resqueaks={comment.resqueaks}
//     />
// ))}
