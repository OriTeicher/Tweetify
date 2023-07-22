import React, {
    useState,
    useEffect,
    ChangeEvent,
    KeyboardEvent,
    useRef
} from 'react'
import { Avatar } from '@mui/material'
import EmojiPicker from 'emoji-picker-react'
import GifPicker, { Theme } from 'gif-picker-react'
import { EmojiClickData } from 'emoji-picker-react/dist/types/exposedTypes'
import ImgModal from '../utils/ImgModal'
import {
    ImageOutlined,
    TagFacesOutlined,
    GifBoxOutlined
} from '@mui/icons-material'
import Loader from '../utils/Loader'
import { apiService } from '../../services/api.service'

interface SqueakBoxProps {
    addPost: (post: string, file: File | null, gifUrl: string) => void
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
    const [isGifMenuOpen, setIsGifMenuOpen] = useState(false)
    const [selectedImgUrl, setSelectedImgUrl] = useState('')

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
        addPost(msg, file, fileUrl)
        setIsEmojiMenuOpen(false)
        setIsGifMenuOpen(false)
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
    const handleGifMenuClicked = () => {
        setIsGifMenuOpen(!isGifMenuOpen)
    }
    const handleEmojiClicked = (emojiData: EmojiClickData) => {
        setMsg(msg + emojiData.emoji)
    }

    const handleGifPick = (gifSelected: any) => {
        setFileUrl(gifSelected.url)
        setIsGifMenuOpen(false)
        setFile(null)
    }

    const handleRemovePhoto = (ev: React.FormEvent) => {
        ev.preventDefault()
        setFileUrl('')
        setFile(null)
    }

    const handleFileChange = (ev: any) => {
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
                            {fileUrl && (
                                <>
                                    <div className="img-container">
                                        <img
                                            onClick={() =>
                                                setSelectedImgUrl(fileUrl)
                                            }
                                            className="squeakbox-img"
                                            src={fileUrl}
                                            alt="file"
                                        />
                                        <button
                                            className="remove-photo-btn"
                                            type="submit"
                                            onClick={handleRemovePhoto}
                                        >
                                            x
                                        </button>
                                    </div>
                                </>
                            )}
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
                        <GifBoxOutlined
                            className="icon"
                            onClick={handleGifMenuClicked}
                        />
                        <TagFacesOutlined
                            onClick={handleEmojiMenuClicked}
                            className="icon"
                        />
                    </div>
                </div>
            </form>
            {selectedImgUrl && (
                <ImgModal
                    onCloseModal={() => setSelectedImgUrl('')}
                    imgUrl={selectedImgUrl}
                />
            )}
            <div className="menu-container">
                {isEmojiMenuOpen && (
                    <EmojiPicker onEmojiClick={handleEmojiClicked} />
                )}
                {isGifMenuOpen && (
                    <GifPicker
                        tenorApiKey={apiService.TENOR_API_KEY}
                        onGifClick={handleGifPick}
                    />
                )}
            </div>
        </section>
    )
}
