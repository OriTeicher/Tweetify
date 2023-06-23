import React, {
    useState,
    useEffect,
    ChangeEvent,
    KeyboardEvent,
    useRef
} from 'react'
import { Avatar } from '@mui/material'
import {
    ImageOutlined,
    Gif,
    TagFacesOutlined,
    GifBoxOutlined
} from '@mui/icons-material'
import Loader from '../utils/Loader'

interface SqueakBoxProps {
    addPost: (post: string) => void
    isNewPostLoading: boolean
}

export default function SqueakBox({
    addPost,
    isNewPostLoading
}: SqueakBoxProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [msg, setMsg] = useState('')

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setMsg(event.target.value)
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            setMsg((prevMsg) => prevMsg + '\n')
        }
    }

    const handleSqueak = (event: React.FormEvent) => {
        event.preventDefault()
        addPost(msg)
        setMsg('')
    }

    const resizeTextarea = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }

    useEffect(() => {
        resizeTextarea()
    }, [msg])

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
                        {'PK'}
                    </Avatar>
                    {isNewPostLoading ? (
                        <Loader />
                    ) : (
                        <textarea
                            ref={textareaRef}
                            className="squeak-textarea"
                            placeholder="What is happening?!"
                            value={msg}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                    )}
                </div>
                <div className="squeak-box-btns">
                    <button type="submit" className="squeak-btn">
                        Squeak
                    </button>
                    <div className="left-icons">
                        <ImageOutlined className="icon" />
                        <GifBoxOutlined className="icon" />
                        <TagFacesOutlined className="icon" />
                    </div>
                </div>
            </form>
        </section>
    )
}
