import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Avatar } from '@mui/material'
import {
    InsertPhoto,
    Gif,
    EmojiEmotions,
    TagFacesOutlined
} from '@mui/icons-material'

interface SqueakBoxProps {
    addPost: (post: string) => void
}

export default function SqueakBox({ addPost }: SqueakBoxProps) {
    const [message, setMessage] = useState('')

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value)
    }

    const handleSqueak = (event: FormEvent) => {
        event.preventDefault()
        addPost(message)
        setMessage('')
    }

    return (
        <section className="squeak-box">
            <form onSubmit={handleSqueak}>
                <div className="squeak-input-container">
                    <Avatar
                        className="user-avatar"
                        sx={{
                            bgcolor: 'lightskyblue',
                            textShadow: '1px 1px 1px black'
                        }}
                    >
                        {'OR'}
                    </Avatar>
                    <input
                        className="squeak-input"
                        placeholder="What is happening?!"
                        value={message}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="squeak-box-btns">
                    <button type="submit" className="squeak-btn">
                        Squeak
                    </button>
                    <div className="left-icons">
                        <InsertPhoto className="icon" />
                        <Gif className="icon gif" />
                        <TagFacesOutlined className="icon" />
                    </div>
                </div>
            </form>
        </section>
    )
}
