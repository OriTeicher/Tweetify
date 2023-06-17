import React from 'react'

interface FeedPreviewProps {
    displayName: string
    username: string
    txt: string
    image: string
    avatar: string
    verified: boolean
    createdAt: string
}

const FeedPreview: React.FC<FeedPreviewProps> = ({
    displayName,
    username,
    txt,
    image,
    avatar,
    verified,
    createdAt
}) => {
    return (
        <section className="post-preview">
            <p>Display Name: {displayName}</p>
            <p>Username: {username}</p>
            <p>Text: {txt}</p>
            <p>Image: {image}</p>
            <p>Avatar: {avatar}</p>
            <p>Verified: {verified ? 'Yes' : 'No'}</p>
            <p>Created At: {createdAt}</p>
        </section>
    )
}

export default FeedPreview
