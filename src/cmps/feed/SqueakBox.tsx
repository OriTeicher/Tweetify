import React, { useState, ChangeEvent } from 'react'
import { Button, Avatar } from '@mui/material'

export default function SqueakBox() {
    const [message, setMessage] = useState('')

    const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputText = event.target.innerText.trim()
        setMessage(inputText)
    }

    return (
        <section className="squeak-box">
            <form>
                <div className="squeak-input-container">
                    <Avatar />
                    <input className='squeak-input' placeholder='What is hapenning?!'></input>
                </div>
                <Button>Squeak</Button>
            </form>
        </section>
    )
}
