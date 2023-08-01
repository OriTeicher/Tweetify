import React, {
    useState,
    useEffect,
    ChangeEvent,
    KeyboardEvent,
    useRef
} from 'react'
import { Avatar } from '@mui/material'
import EmojiPicker from 'emoji-picker-react'
import GifPicker from 'gif-picker-react'
import { EmojiClickData } from 'emoji-picker-react/dist/types/exposedTypes'
import ImgModal from '../utils/ImgModal'
import {
    ImageOutlined,
    TagFacesOutlined,
    GifBoxOutlined
} from '@mui/icons-material'
import Loader from '../utils/Loader'
import { apiService } from '../../services/api.service'
import { Theme } from 'gif-picker-react'

interface SqueakBoxProps {
    addPost: (post: string, file: File | null, gifUrl: string) => void
    isNewPostLoading: boolean
    loggedInUser: any
}

export default function SqueakBox({
    addPost,
    isNewPostLoading,
    loggedInUser
}: SqueakBoxProps) {
    const txtAreaRef = useRef<HTMLTextAreaElement>(null)
    const [msg, setMsg] = useState('')
    const [fileUrl, setFileUrl] = useState('')
    const [file, setFile] = useState<File | null>(null)
    const [isEmojiMenuOpen, setIsEmojiMenuOpen] = useState(false)
    const [isGifMenuOpen, setIsGifMenuOpen] = useState(false)
    const [selectedImgUrl, setSelectedImgUrl] = useState('')

    const fileInputRef = useRef<HTMLInputElement>(null)

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
        setIsGifMenuOpen(false)
    }
    const handleGifMenuClicked = () => {
        setIsEmojiMenuOpen(false)
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

    const handleAddImgClick = () => {
        setIsEmojiMenuOpen(false)
        setIsGifMenuOpen(false)
        fileInputRef.current?.click()
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
                        src={loggedInUser.profileImgUrl}
                    />
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
                        <label
                            htmlFor="file-upload"
                            className="file-upload-label"
                        >
                            <ImageOutlined
                                className="icon"
                                onMouseDown={handleAddImgClick}
                            />
                        </label>
                        <input
                            type="file"
                            id="file-upload"
                            className="file-upload-input"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
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
                    <EmojiPicker
                        onEmojiClick={handleEmojiClicked}
                        theme={Theme.DARK}
                    />
                )}
                {isGifMenuOpen && (
                    <GifPicker
                        tenorApiKey={apiService.TENOR_API_KEY}
                        onGifClick={handleGifPick}
                        theme={Theme.DARK}
                    />
                )}
            </div>
        </section>
    )
}
