import React, { useState, ChangeEvent } from 'react'
import { Avatar } from '@mui/material'
import { InsertPhoto, GifBoxRounded, EmojiEmotions } from '@mui/icons-material'
export default function SqueakBox() {
    const [message, setMessage] = useState('')

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value)
    }

    return (
        <section className="squeak-box">
            <form>
                <div className="squeak-input-container">
                    <Avatar />
                    <input
                        className="squeak-input"
                        placeholder="What is happening?!"
                        value={message}
                        onChange={handleInputChange}
                    />
                </div>
            </form>
            <div className="squeak-box-btns">
                <button className="squeak-btn">Squeak</button>
                <div className="left-icons">
                    <InsertPhoto className="icon" />
                    <GifBoxRounded className="icon" />
                    <EmojiEmotions className="icon" />
                </div>
            </div>
        </section>
    )
}
