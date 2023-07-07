import React, {
    useState,
    useEffect,
    ChangeEvent,
    KeyboardEvent,
    useRef
} from 'react'
import { uploadService } from '../../services/upload.service'
import { Avatar } from '@mui/material'
import EmojiPicker from 'emoji-picker-react'
import { EmojiClickData } from 'emoji-picker-react/dist/types/exposedTypes'
import {
    ImageOutlined,
    Gif,
    TagFacesOutlined,
    GifBoxOutlined
} from '@mui/icons-material'
import Loader from '../utils/Loader'

interface SqueakBoxProps {
    addPost: (post: string, file: File | null) => void
    isNewPostLoading: boolean
}

export default function SqueakBox({
    addPost,
    isNewPostLoading
}: SqueakBoxProps) {
    const txtAreaRef = useRef<HTMLTextAreaElement>(null)
    const [msg, setMsg] = useState('')
    const [fileUrl, setFileUrl] = useState('')
    const [file, setFile] = useState<File | null>(null)
    const [isEmojiMenuOpen, setIsEmojiMenuOpen] = useState(false)

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setMsg(event.target.value)
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            setMsg((prevMsg) => prevMsg + `\n`)
        }
    }

    const handleSqueak = async (ev: React.FormEvent) => {
        ev.preventDefault()
        addPost(msg, file)
        setIsEmojiMenuOpen(false)
        setMsg('')
        setFileUrl('')
    }

    const resizeTextarea = () => {
        if (txtAreaRef.current) {
            txtAreaRef.current.style.height = 'auto'
            txtAreaRef.current.style.height = `${txtAreaRef.current.scrollHeight}px`
        }
    }

    const handleEmojiMenuClicked = () => {
        setIsEmojiMenuOpen(!isEmojiMenuOpen)
    }

    const handleEmojiClicked = (emojiData: EmojiClickData) => {
        setMsg(msg + emojiData.emoji)
    }

    const handleFileChange = (ev: any) => {
        console.log(`file:, ${ev.target.files[0]}`)
        setFile(ev.target.files[0])
        setFileUrl(URL.createObjectURL(ev.target.files[0]))
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
                        src="https://xsgames.co/randomusers/assets/avatars/male/25.jpg"
                    >
                        {'PK'}
                    </Avatar>
                    {isNewPostLoading ? (
                        <Loader />
                    ) : (
                        <div className="post-content">
                            <textarea
                                ref={txtAreaRef}
                                className="squeak-textarea"
                                placeholder="What is happening?!"
                                value={msg}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                            />
                            {fileUrl && <img className='squeakbox-img' src={fileUrl} alt="file" />}
                        </div>
                    )}
                </div>
                <div className="squeak-box-btns">
                    <button type="submit" className="squeak-btn">
                        Squeak
                    </button>
                    <div className="left-icons">
                        <ImageOutlined className="icon" />
                        <input
                            type="file"
                            className="file-upload-input"
                            onChange={handleFileChange}
                        />
                        <GifBoxOutlined className="icon" />
                        <TagFacesOutlined
                            onClick={handleEmojiMenuClicked}
                            className="icon"
                        />
                    </div>
                </div>
            </form>
            <div className="menu-container">
                {isEmojiMenuOpen && (
                    <EmojiPicker onEmojiClick={handleEmojiClicked} />
                )}
            </div>
        </section>
    )
}
