import React, { useState, useEffect } from 'react'
import SidebarOption from './SidebarOption'
import LoggedAcount from './LoggedAcount'
import LoginModal from '../utils/LoginModal'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { Twitter as TwitterIcon, Home as HomeIcon, Bookmark, Search as SearchIcon, Notifications as NotificationIcon, Person as ProfileIcon, MusicNoteOutlined as TweetifyLogo, Mail as MsgIcon } from '@mui/icons-material'
import { EMPTY_STR } from '../../services/consts.service'

interface SidebarProps {
    onOptionChange: Function
}

const Sidebar: React.FC<SidebarProps> = ({ onOptionChange }) => {
    const [selectedSidebarOption, setSelectedSidebarOption] = useState('Home')
    const [isMobileScreen, setIsMobileScreen] = useState(false)
    const [isLoginModalOpen, setLoginModal] = useState(false)
    const navigate = useNavigate()

    const { loggedInUser } = useSelector((state: RootState) => {
        return state.user
    })

    useEffect(() => {
        const handleResize = () => {
            setIsMobileScreen(window.innerWidth <= 768)
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const handleOptionClick = (option: string) => {
        setSelectedSidebarOption(option)
        onOptionChange(option)
        navigate(`/${option.toLowerCase()}`)
    }

    const handleSiderbarSqueak = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const renderSidebarOptions = () => {
        const optionsData = [
            { Icon: TwitterIcon, txt: EMPTY_STR },
            { Icon: HomeIcon, txt: 'Home' },
            { Icon: SearchIcon, txt: 'Explore' },
            { Icon: NotificationIcon, txt: 'Notifications' },
            { Icon: MsgIcon, txt: 'Messages' },
            { Icon: Bookmark, txt: 'Bookmarks' },
            { Icon: ProfileIcon, txt: 'Profile' },
            { Icon: TweetifyLogo, txt: 'Tweetify' }
        ]

        return optionsData.map(({ Icon, txt }) => (
            <SidebarOption
                key={txt}
                Icon={Icon}
                // ? hides the irrelevant sidebar icons in mobile
                txt={isMobileScreen ? EMPTY_STR : txt}
                isActive={selectedSidebarOption === txt}
                onClick={() => handleOptionClick(txt)}
            />
        ))
    }

    return (
        <>
            <section className="left-menu">
                <div className={`sidebar-container  ${isMobileScreen ? 'mobile' : null}`}>
                    {renderSidebarOptions()}
                    <button className={`squeak-btn ${isMobileScreen ? 'mobile' : null}`} onClick={handleSiderbarSqueak}>
                        {isMobileScreen ? '+' : 'Squeak'}
                    </button>
                    <LoggedAcount displayName={loggedInUser.displayName} username={loggedInUser.username} profileImg={loggedInUser.profileImgUrl} setIsLoginModalOpen={(isOpen: boolean) => setLoginModal(isOpen)} />
                    <LoginModal isOpen={isLoginModalOpen} setIsOpen={(isOpen: boolean) => setLoginModal(isOpen)} />
                </div>
            </section>
        </>
    )
}

export default Sidebar
